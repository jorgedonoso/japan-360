import db from "../data/client";

type Region2Prefecture = {
  region: string;
  prefecture: string;
};

export type RegionGrouped = {
  name: string;
  prefectures: string[];
};

export function getRegionsAndPrefectures(): RegionGrouped[] {
  const rows = db
    .prepare(
      `
      SELECT
        r.name AS region,
        p.name AS prefecture
      FROM regions r
      JOIN prefectures p ON p.region_id = r.id
      ORDER BY r.id, p.id
      `,
    )
    .all() as Region2Prefecture[];

  const grouped = rows.reduce<Record<string, RegionGrouped>>((acc, row) => {
    if (!acc[row.region]) {
      acc[row.region] = {
        name: row.region,
        prefectures: [],
      };
    }

    acc[row.region].prefectures.push(row.prefecture);

    return acc;
  }, {});

  return Object.values(grouped);
}
