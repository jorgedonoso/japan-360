"use client";

import { useEffect, useRef } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css";

export default function PhotoViewer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const viewer = new Viewer({
      container: containerRef.current,
      panorama: "/images/test.jpg",
      navbar: false,
      mousewheel: true,
    });

    return () => viewer.destroy();
  }, []);

  return <div ref={containerRef} className="w-screen h-screen" />;
}
