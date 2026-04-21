import { create } from "zustand";
import { Location } from "../types/location";

interface LocationState {
  selected: Location | null;
  setLocation: (location: Location) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  selected: { region: "Hokkaido", prefecture: "Hokkaido" },
  setLocation: (location) => set({ selected: location }),
}));
