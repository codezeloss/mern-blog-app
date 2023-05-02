import Post from "../components/Post";
import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState("");

  useEffect(() => {
    async function getAllPosts() {
      const response = await fetch("http://localhost:4000/api/v1/posts");
      const data = await response.json();
      setPosts(data);
    }

    getAllPosts();
  }, []);

  return (
    <div>
      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}
    </div>
  );
};

export default Home;
