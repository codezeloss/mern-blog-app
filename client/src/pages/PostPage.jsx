import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../hooks/UserContext";

const PostPage = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    async function getPost() {
      const response = await fetch(`http://localhost:4000/api/v1/post/${id}`);
      const data = await response.json();
      setPostData(data);
    }

    getPost();
  }, [id]);

  if (!postData) return;

  return (
    <div className="post-page">
      {userInfo.id === postData.author._id && (
        <div>
          <Link to={`/edit/${postData._id}`}>
            <div className="w-fit text-xs mb-3 bg-[#333] py-1 px-2 text-white font-semibold flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              <p>Edit post</p>
            </div>
          </Link>
        </div>
      )}

      <h1 className="">{postData.title}</h1>

      <time className="block font-semibold mt-2 text-sm text-[#aaa]">
        {formatISO9075(new Date(postData.createdAt))}
      </time>
      <div className="font-bold text-sm mb-5">
        by {postData.author.username}
      </div>

      <div className="max-h-[200px] overflow-hidden mb-2">
        <img
          className="object-cover"
          src={`http://localhost:4000/api/v1/${postData.cover}`}
          alt="Post Image"
        />
      </div>

      <div
        className="text-base mb-10"
        dangerouslySetInnerHTML={{ __html: postData.content }}
      />
    </div>
  );
};

export default PostPage;
