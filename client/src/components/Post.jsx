/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({
  _id: id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) => {
  return (
    <div className="grid grid-cols-2 gap-5 mb-8 items-center">
      <div className="image">
        <Link to={`/post/${id}`}>
          <img src={`http://localhost:4000/api/v1/${cover}`} alt="Post Image" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="my-2 mx-0 text-[#888] text-xs font-bold gap-3 flex items-center">
          <a className="text-[#333] text-xs">{author.username}</a>
          <time className="text-xs">{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="my-3 mx-0 leading-6 text-sm">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
