import { S3 } from "@aws-sdk/client-s3";

import { MealItem } from "@interfaces";
import slugify from "slugify";
import xss from "xss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

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

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch("http://localhost:5000/api/v1/menus", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Error fetching meals");
  }
  const meals = await response.json();
  return meals;
}

export async function getMeal({ id }: { id: string }) {
  const response = await fetch(`http://localhost:5000/api/v1/menus/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Error fetching meal");
  }
  const meal = await response.json();
  return meal;
}

export async function saveMeal({ meal }: { meal: MealItem }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.token) {
    throw new Error("User not authenticated");
  }

  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  meal.image = fileName;
  console.log("meal: ", JSON.stringify(meal as any));
  console.log("session: ", session);

  const response = await fetch("http://localhost:5000/api/v1/menus", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(meal),
  });
  if (!response.ok) {
    throw new Error("Error saving meal");
  }

  await s3.putObject({
    Bucket: "baworntatt-nextjs-food-lover",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  const savedMeal = await response.json();
  return savedMeal;
}
