"use server";

export async function getSpotifySongDetails(url) {
  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    throw new Error("Spotify API credentials are missing");
  }

  const urlParams = new URL(url);
  const songId = urlParams.pathname.split("/")[2];

  try {
    // Get access token
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString("base64")}`,
        },
        body: "grant_type=client_credentials",
      }
    );

    if (!tokenResponse.ok) {
      throw new Error("Failed to obtain Spotify access token");
    }

    const tokenData = await tokenResponse.json();

    // Get track details
    const trackResponse = await fetch(
      `https://api.spotify.com/v1/tracks/${songId}`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    if (!trackResponse.ok) {
      throw new Error("Failed to fetch track details from Spotify API");
    }

    const trackData = await trackResponse.json();

    return {
      title: trackData.name,
      artist: trackData.artists[0].name,
      coverUrl: trackData.album.images[0].url,
    };
  } catch (error) {
    throw error;
  }
}
