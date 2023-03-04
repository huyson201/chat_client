import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import bindClass from "classnames/bind";
import LeftSide from "@components/LeftSide/LeftSide";
import Dialogues from "@components/Dialogues/Dialogues";
import Chat from "@components/Chat/Chat";
import About from "@components/About/About";
const cx = bindClass.bind(styles);
import io, { Socket } from 'socket.io-client';
import axiosInstance from "@apis/axiosInstance";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { updateOnlineStatus } from "@redux/slices/Auth.slice";
import { disconnectSocket, setSocket } from "@redux/slices/Socket.slice";
import { addMessage } from "@redux/slices/Message.slice";
import { MessageType } from "../../types/Message";



let socket: Socket
const Home = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const auth = useAppSelector(state => state.auth)

  const handleFriendOnline = () => {

  }

  useEffect(() => {
    if (auth.isLoggedIn) {
      socket = io("http://localhost:4000", {
        withCredentials: true,
      })

      socket.on('connect', () => {
        console.log("socketIO => user connected");
        dispatch(setSocket(socket))
      });

      socket.on('disconnect', () => {
        console.log("socketIO => user disconnected");
        dispatch(disconnectSocket())
      });

      socket.on("update_onlineStatus", (status: "online" | "offline") => {
        console.log("update_onlineStatus")

        dispatch(updateOnlineStatus(status))
      })

      socket.on("friend_online", friendId => console.log("FriendOnline" + friendId))

      socket.on('connect_error', function (err) {
        console.log(err.message);

        if (err.message === "Unauthorized") {
          return socket.disconnect()
        }

        if (err.message === "Invalid token") {
          console.log("reconnect");

          axiosInstance.post("/auth/refresh-token", {}, { _retry: true })
            .then(() => socket.connect())
            .catch(err => socket.disconnect())
        }
      });

      //* register receive message
      socket.on("receiveMessage", (msg: MessageType) => {
        dispatch(addMessage(msg))
      })



    }

    return () => {
      if (socket) {
        socket.off('connect');
        socket.off('disconnect');
        socket.off("connect_error")
        socket.off("update_onlineStatus")
        socket.off("receiveMessage")
        socket.disconnect()
        dispatch(disconnectSocket())
      }
    };
  }, [auth.isLoggedIn])


  return (
    <div className={cx("home")}>
      <LeftSide />
      <Dialogues />
      <Chat clickRightSide={(state) => setShowSidebar(state)} />
      {showSidebar && <About />}
    </div>
  );
};

export default Home;
