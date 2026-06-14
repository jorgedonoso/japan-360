"use client";

import { useLocationStore } from "@/src/stores/useLocationStore";
import { savePoint } from "@/src/actions/EditOrientationActions";
import PrefectureSelect from "./PrefectureSelect";
import { toast } from "react-toastify";
import { isProduction } from "@/src/util/helpers";
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { RegionGrouped } from "@/src/dal/regionsAndPrefectures";
import { Button } from "./Button";
import { LabelValue } from "./LabelValue";
import { Field } from "./Field";
import { Warning } from "./Warning";

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
        <form className="space-y-1">
          <Field label="Prefecture">
            <PrefectureSelect regions={regions}></PrefectureSelect>
            <Warning>Ordered by geographical location</Warning>
          </Field>

          <LabelValue label="Description">{description}</LabelValue>
          <LabelValue label="Yaw">{yaw}</LabelValue>
          <LabelValue label="Pitch">{pitch}</LabelValue>

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
