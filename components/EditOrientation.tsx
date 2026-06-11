"use client";

import { useLocationStore } from "@/src/stores/useLocationStore";
import { savePoint } from "./Action";
import PrefectureSelect from "./PrefectureSelect";
import { toast } from "react-toastify";
import { isProduction } from "@/src/util/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function EditOrientation() {
  const prefecture = useLocationStore((s) => s.selectedPrefecture);
  const yaw = useLocationStore((s) => s.objects[prefecture!]?.yaw);
  const pitch = useLocationStore((s) => s.objects[prefecture!]?.pitch);
  const isViewerReady = useLocationStore((s) => s.isViewerReady);

  const handleClearLocalStorage = () => {
    localStorage.clear();
    toast.success("Local Storage Cleared");
  };

  const handleSave = async () => {
    if (isProduction()) {
      localStorage.setItem(prefecture, JSON.stringify({ yaw, pitch }));
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
      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
        <PrefectureSelect></PrefectureSelect>
        <form className="space-y-2">
          <div>
            <label className="block font-bold mb-1">Yaw:</label>
            {yaw}
          </div>
          <div>
            <label className="block font-bold mb-1">Pitch:</label>
            {pitch}
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="cursor-pointer font-bold w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            <FontAwesomeIcon icon={faSave} className="mr-1" />
            Save Orientation
          </button>
          {isProduction() && (
            <button
              type="button"
              onClick={handleClearLocalStorage}
              className="cursor-pointer font-bold w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition"
            >
              <FontAwesomeIcon icon={faTrash} className="mr-1" />
              Clear Local Storage
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
