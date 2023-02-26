import React from 'react'
import style from './Dialogues.module.scss'
import bindClass from 'classnames/bind'
import Search from '@components/icons/Search'
import avatar from "@assets/images/Userpic.jpg"
const cx = bindClass.bind(style)
const Dialogues = () => {
    return (
        <div className={cx('dialogues')}>
            <div className={cx("header")}>
                <div className={cx("search")}>
                    <div className={cx("search-icon")}><Search /></div>
                    <input type="text" placeholder='Enter for search...' />
                </div>
            </div>

            <div className={cx("dialogues-list")}>
                <a href="#">
                    <div className={cx("dialogues-items")}>
                        <div className={cx("items-info")}>
                            <div className={cx("avatar")}>
                                <img src={avatar} alt="avatar" />
                                <div className={cx("dot-status", "online", "dot")}></div>
                            </div>
                            <div className={cx("name-box")}>
                                <div className={cx("name")}>Donald Johnson</div>
                                <div className={cx("online-status")}>Online</div>
                            </div>
                            <div className={cx("online-time")}>3h ago</div>
                        </div>
                        <div className={cx("message-box")}>
                            <div className={cx("message")}>Analysis of foreign experience, as it is commo…</div>
                            <div className={cx("count")}>2</div>
                        </div>
                    </div>
                </a>

                <a href="#">
                    <div className={cx("dialogues-items", "dark")}>
                        <div className={cx("items-info")}>
                            <div className={cx("avatar")}>
                                <img src={avatar} alt="avatar" />
                                <div className={cx("dot-status", "dot")}></div>
                            </div>
                            <div className={cx("name-box", "dark")}>
                                <div className={cx("name")}>Donald Johnson</div>
                                <div className={cx("online-status")}>Online</div>
                            </div>
                            <div className={cx("online-time")}>3h ago</div>
                        </div>
                        <div className={cx("message-box")}>
                            <div className={cx("message")}>Analysis of foreign experience, as it is commo…</div>
                            <div className={cx("count")}>2</div>
                        </div>
                    </div>
                </a>
                <a href="#">
                    <div className={cx("dialogues-items")}>
                        <div className={cx("items-info")}>
                            <div className={cx("avatar")}>
                                <img src={avatar} alt="avatar" />
                                <div className={cx("dot-status", "dot")}></div>
                            </div>
                            <div className={cx("name-box")}>
                                <div className={cx("name")}>Donald Johnson</div>
                                <div className={cx("online-status")}>Online</div>
                            </div>
                            <div className={cx("online-time")}>3h ago</div>
                        </div>
                        <div className={cx("message-box")}>
                            <div className={cx("message")}>Analysis of foreign experience, as it is commo…</div>
                            <div className={cx("count")}>2</div>
                        </div>
                    </div>
                </a>
                <a href="#">
                    <div className={cx("dialogues-items", "dark")}>
                        <div className={cx("items-info")}>
                            <div className={cx("avatar")}>
                                <img src={avatar} alt="avatar" />
                                <div className={cx("dot-status", "online", "dot")}></div>
                            </div>
                            <div className={cx("name-box")}>
                                <div className={cx("name")}>Donald Johnson</div>
                                <div className={cx("online-status")}>Online</div>
                            </div>
                            <div className={cx("online-time")}>3h ago</div>
                        </div>
                        <div className={cx("message-box")}>
                            <div className={cx("message")}>Analysis of foreign experience, as it is commo…</div>
                            <div className={cx("count")}>2</div>
                        </div>
                    </div>
                </a>
                <a href="#">
                    <div className={cx("dialogues-items")}>
                        <div className={cx("items-info",)}>
                            <div className={cx("avatar")}>
                                <img src={avatar} alt="avatar" />
                                <div className={cx("dot-status", "online", "dot")}></div>
                            </div>
                            <div className={cx("name-box")}>
                                <div className={cx("name")}>Donald Johnson</div>
                                <div className={cx("online-status")}>Online</div>
                            </div>
                            <div className={cx("online-time")}>3h ago</div>
                        </div>
                        <div className={cx("message-box")}>
                            <div className={cx("message")}>Analysis of foreign experience, as it is commo…</div>
                            <div className={cx("count")}>2</div>
                        </div>
                    </div>
                </a>

            </div>
        </div>
    )
}

export default Dialogues