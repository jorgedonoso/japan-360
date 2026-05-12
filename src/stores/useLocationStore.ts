import { create } from "zustand";
import { Location } from "../types/location";

interface LocationState {
  objects: Record<string, Location>; // From db.
  selectedPrefecture: string;
  setSelected: (prefecture: string) => void;
  updateYawPitch: (prefecture: string, yaw: number, pitch: number) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  objects: {
    Hokkaido: { yaw: 0, pitch: 0 },
    Tokyo: { yaw: 0, pitch: 0 },
  },
  selectedPrefecture: "Hokkaido",
  setSelected: (prefecture) => set({ selectedPrefecture: prefecture }),
  updateYawPitch: (prefecture, yaw, pitch) =>
    set((state) => ({
      objects: {
        ...state.objects,
        [prefecture]: { ...state.objects[prefecture], yaw, pitch },
      },
    })),
}));
