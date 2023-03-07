import List from '@components/List/List'
import React, { useMemo } from 'react'
import { HiOutlineUsers } from 'react-icons/hi'
import { Outlet, useLocation } from 'react-router-dom'
import styles from './ListPage.module.scss'
import bindClass from 'classnames/bind'
import { HiOutlineUserGroup } from 'react-icons/hi2'
import { IoMailOpenOutline } from 'react-icons/io5'

const cx = bindClass.bind(styles)
interface ListPageProps {
    headerType: "friends" | "groups" | "request"
}

const header: { [key: string]: any } = {
    "friends": (<>
        <span className={cx("icons-box")}>
            <HiOutlineUsers />
        </span>
        <span className={cx("text")}>Danh Sách Bạn Bè</span>
    </>),
    "groups": (
        <>
            <span className={cx("icons-box")}>
                <HiOutlineUserGroup />
            </span>
            <span className={cx("text")}>Danh Sách Nhóm</span>
        </>
    ),
    "request-friends": (
        <>
            <span className={cx("icons-box")}>
                <IoMailOpenOutline />
            </span>
            <span className={cx("text")}>Lời mời kết bạn</span>
        </>
    ),
    "list": (
        <>
            <span className={cx("icons-box")}>
                <HiOutlineUsers />
            </span>
            <span className={cx("text")}>Danh Sách Bạn Bè</span>
        </>
    )
}
const ListPage = () => {
    const location = useLocation()
    const titleSelector = useMemo(() => {
        let stringArr = location.pathname.replace(/\/$/, '').split("/")
        return stringArr.pop()
    }, [location])

    return (
        <>
            <List />
            <div className={cx("list-item_content")}>
                <div className={cx("header")}>
                    {header[titleSelector || "list"]}
                </div>
                <div className={cx("content")}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default ListPage