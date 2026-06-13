import fs from "fs";
import path from "path";
import db from "./client";

const migrationsDir = path.join(process.cwd(), "src/data/migrations");

const files = fs.readdirSync(migrationsDir).sort();

for (const file of files) {
  const sql = fs.readFileSync(path.join(migrationsDir, file), "utf-8");

  console.log(`Running ${file}`);
  db.exec(sql);
}

console.log("Migrations complete");
