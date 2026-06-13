import db from "./client";

const data = [
  { name: "Hokkaido", prefectures: ["Hokkaido"] },
  {
    name: "Tohoku",
    prefectures: [
      "Aomori",
      "Iwate",
      "Miyagi",
      "Akita",
      "Yamagata",
      "Fukushima",
    ],
  },
  {
    name: "Kanto",
    prefectures: [
      "Ibaraki",
      "Tochigi",
      "Gunma",
      "Saitama",
      "Chiba",
      "Tokyo",
      "Kanagawa",
    ],
  },
  {
    name: "Chubu",
    prefectures: [
      "Niigata",
      "Toyama",
      "Ishikawa",
      "Fukui",
      "Yamanashi",
      "Nagano",
      "Gifu",
      "Shizuoka",
      "Aichi",
      "Mie",
    ],
  },
  {
    name: "Kansai",
    prefectures: ["Shiga", "Kyoto", "Osaka", "Hyogo", "Nara", "Wakayama"],
  },
  {
    name: "Chugoku",
    prefectures: ["Tottori", "Shimane", "Okayama", "Hiroshima", "Yamaguchi"],
  },
  {
    name: "Shikoku",
    prefectures: ["Tokushima", "Kagawa", "Ehime", "Kochi"],
  },
  {
    name: "Kyushu",
    prefectures: [
      "Fukuoka",
      "Saga",
      "Nagasaki",
      "Kumamoto",
      "Oita",
      "Miyazaki",
      "Kagoshima",
    ],
  },
  { name: "Okinawa", prefectures: ["Okinawa"] },
];

const insertRegion = db.prepare(`
  INSERT OR IGNORE INTO regions (name) VALUES (?)
`);

const insertPrefecture = db.prepare(`
  INSERT OR IGNORE INTO prefectures (region_id, name) VALUES (?, ?)
`);

const getRegion = db.prepare(`
  SELECT id FROM regions WHERE name = ?
`);

const seed = db.transaction(() => {
  console.log("Start seeder");

  for (const region of data) {
    // Insert region.
    insertRegion.run(region.name);
    const row = getRegion.get(region.name) as { id: number };

    // Then prefectures.
    for (const pref of region.prefectures) {
      insertPrefecture.run(row.id, pref);
    }
  }

  console.log("End seeder");
});

seed();

db.close();
