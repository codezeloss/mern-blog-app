import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import Editor from "../components/Editor";

const EditPost = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);

  //
  useEffect(() => {
    async function fetchPostData() {
      const response = await fetch(`http://localhost:4000/api/v1/post/${id}`);
      const postInfos = await response.json();

      // default values
      setTitle(postInfos.title);
      setContent(postInfos.content);
      setSummary(postInfos.summary);
    }

    fetchPostData();
  }, [id]);

  //
  async function updatePost(e) {
    e.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    const response = await fetch(`http://localhost:4000/api/v1/post`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  // Redirect the user
  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <form onSubmit={updatePost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input
        type="file"
        placeholder="file"
        onChange={(e) => setFiles(e.target.files)}
      />
      <Editor onChange={setContent} value={content} />

      <button className="mt-2">Update Post</button>
    </form>
  );
};

export default EditPost;
