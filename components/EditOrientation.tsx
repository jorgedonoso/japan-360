"use client";

import { useLocationStore } from "@/src/stores/useLocationStore";
import { savePoint } from "./Action";
import PrefectureSelect from "./PrefectureSelect";
import { toast } from "react-toastify";
import { isProduction } from "@/src/util/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { RegionGrouped } from "@/src/dal/regionsAndPrefectures";
import { Button } from "./Button";

export default function EditOrientation({
  regions,
}: {
  regions: RegionGrouped[];
}) {
  const prefecture = useLocationStore((s) => s.selectedPrefecture);
  const yaw = useLocationStore((s) => s.locations[prefecture!]?.yaw);
  const pitch = useLocationStore((s) => s.locations[prefecture!]?.pitch);
  const description = useLocationStore(
    (s) => s.locations[prefecture!]?.description,
  );
  const isViewerReady = useLocationStore((s) => s.isViewerReady);

  const handleClearLocalStorage = () => {
    localStorage.clear();
    toast.success("Local Storage Cleared");
  };

  const handleSave = async () => {
    if (isProduction()) {
      localStorage.setItem(
        prefecture,
        JSON.stringify({ yaw, pitch, description }),
      );
      toast.success("Orientation Saved to Local Storage");
    } else {
      const res = await savePoint({
        prefecture,
        yaw,
        pitch,
      });

      if (!res) {
        toast.error("Error Saving");
      } else {
        toast.success("Orientation Saved to Database");
      }
    }
  };

  if (!isViewerReady) return <></>;

  return (
    <div className="absolute w-64 m-2 rounded text-black z-[9999]">
      <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
        <PrefectureSelect regions={regions}></PrefectureSelect>
        <div className="w-full items-center gap-2 text-xs text-amber-700 bg-amber-50 p-1 mb-2 rounded">
          <FontAwesomeIcon
            icon={faCircleInfo}
            className="text-amber-500 w-4 h-4 mr-1"
          />
          <span>Ordered by geographical location</span>
        </div>
        <form className="space-y-1">
          <div>
            <label className="block font-bold">Description:</label>
            <span className="text-sm text-gray-600">{description ?? "-"}</span>
          </div>
          <div>
            <label className="block font-bold">Yaw:</label>
            <span className="text-sm text-gray-600">{yaw}</span>
          </div>
          <div>
            <label className="block font-bold">Pitch:</label>
            <span className="text-sm text-gray-600">{pitch}</span>
          </div>
          <Button onClick={handleSave} variant="primary" icon={faSave}>
            Save Orientation
          </Button>
          {isProduction() && (
            <Button
              onClick={handleClearLocalStorage}
              variant="secondary"
              icon={faTrash}
            >
              Clear Local Storage
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
