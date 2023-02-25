import React from "react";
import styles from "./Home.module.scss";

import bindClass from "classnames/bind";
const cx = bindClass.bind(styles);
const Home = () => {
  return <div className={cx("home")}></div>;
};

export default Home;
