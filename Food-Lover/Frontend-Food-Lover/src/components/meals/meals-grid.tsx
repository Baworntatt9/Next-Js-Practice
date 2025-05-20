import classes from "./meals-grid.module.css";
import MealItemtsx from "./meal-item";
import { MealItem } from "@interfaces";

export default function MealsGrid({ meals }: { meals: MealItem[] }) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal: MealItem) => (
        <li key={meal.id}>
          <MealItemtsx {...meal} />
        </li>
      ))}
    </ul>
  );
}
