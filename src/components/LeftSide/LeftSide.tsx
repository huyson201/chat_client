import React, { CSSProperties } from "react";
import styles from "./LeftSide.module.scss";
import bindClass from "classnames/bind";
import avatar from "@assets/images/Userpic.jpg";
import Home from "@components/icons/Home";
import Send from "@components/icons/Send";
import Inbox from "@components/icons/Inbox";
import Users from "@components/icons/Users";
import Notification from "@components/icons/Notification";
import Settings from "@components/icons/Setting";

const cx = bindClass.bind(styles);

export interface CSSPropertiesWithVars extends CSSProperties {
  '--pos': string;
  // any other vars you may use
}
const LeftSide = () => {
  return (
    <div className={cx("left-side")}>
      <div className={cx("avatar")}>
        <img src={avatar} alt="avatar" />
        <div className={cx("dot-status", "online", "status")}></div>
      </div>
      <ul className={cx("side-menu")} style={{ '--pos': '1' } as CSSPropertiesWithVars}>
        <li>
          <a href="#" className={cx("side-menu__item", 'active')}>
            <Home />
          </a>
        </li>
        <li>
          <a href="#" className={cx("side-menu__item")}>
            <Send />
          </a>
        </li>
        <li>
          <a href="#" className={cx("side-menu__item")}>
            <Inbox />
          </a>
        </li>
        <li>
          <a href="#" className={cx("side-menu__item")}>
            <Users />
          </a>
        </li>
        <li>
          <a href="#" className={cx("side-menu__item")}>
            <Notification />
          </a>
        </li>
      </ul>

      <button className={cx("side-settings")}>
        <Settings />
      </button>
    </div>
  );
};

export default LeftSide;
