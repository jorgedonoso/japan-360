export function createRegionLookup(
  data: { name: string; prefectures: string[] }[],
): Record<string, string> {
  return data.reduce(
    (acc, region) => {
      region.prefectures.forEach((pref) => {
        acc[pref] = region.name;
      });
      return acc;
    },
    {} as Record<string, string>,
  );
}
