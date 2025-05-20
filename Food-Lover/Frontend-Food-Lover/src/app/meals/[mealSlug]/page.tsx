import Image from "next/image";

import { getMeal } from "@/libs/meals";
import classes from "./page.module.css";
import { MealItem } from "@interfaces";

export default async function MealDetailsPage({
  params,
}: {
  params: { mealSlug: string };
}) {
  const meal = (await getMeal({ slug: params.mealSlug })) as MealItem;

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image fill src={meal.image} alt={meal.title} />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
}
