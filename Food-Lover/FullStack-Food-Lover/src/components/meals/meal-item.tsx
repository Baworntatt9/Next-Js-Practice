import Link from "next/link";
import Image from "next/image";

import classes from "./meal-item.module.css";

export default function MealItem({
  id,
  title,
  image,
  summary,
  creator_name,
}: {
  id: string;
  title: string;
  image: string;
  summary: string;
  creator_name: string;
}) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image
            src={`https://baworntatt-nextjs-food-lover.s3.ap-southeast-2.amazonaws.com/${image}`}
            alt={title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator_name}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${id}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
