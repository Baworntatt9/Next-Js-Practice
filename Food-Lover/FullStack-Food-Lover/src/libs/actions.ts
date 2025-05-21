"use server";

import { MealItem } from "@interfaces";
import { saveMeal } from "./meals";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

function isInvalidText(text: string) {
  return !text || text.trim() === "";
}

export async function shareMeal(prevState: unknown, formData: FormData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title as string) ||
    isInvalidText(meal.summary as string) ||
    isInvalidText(meal.instructions as string) ||
    isInvalidText(meal.creator as string) ||
    isInvalidText(meal.creator_email as string) ||
    !(meal as MealItem).creator_email.includes("@") ||
    !meal.image ||
    (meal as MealItem).image.size === 0
  ) {
    return {
      message: "Invalid input.",
    };
  }

  await saveMeal({ meal: meal as MealItem });
  revalidatePath("/meals");
  redirect("/meals");
}
