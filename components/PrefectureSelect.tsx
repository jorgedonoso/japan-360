"use client";

import { useLocationStore } from "@/src/stores/useLocationStore";
import regionsAndPrefectures from "@/src/data/regions-and-prefectures.json";
import { createRegionLookup, doesImageExist } from "@/src/util/helpers";

const regionLookup = createRegionLookup(regionsAndPrefectures);

export default function PrefectureSelect() {
  const { selected, setLocation } = useLocationStore();

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPref = e.target.value;
    const isImageOk = await doesImageExist(
      `${process.env.NEXT_PUBLIC_IMAGES_URL}/${selectedPref}.jpg`,
    );

    if (isImageOk) {
      setLocation({
        region: regionLookup[selectedPref],
        prefecture: selectedPref,
      });
    } else {
      alert("This 360° image is not ready yet.");
    }
  };

  return (
    <select
      className="absolute top-0 left-0 m-4 rounded-md bg-white z-[9999] border p-2"
      onChange={handleChange}
      value={selected?.prefecture}
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
