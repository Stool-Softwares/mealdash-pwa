import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { io } from "socket.io-client";
import { Toast } from "./components/Toast";
import { CreateMenu } from "./screens/CreateMenu";
import { Home } from "./screens/Home";
import { Loading } from "./screens/Loading";
import { Login } from "./screens/Login";
import { Profile } from "./screens/Profile";
import { Provider } from "./screens/provider";
import { Register } from "./screens/Register";

export const socket = io("ws://localhost:5001", {
  reconnectionDelayMax: 10000,
});

const router = createBrowserRouter([
  { path: "/", element: <Loading /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/home", element: <Home /> },
  { path: "/profile", element: <Profile /> },
  { path: "/create-menu", element: <CreateMenu /> },
  { path: "/provider", element: <Provider /> },
]);

interface ToastProviderContext {
  trueFn: (msg: string) => void;
}

export const ToastContext = createContext<ToastProviderContext | null>(null);

const ToastProvider: React.FC<PropsWithChildren<{}>> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>("");
  const [loaded, setLoaded] = useState(false);

  function trueFn(msg: string) {
    setOpen(true);
    setToastMsg(msg);
  }

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
      }, 4000);
    }
  }, [open]);

  return (
    <ToastContext.Provider value={{ trueFn }}>
      {props.children}
      {loaded && <Toast open={open} message={toastMsg} />}
    </ToastContext.Provider>
  );
};

function App() {
  return (
    <div className="h-full">
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </div>
  );
}

export default App;
