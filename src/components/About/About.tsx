import React, { useMemo } from 'react'
import styles from './About.module.scss'
import bindClass from 'classnames/bind'
import avatar from '@assets/images/Userpic.jpg'

import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"
import { useAppSelector } from '@hooks/redux'
const cx = bindClass.bind(styles)
const About = () => {
    const currentChat = useAppSelector(state => state.chat.currentChat)
    const auth = useAppSelector(state => state.auth)
    const friends = useMemo(() => {
        return currentChat?.members.filter(fr => fr._id !== auth?.profile?._id)
    }, [currentChat, auth.profile])

    return (
        <div className={cx("about-user")}>
            <div className={cx("avatar", { "group-avatar": currentChat?.is_group }, `member-${currentChat?.members.length}`)}>
                {!currentChat?.is_group && <img src={friends ? friends[0].avatar_url : avatar} alt="avatar" />}
                {currentChat?.is_group && currentChat.members.map((fr, index) => <img key={index.toString()} src={fr.avatar_url} alt="avatar" />)}
            </div>
            <div className={cx("active")}>
                <div className={cx("dot-status", { "online": friends?.some(fr => fr.online_status === "online") }, "dot")}></div>
                active now
            </div>
            <div className={cx("name")}>
                {currentChat?.is_group && currentChat.name}
                {!currentChat?.is_group && friends && `${friends[0].first_name} ${friends[0].last_name}`}
            </div>

            {/* <div className={cx("socials")}>
                <a className={cx("social-links", "facebook-icons")} href="#"><FaFacebookF /></a>
                <a className={cx("social-links", "twitter-icons")} href="#"><FaTwitter /></a>
                <a className={cx("social-links", "instagram-icons")} href="#"><FaInstagram /></a>
            </div> */}
        </div>
    )
}

export default About