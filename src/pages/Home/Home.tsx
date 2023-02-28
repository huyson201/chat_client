import React, { useState } from "react";
import styles from "./Home.module.scss";

import bindClass from "classnames/bind";
import LeftSide from "@components/LeftSide/LeftSide";
import Dialogues from "@components/Dialogues/Dialogues";
import Chat from "@components/Chat/Chat";
import About from "@components/About/About";
const cx = bindClass.bind(styles);
const Home = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false)
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
