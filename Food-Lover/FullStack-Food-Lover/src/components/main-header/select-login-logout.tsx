"use client";

import { useSession } from "next-auth/react";
import NavLink from "./nav-link";

export default function SelectLoginLogout() {
  const { data: session } = useSession();

  return (
    <NavLink href={session ? "/auth/logout" : "/auth/login"}>
      {session ? "Logout" : "Login"}
    </NavLink>
  );
}
