"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";

export default function MealsFormSubmit() {
  const { formState } = useFormContext();
  const { isSubmitting } = formState;

  return (
    <Button type="submit" disabled={isSubmitting}>
      {isSubmitting ? "Submitting..." : "Share Meal"}
    </Button>
  );
}
