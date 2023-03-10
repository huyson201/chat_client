import React from 'react'
import bindClass from 'classnames/bind'
import styles from './ChatHeader.module.scss'
import { ConversationInfo } from '../Chat'
import { HiPhone, HiVideoCamera } from 'react-icons/hi2'
import { BsLayoutSidebarInsetReverse } from 'react-icons/bs'

const cx = bindClass.bind(styles)

export interface ChatHeaderProps {
    conversationInfo: ConversationInfo
    active: boolean,
    handleClickRightSide: () => void
}

const ChatHeader = ({ conversationInfo, active, handleClickRightSide }: ChatHeaderProps) => {

    return (
        <div className={cx("header")}>
            {conversationInfo.is_group ? (
                <div className={cx("avatar", "group-avatar", `member-${conversationInfo.avatar?.length}`)}>
                    {
                        Array.isArray(conversationInfo.avatar) && conversationInfo.avatar.map(url => {
                            return (
                                <img key={url} src={url} alt="avatar" />
                            )
                        })
                    }
                    <div className={cx("dot-status", { "online": conversationInfo.isOnline }, "avt-dot")}></div>
                </div>
            ) : (
                <div className={cx("avatar")}>
                    {
                        !Array.isArray(conversationInfo.avatar) && <img src={conversationInfo.avatar} alt="avatar" />
                    }

                    <div className={cx("dot-status", { "online": conversationInfo.isOnline }, "avt-dot")}></div>
                </div>
            )}

            <div className={cx("info")}>
                <div className={cx("name")}>{conversationInfo.name || ''}</div>
                <div className={cx("online-status")}>
                    {conversationInfo.isOnline ? "Active now" : <>
                        <span>Offline</span>
                        <span className={cx("dot")}></span>
                        <span className="last-seen">Last seen 3 hours ago</span>
                    </>}

                </div>
            </div>
            <div className={cx("actions")}>
                {/* <button className={cx("call")}><HiPhone /></button>
                <button className={cx("video-call")}><HiVideoCamera /></button> */}
                {/* <button className={cx("sidebar-right", { active })} onClick={handleClickRightSide}><BsLayoutSidebarInsetReverse /></button> */}
            </div>
        </div>
    )
}

export default ChatHeader;