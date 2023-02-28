import React from "react";
import styles from './LoginRegister.module.scss'
import bindClass from 'classnames/bind'
import { Outlet } from "react-router-dom";

const cx = bindClass.bind(styles)
const LoginRegister = () => {
  return <div className={cx("login-register")}>
    <Outlet />
  </div>;
};

export default LoginRegister;
