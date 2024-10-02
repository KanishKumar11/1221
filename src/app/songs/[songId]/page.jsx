export default function Space({ params }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Space: {params.spaceId}</h1>
      {/* <RecommendSong spaceId={params.spaceId} />
      <div className="mt-12">
        <Suspense fallback={<div>Loading songs...</div>}>
          <AllSongs spaceId={params.spaceId} />
        </Suspense>
      </div> */}
    </div>
  );
}
