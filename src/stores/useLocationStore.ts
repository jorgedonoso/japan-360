import { create } from "zustand";

interface LocationState {
  locations: Record<string, Location360>;
  selectedPrefecture: string;
  setSelected: (prefecture: string) => void;
  updateObject: (prefecture: string, patch: Partial<Location360>) => void;
  isViewerReady: boolean;
  setIsViewerReady: (v: boolean) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  locations: {},
  selectedPrefecture: "Hokkaido",
  setSelected: (prefecture) => set({ selectedPrefecture: prefecture }),
  updateObject: (prefecture, patch) =>
    set((state) => ({
      locations: {
        ...state.locations,
        [prefecture]: {
          ...(state.locations[prefecture] ?? {}),
          ...patch,
        },
      },
    })),
  isViewerReady: false,
  setIsViewerReady: (v) => set({ isViewerReady: v }),
}));
