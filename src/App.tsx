import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateUser } from "./screens/CreateUser";
import { Home } from "./screens/Home";
import { Loading } from "./screens/Loading";
import { Login } from "./screens/Login";
import { Profile } from "./screens/Profile";
import { Register } from "./screens/Register";
import { VerifyEmail } from "./screens/VerifyEmail";
import { useStore } from "./store";
import supabase from "./supabase";

const router = createBrowserRouter([
  { path: "/", element: <Loading /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/home", element: <Home /> },
  { path: "/profile", element: <Profile /> },
  { path: "/verify-email", element: <VerifyEmail /> },
  { path: "/create-user", element: <CreateUser /> },
]);

const allowedRoutes = ["/login", "/register"];

function App() {
  const { auth } = useStore((s) => ({ auth: s.auth }));

  async function authenticate() {
    try {
      const authRes = await supabase.auth.getSession();
      const userRes = await supabase.auth.getUser();

      console.log(authRes, userRes);

      if (!authRes.data.session || authRes.error || !userRes.data) {
        const requstedRoute = router.state.location.pathname;
        if (allowedRoutes.includes(requstedRoute)) {
          router.navigate(requstedRoute);
        } else {
          router.navigate("/login");
        }
        return;
      }

      const user = await supabase
        .from("users")
        .select("*")
        .filter("userId", "eq", userRes.data.user?.id);

      auth.setAuth(authRes.data.session, userRes.data.user);
      router.navigate("/home");
    } catch (error) {
      console.log(error);

      const requstedRoute = router.state.location.pathname;
      if (allowedRoutes.includes(requstedRoute)) {
        router.navigate(requstedRoute);
      } else {
        router.navigate("/login");
      }
    }
  }

  useEffect(() => {
    authenticate();
    supabase.auth.onAuthStateChange(async (_, session) => {
      const user = await supabase.auth.getUser();
      auth.setAuth(session, user.data.user);
      if (!session) {
        router.navigate("/login");
      } else {
        router.navigate("/home");
      }
    });
  }, []);
  return (
    <div className="h-full">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
