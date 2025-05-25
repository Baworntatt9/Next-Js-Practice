import Link from "next/link";
import Image from "next/image";

import logoTmg from "/assets/logo.png";
import classes from "./main-header.module.css";
import MainHeaderBackground from "./main-header-background";
import NavLink from "./nav-link";
import SelectLoginLogout from "./select-login-logout";

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          <Image src={logoTmg} alt="A plate with food on it" priority />
          Nextlevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
            <li>
              <SelectLoginLogout />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
