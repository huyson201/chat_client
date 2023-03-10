import React, { CSSProperties } from "react";
import styles from "./LeftSide.module.scss";
import bindClass from "classnames/bind";
import { AiOutlinePoweroff } from "react-icons/ai"
import { HiOutlineUsers } from 'react-icons/hi2'
import { BsBell, BsChatText } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "@redux/thunks/auth.thunk";
const cx = bindClass.bind(styles);

export interface CSSPropertiesWithVars extends CSSProperties {
  '--pos': string;
  // any other vars you may use
}
const LeftSide = () => {

  const auth = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
      .then(() => {
        navigate("/login", { replace: true })
      })
      .catch(err => console.log(err))

  }

  return (
    <div className={cx("left-side")}>
      <div className={cx("avatar")}>
        <img src={auth.profile?.avatar_url} alt="avatar" />
        <div className={cx("dot-status", "dot", auth.profile?.online_status, "status")}></div>
      </div>
      <ul className={cx("side-menu")} style={{ '--pos': '1' } as CSSPropertiesWithVars}>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive === true) ? cx("side-menu__item", 'active', "icons") : cx("side-menu__item", "icons")}>
            <BsChatText />
          </NavLink>
        </li>

        <li>
          <NavLink to="/list" className={({ isActive }) => isActive === true ? cx("side-menu__item", 'active', "icons") : cx("side-menu__item", "icons")}>
            <HiOutlineUsers />
          </NavLink>
        </li>
        <li>
          <a href="#" className={cx("side-menu__item", "icons")}>
            <BsBell />
          </a>
        </li>
      </ul>

      <button className={cx("side-signOut", "icons")} onClick={handleLogout}>
        <AiOutlinePoweroff />
      </button>
    </div>
  );
};

export default LeftSide;
