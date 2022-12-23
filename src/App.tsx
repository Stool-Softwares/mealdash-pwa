import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./screens/Home";
import { Loading } from "./screens/Loading";
import { Login } from "./screens/Login";
import { Profile } from "./screens/Profile";
import { Register } from "./screens/Register";

const router = createBrowserRouter([
  { path: "/", element: <Loading /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/home", element: <Home /> },
  { path: "/profile", element: <Profile /> },
]);

function App() {
  return (
    <div className="h-full">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
