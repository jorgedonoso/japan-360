"use server";

import db from "@/src/data/client";
import { Location360 } from "../types/Location360";

export async function savePoint(data: {
  prefecture: string;
  yaw: number;
  pitch: number;
}) {
  try {
    const stmt = db.prepare(`
      INSERT INTO photo_orientations (prefecture, yaw, pitch)
      VALUES (@prefecture, @yaw, @pitch)
      ON CONFLICT(prefecture) DO UPDATE SET
        yaw = excluded.yaw,
        pitch = excluded.pitch
    `);

    stmt.run(data);
    return true;
  } catch (err) {
    console.error("Failed to save point:", err);
    return false;
  }
}

export async function getInitialOrientation(
  prefecture: string,
): Promise<Location360> {
  const stmt = db.prepare(
    "SELECT prefecture, yaw, pitch, description FROM photo_orientations WHERE prefecture = ?",
  );
  const row = stmt.get(prefecture);

  // From db, or empty.
  return row ? (row as Location360) : { yaw: 0, pitch: 0 };
}
