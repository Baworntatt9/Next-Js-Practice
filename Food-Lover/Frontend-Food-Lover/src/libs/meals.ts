// import fs from "node:fs";

import { S3 } from "@aws-sdk/client-s3";

import { MealItem } from "@interfaces";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const s3 = new S3({
  region: "ap-southeast-2",
  credentials:
    process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
      ? {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
        }
      : undefined,
});

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

export async function saveMeal({ meal }: { meal: MealItem }) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  await s3.putObject({
    Bucket: "baworntatt-nextjs-food-lover",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;

  db.prepare(
    `
    INSERT INTO Meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES(
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
    `
  ).run(meal);
}
