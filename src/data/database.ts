import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "/src/data/app.db");
const db = new Database(dbPath);

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS photo_orientations (
    prefecture TEXT PRIMARY KEY,
    yaw REAL,
    pitch REAL 
  );
`,
).run();

export default db;
