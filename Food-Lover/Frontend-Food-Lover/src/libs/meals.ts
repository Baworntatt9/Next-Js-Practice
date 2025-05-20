import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const stmt = db.prepare("SELECT * FROM meals");
  // new throw Error("Error fetching meals");
  return stmt.all();
}

export async function getMeal({ slug }: { slug: string }) {
  const stmt = db.prepare("SELECT * FROM meals WHERE slug = ?");
  return stmt.get(slug);
}
