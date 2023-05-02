import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { UserContextProvider } from "./hooks/UserContext";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostPage from "./pages/PostPage";
import Register from "./pages/Register";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
