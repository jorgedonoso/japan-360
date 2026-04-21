"use client";

import { useEffect, useRef } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css";
import { useLocationStore } from "@/src/stores/useLocationStore";

export default function PhotoViewer() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { selected } = useLocationStore();

  useEffect(() => {
    if (!containerRef.current) return;

    const viewer = new Viewer({
      container: containerRef.current,
      panorama: "/images/test.jpg",
      navbar: ["caption"],
      mousewheel: true,
      caption: `<b>${selected?.prefecture}</b> prefecture.`,
    });

    return () => viewer.destroy();
  }, [selected]);

  return <div ref={containerRef} className="w-screen h-screen" />;
}
