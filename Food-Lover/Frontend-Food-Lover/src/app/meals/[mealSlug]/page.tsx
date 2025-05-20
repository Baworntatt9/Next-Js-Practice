export default function MealDetailsPage({
  params,
}: {
  params: { mealSlug: string };
}) {
  const { mealSlug } = params;

  return (
    <main>
      <h1>Meal Page: {mealSlug}</h1>
    </main>
  );
}
