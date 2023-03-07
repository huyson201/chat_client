import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@pages/Home/Home";
import LoginRegister from "@pages/LoginRegister/LoginRegister";
import LoginForm from "@components/LoginForm/LoginForm";
import RegisterFom from "@components/RegisterForm/RegisterForm";
import PrivateRoute from "@components/PrivateRoute/PrivateRoute";
import { ListItemContent } from "@components/ListItemContent/ListItemContent";
import ListPage from "@pages/ListPage/ListPage";
import RequestFriendList from "@components/RequestFriendList/RequestFriendList";
import authApis from "@apis/auth.api";
import ChatPage from "@pages/ChatPage/ChatPage";


const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <PrivateRoute><Home /></PrivateRoute>,
        children: [
          {
            index: true,
            element: <ChatPage />
          },
          {
            path: "/list",
            element: <ListPage />,
            children: [
              {
                index: true,
                element: <ListItemContent key={"friends"} type="friends" />,
                loader: () => {
                  return authApis.getFriends().
                    then(res => res.data.data)
                    .catch(err => { throw new Response(err.response.data.message, { status: err.response.status }) })
                }

              },
              {
                path: "groups",
                element: <ListItemContent key={"groups"} type="groups" />,
                loader: () => {
                  return authApis.getGroups().then(res => res.data.data).catch(err => { throw new Response(err.response.data.message, { status: err.response.status }) })
                }
              },
              {
                path: "request-friends",
                element: <RequestFriendList />,
                loader: async () => {
                  return authApis.getRequestFriend().then(res => res.data.data).catch(err => { throw new Response(err.response.data.message, { status: err.response.status }) })
                }
              },
            ]
          }
        ]
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
