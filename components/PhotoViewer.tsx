"use client";

import { useEffect, useRef } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css";
import { useLocationStore } from "@/src/stores/useLocationStore";
import { getInitialOrientation } from "@/src/actions/PhotoViewerActions";
import { toast } from "react-toastify";
import { isProduction } from "@/src/util/helpers";

export default function PhotoViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const setIsViewerReady = useLocationStore((s) => s.setIsViewerReady);
  const updateObject = useLocationStore((s) => s.updateObject);
  const selectedPrefecture = useLocationStore((s) => s.selectedPrefecture);

  const viewerRef = useRef<Viewer | null>(null);

  useEffect(() => {
    if (!containerRef.current || !selectedPrefecture) return;

    let isCancelled = false;

    async function initViewer() {
      setIsViewerReady(false);
      let orientation = await getInitialOrientation(selectedPrefecture);

      // Check localStorage in production as Vercel's fs is temporary.
      if (isProduction()) {
        const localOrientationRaw = localStorage.getItem(selectedPrefecture);
        if (localOrientationRaw) {
          const localOrientation = JSON.parse(
            localOrientationRaw,
          ) as Location360;
          orientation = localOrientation;
          toast.warn("Showing coordinates from Local Storage");
        }
      }

      // Abort if component is destroyed waiting for initial orientation.
      if (isCancelled) return;

      // Defensive cleanup.
      if (viewerRef.current) {
        viewerRef.current.destroy();
      }

      // Init state on select.
      updateObject(selectedPrefecture, {
        yaw: orientation.yaw,
        pitch: orientation.pitch,
        description: orientation.description,
      });

      const viewerInstance = new Viewer({
        container: containerRef.current!,
        panorama: `${process.env.NEXT_PUBLIC_IMAGES_URL}/${selectedPrefecture}.jpg`,
        navbar: false,
        minFov: 100,
        maxFov: 150,
        defaultZoomLvl: 0,
        moveInertia: true,
        mousewheel: true,
        fisheye: 2,
        defaultYaw: orientation.yaw,
        defaultPitch: orientation.pitch,
      });

      viewerRef.current = viewerInstance;

      viewerInstance.addEventListener("position-updated", (position) => {
        updateObject(selectedPrefecture, {
          yaw: position.position.yaw,
          pitch: position.position.pitch,
        });
      });

      viewerInstance.addEventListener(
        "ready",
        () => {
          requestAnimationFrame(() => {
            viewerInstance.zoom(20);
          });
          setIsViewerReady(true);
        },
        { once: true },
      );
    }

    initViewer();

    return () => {
      isCancelled = true;
      viewerRef.current?.destroy();
      viewerRef.current = null;
    };
  }, [selectedPrefecture, updateObject, setIsViewerReady]);

  return <div ref={containerRef} className="w-screen h-dvh" />;
}
