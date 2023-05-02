import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  // CONTEXT
  const { setUserInfo } = useContext(UserContext);

  // LOGIN FUNCTION
  const login = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/v1/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      setUserInfo(data);
      setRedirect(true);
    } else {
      alert("Login failed!");
    }
  };

  // Redirect the user
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form className="auth" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
    </form>
  );
};

export default Login;
