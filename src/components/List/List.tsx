import React from 'react'

import styles from './List.module.scss'
import bindClass from 'classnames/bind'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { HiOutlineUserGroup, HiOutlineUsers } from 'react-icons/hi2'
import { IoMailOpenOutline } from 'react-icons/io5'
const cx = bindClass.bind(styles)

const List = () => {


    return (
        <div className={cx("list")}>
            <NavLink to={''} end className={({ isActive }) => isActive ? cx("list-item", "active") : cx("list-item")}>
                <span className={cx("icons-box")}>
                    <HiOutlineUsers />
                </span>
                <span className={cx("text")}>Danh Sách Bạn Bè</span>
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? cx("list-item", "active") : cx("list-item")} to={'groups'}>
                <span className={cx("icons-box")}>
                    <HiOutlineUserGroup />
                </span>
                <span className={cx("text")}>Danh Sách Nhóm</span>
            </NavLink>
            <NavLink end className={cx("list-item")} to={'request-friends'}>
                <span className={cx("icons-box")}>
                    <IoMailOpenOutline />
                </span>
                <span className={cx("text")}>Lời mời kết bạn</span>
            </NavLink>
        </div>
    )
}

export default List