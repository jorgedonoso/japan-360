"use server";

import db from "@/src/data/client";

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
