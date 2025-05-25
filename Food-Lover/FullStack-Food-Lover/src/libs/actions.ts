"use server";

import { saveMeal } from "./meals";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function shareMeal(formData: FormData) {
  const meal = {
    creator_name: formData.get("name"),
    creator_email: formData.get("email"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
  };

  await saveMeal({ meal: meal as any });

  revalidatePath("/meals");
  redirect("/meals");
}
