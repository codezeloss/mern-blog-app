import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";

const Header = () => {
  // CONTEXT
  const { userInfo, setUserInfo } = useContext(UserContext);

  // LOGOUT
  async function logout() {
    await fetch("http://localhost:4000/api/v1/logout", {
      method: "POST",
      credentials: "include",
    });
    setUserInfo(null);
  }

  //
  useEffect(() => {
    // GET USER INFOS
    async function getUserInfos() {
      const response = await fetch("http://localhost:4000/api/v1/profile", {
        credentials: "include",
      });

      const data = await response.json();
      setUserInfo(data);
    }

    getUserInfos();
  }, [setUserInfo]);

  return (
    <header className="flex justify-between items-center mt-5 mb-11">
      <Link className="font-bold text-2xl" to="/">
        Blogapp
      </Link>

      <nav className="flex gap-4 text-base font-normal">
        {userInfo?.username && (
          <>
            <span className="font-bold">{userInfo.username}</span>
            <Link to="/create">Create New post</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
        {!userInfo?.username && (
          <>
            <Link className="" to="/login">
              Login
            </Link>
            <Link className="" to="/register">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
