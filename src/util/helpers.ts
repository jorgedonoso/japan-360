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

export async function doesImageExist(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}
