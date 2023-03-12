import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import bindClass from "classnames/bind";
import LeftSide from "@components/LeftSide/LeftSide";

const cx = bindClass.bind(styles);
import io, { Socket } from 'socket.io-client';
import axiosInstance from "@apis/axiosInstance";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { updateOnlineStatus } from "@redux/slices/Auth.slice";
import { disconnectSocket, setSocket } from "@redux/slices/Socket.slice";
import { addMessage } from "@redux/slices/Message.slice";
import { MessageType } from "../../types/Message";
import { updateFriendOnlineState, updateLastMessage } from "@redux/slices/Conversation.slice";
import { Outlet } from "react-router-dom";
import List from "@components/List/List";



let socket: Socket
const Home = () => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector(state => state.auth)
  const currentChat = useAppSelector(state => state.chat.currentChat)


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

      socket.on("friend_online", ({ userId, onlineState }) => {
        dispatch(updateFriendOnlineState({
          userId,
          onlineState
        }))
      })


      socket.on('connect_error', function (err) {

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





    }

    return () => {
      if (socket) {
        socket.off('connect');
        socket.off('disconnect');
        socket.off("connect_error")
        socket.off("update_onlineStatus")
        socket.disconnect()
        dispatch(disconnectSocket())
      }
    };
  }, [])


  //* receive message
  useEffect(() => {
    //* register receive message
    if (socket && socket.connected) {
      socket.on("receiveMessage", (msg: MessageType) => {
        if (currentChat && currentChat._id === msg.conversation) {
          dispatch(addMessage(msg))
          dispatch(updateLastMessage({ conversationId: msg.conversation, lastMessage: { sender: msg.sender._id || msg.sender, content: msg.content, createdAt: msg.createdAt } }))
        }
        else {
          dispatch(updateLastMessage({ conversationId: msg.conversation, lastMessage: { sender: msg.sender._id || msg.sender, content: msg.content, createdAt: msg.createdAt } }))
        }
      })
    }


    return () => {
      if (socket) {
        socket.off("receiveMessage")
      }
    }
  }, [currentChat, auth.isLoggedIn])
  return (
    <div className={cx("home")}>
      <LeftSide />
      <div className={cx("common")}>
        <Outlet />
        {/* <List />
        <ListItemContent /> */}

      </div>

    </div>
  );
};

export default Home;
