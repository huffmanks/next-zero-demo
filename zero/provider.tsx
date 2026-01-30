"use client";

import { zeroOptions } from "@/zero";
import { ZeroProvider } from "@rocicorp/zero/react";

export default function DatabaseProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ZeroProvider {...zeroOptions}>{children}</ZeroProvider>;
}
