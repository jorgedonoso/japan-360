"use client";

import { useLocationStore } from "@/src/stores/useLocationStore";
import { createRegionLookup, doesImageExist } from "@/src/util/helpers";
import { trackEvent } from "@/src/lib/googleTag";
import { toast } from "react-toastify";
import { RegionGrouped } from "@/src/dal/regionsAndPrefectures";
import { useMemo } from "react";

export default function PrefectureSelect({
  regions,
}: {
  regions: RegionGrouped[];
}) {
  const regionLookup = useMemo(() => createRegionLookup(regions), [regions]);
  const selectedPrefecture = useLocationStore((s) => s.selectedPrefecture);
  const setPrefecture = useLocationStore((s) => s.setSelected);
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPref = e.target.value;
    const isImageOk = await doesImageExist(
      `${process.env.NEXT_PUBLIC_IMAGES_URL}/${selectedPref}.jpg`,
    );

    if (isImageOk) {
      setPrefecture(selectedPref);

      trackEvent("prefecture_selected", {
        region: regionLookup[selectedPref],
        prefecture: selectedPref,
      });
    } else {
      toast.error("This 360° image is not ready yet.");
    }
  };

  return (
    <select
      className="w-full mb-2 rounded-md bg-white text-black z-[9999] border p-2"
      onChange={handleChange}
      value={selectedPrefecture}
    >
      {regions.map((region) => (
        <optgroup key={region.name} label={`${region.name} Region`}>
          {region.prefectures.map((pref) => (
            <option key={pref} value={pref}>
              {pref} Prefecture
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}
