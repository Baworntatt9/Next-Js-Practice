import { PostData } from "@/interfaces";

export default async function createPost(postData: PostData) {
  const response = await fetch("http://localhost:5000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  const data = await response.json();
  return data;
}
