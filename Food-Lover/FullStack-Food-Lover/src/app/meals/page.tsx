import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/libs/meals";
import { MealItem } from "@interfaces";
import { Suspense } from "react";
import MealShareButton from "@/components/meals/meal-share-button";

export const metadata = {
  title: "All Meals",
  description: "Browse the delicious meals shared by our vibrant community.",
};

async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals.data as MealItem[]} />;
}

export default async function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1 className="text-4xl font-bold mb-3">
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <MealShareButton />
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
