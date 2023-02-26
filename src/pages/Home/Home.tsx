import React from "react";
import styles from "./Home.module.scss";

import bindClass from "classnames/bind";
import LeftSide from "@components/LeftSide/LeftSide";
import Dialogues from "@components/Dialogues/Dialogues";
import Chat from "@components/Chat/Chat";
const cx = bindClass.bind(styles);
const Home = () => {
  return (
    <div className={cx("home")}>
      <LeftSide />
      <Dialogues />
      <Chat />
    </div>
  );
};

export default Home;
