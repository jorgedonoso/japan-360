"use client";

import { useEffect, useRef } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css";
import { useLocationStore } from "@/src/stores/useLocationStore";
import { getInitialOrientation } from "./Action";
import { toast } from "react-toastify";
import { isProduction } from "@/src/util/helpers";

export default function PhotoViewer() {
  const containerRef = useRef<HTMLDivElement>(null);

  const updateYawPitch = useLocationStore((s) => s.updateYawPitch);
  const selectedPrefecture = useLocationStore((s) => s.selectedPrefecture);

  useEffect(() => {
    if (!containerRef.current || !selectedPrefecture) return;

    let viewer: Viewer | null = null;

    async function initViewer() {
      let orientation = await getInitialOrientation(selectedPrefecture);

      // Check localStorage in production as Vercel's fs is temporary.
      if (isProduction()) {
        const localOrientationRaw = localStorage.getItem(selectedPrefecture);
        if (localOrientationRaw) {
          const localOrientation = JSON.parse(
            localOrientationRaw,
          ) as Orientation;
          orientation = localOrientation;
          toast.warn("Showing coordinates from Local Storage");
        }
      }

      updateYawPitch(selectedPrefecture, orientation.yaw, orientation.pitch);

      viewer = new Viewer({
        container: containerRef.current!,
        panorama: `${process.env.NEXT_PUBLIC_IMAGES_URL}/${selectedPrefecture}.jpg`,
        navbar: false,
        defaultYaw: orientation.yaw,
        defaultPitch: orientation.pitch,
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
