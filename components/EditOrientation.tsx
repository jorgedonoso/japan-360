"use client";

import { useLocationStore } from "@/src/stores/useLocationStore";
import { savePoint } from "./Action";
import PrefectureSelect from "./PrefectureSelect";

export default function EditOrientation() {
  const selectedPrefecture = useLocationStore((s) => s.selectedPrefecture);
  const yaw = useLocationStore((s) => s.objects[selectedPrefecture!]?.yaw);
  const pitch = useLocationStore((s) => s.objects[selectedPrefecture!]?.pitch);

  const handleSave = async () => {
    const res = await savePoint({
      prefecture: selectedPrefecture,
      yaw: yaw!,
      pitch: pitch!,
    });
    if (!res) {
      alert("Error");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <PrefectureSelect></PrefectureSelect>
      <form className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Yaw:</label>
          {yaw}
        </div>
        <div>
          <label className="block font-medium mb-1">Pitch:</label>
          {pitch}
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="cursor-pointer w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Save Orientation
        </button>
      </form>
    </div>
  );
}
