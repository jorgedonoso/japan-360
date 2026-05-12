"use server";

import db from "@/src/data/db";

interface Orientation {
  yaw: number;
  pitch: number;
}

export async function getInitialOrientation(
  prefecture: string,
): Promise<Orientation> {
  const stmt = db.prepare(
    "SELECT prefecture, yaw, pitch FROM photo_orientations WHERE prefecture = ?",
  );
  const row = stmt.get(prefecture);

  // From db, or empty.
  return row ? (row as Orientation) : { yaw: 0, pitch: 0 };
}

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
