"use client";

import { useEffect, useRef } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css";
import { useLocationStore } from "@/src/stores/useLocationStore";
import { getInitialOrientation } from "./Action";

export default function PhotoViewer() {
  const containerRef = useRef<HTMLDivElement>(null);

  const updateYawPitch = useLocationStore((s) => s.updateYawPitch);
  const selectedPrefecture = useLocationStore((s) => s.selectedPrefecture);

  useEffect(() => {
    if (!containerRef.current || !selectedPrefecture) return;

    let viewer: Viewer | null = null;

    async function initViewer() {
      const coor = await getInitialOrientation(selectedPrefecture);
      updateYawPitch(selectedPrefecture, coor.yaw, coor.pitch);

      viewer = new Viewer({
        container: containerRef.current!,
        panorama: `${process.env.NEXT_PUBLIC_IMAGES_URL}/${selectedPrefecture}.jpg`,
        navbar: false,
        defaultYaw: coor.yaw,
        defaultPitch: coor.pitch,
      });

      viewer.addEventListener("position-updated", (position) => {
        updateYawPitch(
          selectedPrefecture,
          position.position.yaw,
          position.position.pitch,
        );
      });

      viewer.addEventListener(
        "ready",
        () => {
          viewer?.setOptions({ maxFov: 120 });
        },
        { once: true },
      );
    }

    initViewer();

    return () => {
      viewer?.destroy();
      viewer = null;
    };
  }, [selectedPrefecture, updateYawPitch]);

  return <div ref={containerRef} className="w-screen h-screen" />;
}
