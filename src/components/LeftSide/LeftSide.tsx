import React, { CSSProperties } from "react";
import styles from "./LeftSide.module.scss";
import bindClass from "classnames/bind";
import avatar from "@assets/images/Userpic.jpg";
import { AiFillHome } from "react-icons/ai"
import { FaUserFriends, FaBell } from 'react-icons/fa'
import { GoSignOut } from 'react-icons/go'
import { useAppSelector } from "@hooks/redux";
const cx = bindClass.bind(styles);

export interface CSSPropertiesWithVars extends CSSProperties {
  '--pos': string;
  // any other vars you may use
}
const LeftSide = () => {

  const auth = useAppSelector(state => state.auth)

  return (
    <div className={cx("left-side")}>
      <div className={cx("avatar")}>
        <img src={auth.profile?.avatar_url} alt="avatar" />
        <div className={cx("dot-status", auth.profile?.online_status, "status")}></div>
      </div>
      <ul className={cx("side-menu")} style={{ '--pos': '1' } as CSSPropertiesWithVars}>
        <li>
          <a href="#" className={cx("side-menu__item", 'active', "icons")}>
            <AiFillHome />
          </a>
        </li>

        <li>
          <a href="#" className={cx("side-menu__item", "icons")}>
            <FaUserFriends />
          </a>
        </li>
        <li>
          <a href="#" className={cx("side-menu__item", "icons")}>
            <FaBell />
          </a>
        </li>
      </ul>

      <button className={cx("side-signOut", "icons")}>
        <GoSignOut />
      </button>
    </div>
  );
};

export default LeftSide;
