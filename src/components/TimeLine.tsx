import React, { useEffect, useState } from "react";
import Post from "./Post";
import apiClient from "@/lib/apiClient";
import { Posts } from "@/types";

const TimeLine = () => {
  const [postText, setPostText] = useState("");
  const [latestPost, setLatestPost] = useState<Posts[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await apiClient.post("posts", {
        content: postText,
      });
      console.log(res.data);

      const newPost: Posts = res.data;

      setLatestPost((prevPost) => [newPost, ...prevPost]);
      setPostText("");
    } catch {
      alert("ログインしてください");
    }
  };

  useEffect(() => {
    const fetchLatestPosts = async () => {
      const res = await apiClient.get("latest-posts");
      const newPost: Posts[] = res.data;
      setLatestPost(newPost);
    };
    fetchLatestPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-4">
        <div className="bg-white shadow-md rounded p-4 mb-4">
          <form onSubmit={(e) => handleSubmit(e)}>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="What's on your mind?"
              onChange={(e) => setPostText(e.target.value)}
              value={postText}
            ></textarea>
            <button
              type="submit"
              className="mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded"
            >
              投稿
            </button>
          </form>
        </div>
        {latestPost.map((post: Posts, index) => (
          <Post key={index} post={post} />
        ))}
      </main>
    </div>
  );
};

export default TimeLine;
