import classes from "./meal-share-button.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";
import { LockClosedIcon } from "@heroicons/react/20/solid";

export default async function MealShareButton() {
  const session = await getServerSession(authOptions);

  return (
    <div className={classes.cta}>
      {session ? (
        <Link
          href="/meals/share"
          className="bg-gradient-to-r from-orange-600 to-amber-500 text-white"
        >
          Share Your Favorite Recipe
        </Link>
      ) : (
        <div className="flex items-center justify-center bg-gray-100 text-gray-500 px-4 py-2 cursor-not-allowed opacity-50">
          <LockClosedIcon className="h-5 w-5 mr-2" />
          <span>Sign in to share your recipe</span>
        </div>
      )}
    </div>
  );
}
