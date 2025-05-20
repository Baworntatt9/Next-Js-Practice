import sql from "better-sqlite3";

const db = sql("src/db/database.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const stmt = db.prepare("SELECT * FROM meals");
  return stmt.all();
}

export async function getMealById(id) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const stmt = db.prepare("SELECT * FROM meals WHERE id = ?");
  return stmt.get(id);
}

export function createMeal(meal) {
  const stmt = db.prepare(
    "INSERT INTO meals (name, description, price) VALUES (?, ?, ?)"
  );
  stmt.run(meal.name, meal.description, meal.price);
}
