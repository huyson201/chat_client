import React, { CSSProperties } from "react";
import styles from "./LeftSide.module.scss";
import bindClass from "classnames/bind";
import avatar from "@assets/images/Userpic.jpg";
import { AiFillHome } from "react-icons/ai"
import { IoIosPaperPlane, IoIosSettings } from 'react-icons/io'
import { FaUsers, FaBell } from 'react-icons/fa'
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
          <a href="#" className={cx("side-menu__item", 'active', "icons")}>
            <AiFillHome />
          </a>
        </li>
        <li>
          <a href="#" className={cx("side-menu__item", "icons")}>
            <IoIosPaperPlane />
          </a>
        </li>

        <li>
          <a href="#" className={cx("side-menu__item", "icons")}>
            <FaUsers />
          </a>
        </li>
        <li>
          <a href="#" className={cx("side-menu__item", "icons")}>
            <FaBell />
          </a>
        </li>
      </ul>

      <button className={cx("side-settings", "icons")}>
        <IoIosSettings />
      </button>
    </div>
  );
};

export default LeftSide;
