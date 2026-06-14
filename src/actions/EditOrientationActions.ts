"use server";

import db from "@/src/data/client";

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
