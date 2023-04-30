import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center mt-5 mb-11">
      <Link className="font-bold text-2xl" to="/">
        MyBlog
      </Link>

      <nav className="flex gap-4">
        <Link className="" to="/login">
          Login
        </Link>
        <Link className="" to="/register">
          Register
        </Link>
      </nav>
    </header>
  );
};

export default Header;
