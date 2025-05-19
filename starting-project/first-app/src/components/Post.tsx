import styles from "./post.module.css";

const names = ["Baworntatt", "Boon"];

function Post({ author, body }: { author: string; body: string }) {
  return (
    <div className={styles.post}>
      <p className={styles.author}>{author}</p>
      <p className={styles.text}>{body}</p>
    </div>
  );
}

export default Post;
