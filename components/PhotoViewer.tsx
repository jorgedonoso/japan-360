"use client";

import { useEffect, useRef } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css";
import { useLocationStore } from "@/src/stores/useLocationStore";
import startingPoints from "@/src/data/starting-points.json";
import { StartingPointMap } from "@/src/types/startingPointMap";

export default function PhotoViewer() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { selected } = useLocationStore();

  useEffect(() => {
    if (!containerRef.current) return;

    const selectedPrefecture = selected?.prefecture!;
    const startingPointsMap = startingPoints as StartingPointMap;
    const startPoint = startingPointsMap[selectedPrefecture];

    const viewer = new Viewer({
      container: containerRef.current,
      panorama: `${process.env.NEXT_PUBLIC_IMAGES_URL}/${selected?.prefecture}.jpg`,
      navbar: ["caption"],
      mousewheel: true,
      defaultYaw: startPoint?.yaw ?? 0,
      defaultPitch: startPoint?.pitch ?? 0,
      caption: `<b>${selected?.region}</b> region. <b>${selected?.prefecture}</b> prefecture.`,
    });

    viewer.addEventListener("position-updated", (position) => {
      console.log("Yaw:", position);
    });

    // Reset zoom after loading image.
    viewer.addEventListener(
      "ready",
      () => {
        viewer.setOptions({
          maxFov: 120,
        });
      },
      { once: true },
    );

    return () => viewer.destroy();
  }, [selected]);

  return <div ref={containerRef} className="w-screen h-screen" />;
}
