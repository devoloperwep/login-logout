import {
  CreateTask,
  Home,
  Login,
  Profile,
  Register,
  Task,
  UserInfo,
} from "./pages";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useDispatch, useSelector } from "react-redux";
import { action as RegisterAction } from "./pages/Register";
import { action as LoginAction } from "./pages/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { useEffect } from "react";
import { isAuthReady, login } from "./app/userSlice";

function App() {
  const { user, authReady } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/create",
          element: <CreateTask />,
        },
        {
          path: "/task/:id",
          element: <Task />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/userInfo/:id",
          element: <UserInfo />,
        },
      ],
    },

    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
        dispatch(login(user));
      }
      dispatch(isAuthReady());
    });
  }, []);
  return <>{authReady && <RouterProvider router={routes} />}</>;
}

export default App;
