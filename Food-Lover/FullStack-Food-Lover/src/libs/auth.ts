import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function userRegister(
  name: string,
  tel: string,
  email: string,
  password: string
) {
  console.log(process.env.BACKEND_URL);
  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, tel, email, password }),
  });

  if (!res.ok) {
    throw new Error("Registration failed");
  }

  const data = await res.json();
  return data;
}

export async function userLogin(email: string, password: string) {
  console.log(process.env.BACKEND_URL);
  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid email or password");
  }

  const data = await res.json();
  return data;
}

export async function userLogout() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.token) {
    throw new Error("User not authenticated");
  }

  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/logout`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.user.token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Error logging out");
  }
}
