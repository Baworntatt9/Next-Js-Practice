import Image from "next/image";

import { getMeal } from "@/libs/meals";
import classes from "./page.module.css";
import { MealItem } from "@interfaces";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const meal = (await getMeal({ id: (await params).id })) as MealItem;

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default async function MealDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const meal = (await getMeal({ id: resolvedParams.id })).data as MealItem;

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={`https://baworntatt-nextjs-food-lover.s3.ap-southeast-2.amazonaws.com/${meal.image}`}
            alt={meal.title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator_name}</a>
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
