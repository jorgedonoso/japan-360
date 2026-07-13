import db from "@/src/data/client";
import { RegionGrouped } from "../types/RegionGrouped";
import { Region2Prefecture } from "../types/RegionToPrefecture";

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
