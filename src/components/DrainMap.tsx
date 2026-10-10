"use client";

import dynamic from "next/dynamic";
import type { Drain } from "@/lib/data";

const Inner = dynamic(() => import("./DrainMapInner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] items-center justify-center rounded-xl bg-mist text-sm text-offline">
      Loading map…
    </div>
  ),
});

export default function DrainMap(props: { drains: Drain[]; height?: number; zoom?: number }) {
  return <Inner {...props} />;
}
