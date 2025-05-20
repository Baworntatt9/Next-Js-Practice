import React, { useState } from "react";
import Post from "./Post";
import NewPost from "./NewPost";
import Modal from "./Modal";
import classes from "./PostsList.module.css";
import { PostData } from "@/interfaces";
import getPosts from "../libs/getPosts";
import createPost from "../libs/createPost";
import { useEffect } from "react";

function PostsList({
  isPosting,
  onStopPosting,
}: {
  isPosting: boolean;
  onStopPosting: React.MouseEventHandler<HTMLDivElement>;
}) {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const response = await getPosts();
      setPosts(response.posts);
      setIsFetching(false);
    }

    fetchPosts();
  }, []);

  function addPostHandler(postData: PostData) {
    createPost(postData);
    setPosts((existingPosts) => [postData, ...existingPosts]);
  }

  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onCancel={onStopPosting} onAddPost={addPostHandler} />
        </Modal>
      )}
      {!isFetching && posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post: PostData) => {
            return (
              <Post key={post.body} author={post.author} body={post.body} />
            );
          })}
        </ul>
      )}
      {!isFetching && posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
      {isFetching && (
        <div style={{ textAlign: "center", color: "white" }}>
          Loading posts...
        </div>
      )}
    </>
  );
}

export default PostsList;
