"use client";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "../ui/sonner";
import { SessionProvider } from "next-auth/react";
import AddToHomeScreenPrompt from "../AddToHomeScreen";
const RootProviders = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient({}));
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position="top-center" />
      <AddToHomeScreenPrompt />
      <SessionProvider>{children}</SessionProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default RootProviders;
