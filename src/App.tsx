import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Loading } from "./screens/Loading";
import { Login } from "./screens/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Loading />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="h-full">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
