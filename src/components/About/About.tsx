import React from 'react'
import styles from './About.module.scss'
import bindClass from 'classnames/bind'
import avatar from '@assets/images/Userpic.jpg'

import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"
const cx = bindClass.bind(styles)
const About = () => {
    return (
        <div className={cx("about-user")}>
            <div className={cx("avatar")}>
                <img src={avatar} alt="avatar" />
                <div className={cx("dot-status", "online", "dot")}></div>
            </div>
            <div className={cx("name")}>Tobias Williams</div>
            <div className={cx("activity")}>
                Help people to build websites and apps + grow awareness in social media 🔥
            </div>
            <div className={cx("socials")}>
                <a className={cx("social-links", "facebook-icons")} href="#"><FaFacebookF /></a>
                <a className={cx("social-links", "twitter-icons")} href="#"><FaTwitter /></a>
                <a className={cx("social-links", "instagram-icons")} href="#"><FaInstagram /></a>
            </div>
        </div>
    )
}

export default About