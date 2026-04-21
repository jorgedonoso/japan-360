"use client";

import { useLocationStore } from "@/src/stores/useLocationStore";
import regionsAndPrefectures from "@/src/data/regions-and-prefectures.json";
import { createRegionLookup } from "@/src/util/helpers";

const regionLookup = createRegionLookup(regionsAndPrefectures);

export default function PrefectureSelect() {
  const { setLocation } = useLocationStore();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPref = e.target.value;
    setLocation({
      region: regionLookup[selectedPref],
      prefecture: selectedPref,
    });
  };

  return (
    <select
      className="absolute top-0 left-0 m-4 rounded-md bg-white z-[9999] border p-2"
      onChange={handleChange}
    >
      {regionsAndPrefectures.map((region) => (
        <optgroup key={region.name} label={region.name}>
          {region.prefectures.map((pref) => (
            <option key={pref} value={pref}>
              {pref}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}
