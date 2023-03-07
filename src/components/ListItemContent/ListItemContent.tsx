import React, { useEffect, useMemo, useState } from 'react'

import styles from './ListItemContent.module.scss'
import bindClass from 'classnames/bind'
import { HiOutlineUsers } from 'react-icons/hi2'
import { BsSearch } from 'react-icons/bs'
import avatar from '@assets/images/Userpic.jpg'
import { MdMoreHoriz } from 'react-icons/md'
import { Outlet, useLoaderData } from 'react-router-dom'
import authApis from '@apis/auth.api'
import { AuthCommonInfo } from '../../types/Auth'
import { ConversationType } from '../../types/conversation'

const cx = bindClass.bind(styles)

export interface ListItemContentProps {
    type: "friends" | "groups"
}

let apiSelect = {
    "friends": authApis.getFriends,
    "groups": authApis.getGroups
}
export const ListItemContent = ({ type }: ListItemContentProps) => {
    const data = useLoaderData() as any[]

    const genList = useMemo(() => {
        if (data && data.length > 0) {
            if (type === "friends") {
                let character = data[0].first_name.charAt(0).toUpperCase()
                let renderChar = false
                return (data as AuthCommonInfo[]).map((item, index) => {

                    if (item.first_name.charAt(0).toUpperCase() !== character) {
                        character = item.first_name.charAt(0).toUpperCase()
                        renderChar = false
                    }

                    if (renderChar === false) {
                        renderChar = true
                        return (
                            <React.Fragment key={item._id + character} >
                                <div key={`${index.toString()}`} className={cx("character")}>{character}</div>
                                <FriendItem key={item._id + `${Math.random().toString()}`} data={item} type='friend' />
                            </React.Fragment>
                        )
                    }
                    return <FriendItem key={item._id + `${Math.random().toString()}`} data={item} type='friend' />
                })
            }
            return (data as ConversationType[]).map(item => {
                return <FriendItem key={item._id} data={item} type='groups' />
            })
        }
        return null
    }, [data])


    return (
        <>
            <div className={cx("content-title")}>{type === "friends" ? "Bạn bè" : "Danh sách nhóm"}<span className="count"> ({data && data.length})</span></div>
            <div className={cx("list-items")}>
                <div className={cx("filter")}>
                    <div className={cx("search-box")}>
                        <div className={cx("search-icon")}><BsSearch /></div>
                        <input type="text" placeholder='Tìm bạn' />
                    </div>
                </div>

                <div className={cx("items")}>
                    {genList}
                </div>
            </div>
        </>
    )
}

export interface FriendItemProps {
    data: any,
    type: "friend" | "groups"
}

const FriendItem = ({ data, type }: FriendItemProps) => {
    return (
        <div className={cx("friend-item")}>
            <div className={cx("item-avatar")}>
                {type === "friend" && <img src={data.avatar_url} alt="avatar" />}
                {type === "groups" && <img src={avatar} alt="avatar" />}
            </div>
            <div className={cx("item-name")}>
                {type === "groups" ? data.name : `${data.first_name} ${data.last_name}`}
                {type === "groups" && <div className={cx("member")}>{data.members.length} Thành viên</div>}
            </div>
            <button className={cx("more")}>
                <MdMoreHoriz />
            </button>
        </div>
    )
}
