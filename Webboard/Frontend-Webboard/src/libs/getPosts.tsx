export default async function getPosts() {
  const response = await fetch("http://localhost:5000/posts");
  const data = await response.json();
  return data;
}
