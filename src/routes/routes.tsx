import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@pages/Home/Home";
import LoginRegister from "@pages/LoginRegister/LoginRegister";
import LoginForm from "@components/LoginForm/LoginForm";
import RegisterFom from "@components/RegisterForm/RegisterFom";
import PrivateRoute from "@components/PrivateRoute/PrivateRoute";

const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <PrivateRoute><Home /></PrivateRoute>,
      },
      {
        element: <LoginRegister />,
        children: [
          {
            path: "/login",
            element: <LoginForm />
          },
          {
            path: "sign-up",
            element: <RegisterFom />
          }
        ]
      }
    ],
  },
]);

export default routes;
