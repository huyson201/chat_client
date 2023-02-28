import React, { useState, MouseEvent } from 'react'
import styles from './Chat.module.scss'
import bindClass from 'classnames/bind'
import avatar from '@assets/images/Userpic.jpg'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { ImAttachment } from 'react-icons/im'
import { MdEmojiEmotions } from 'react-icons/md'
import { IoIosPaperPlane } from 'react-icons/io'
import { BsFillMicFill, BsLayoutSidebarInsetReverse } from 'react-icons/bs'
import { HiPhone, HiVideoCamera } from 'react-icons/hi'

const cx = bindClass.bind(styles)

interface ChatProps {
    clickRightSide?: (clickState: boolean) => void
}
const Chat = ({ clickRightSide }: ChatProps) => {
    const [showEmoji, setShowEmoji] = useState<boolean>(false)
    const [sidebarState, setSidebarState] = useState<boolean>(false)


    // handle click emoji icon to show, hide emoji picker
    const handleClickEmoji = (e: MouseEvent) => {
        e.stopPropagation()
        setShowEmoji(prev => !prev)
    }

    //  hide emoji picker if click outside
    const handleClickOutSideEmoji = () => {
        setShowEmoji(false)
    }

    // handle click right sidebar button
    const handleClickRightSide = () => {
        setSidebarState(prev => !prev)
        if (clickRightSide) {
            clickRightSide(sidebarState)
        }
    }

    return (
        <div className={cx("chat-box")}>
            <div className={cx("header")}>
                <div className={cx("avatar")}>
                    <img src={avatar} alt="avatar" />
                    <div className={cx("dot-status", "online", "avt-dot")}></div>

                </div>
                <div className={cx("info")}>
                    <div className={cx("name")}>Tobias Williams</div>
                    <div className={cx("online-status")}>
                        <span>Offline</span>
                        <span className={cx("dot")}></span>
                        <span className="last-seen">Last seen 3 hours ago</span>
                    </div>
                </div>
                <div className={cx("actions")}>
                    <button className={cx("call")}><HiPhone /></button>
                    <button className={cx("video-call")}><HiVideoCamera /></button>
                    <button className={cx("sidebar-right", { active: sidebarState })} onClick={handleClickRightSide}><BsLayoutSidebarInsetReverse /></button>
                </div>
            </div>
            <div className={cx("chat-content")}>
                <div className={cx("message", "friend-msg")}>
                    <div className={cx("box")}>
                        <div className={cx("message-content")}>
                            Hi Alex! What’s Up?
                            <div className={cx("curve")}>
                                <svg width="28" height="13" viewBox="0 0 28 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.98249 0.996751C8.65976 2.38087 7.22337 6.38845 1.00514 10.7702C0.685125 10.9958 0.52828 11.389 0.60542 11.773C0.682577 12.1569 0.979029 12.4591 1.3612 12.5437C1.39586 12.5513 2.22856 12.7332 3.725 12.8641C7.99194 13.2374 16.7859 13.1529 27.9398 8.43827C28.7586 8.55378 4.87252 -1.97158 8.98249 0.996751Z" />
                                </svg>

                            </div>
                        </div>
                        <div className={cx("message-times")}>Yesterday 14:38 PM</div>

                    </div>
                </div>
                <div className={cx("message", "my-msg")}>
                    <div className={cx("box")}>
                        <div className={cx("message-content")}>
                            Oh, hello! All perfectly.
                            I work, study and know this wonderful world!
                            <div className={cx("curve")}>
                                <svg width="30" height="14" viewBox="0 0 30 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.0004 1.1951C21.3383 2.57777 22.8564 6.57786 29.5138 10.9208C29.8564 11.1444 30.0225 11.5367 29.937 11.9215C29.8515 12.306 29.5307 12.6103 29.1192 12.6975C29.0819 12.7054 28.1853 12.8928 26.5754 13.0336C21.9849 13.4352 12.5296 13.4087 0.56729 8.76526C-0.31396 8.88622 25.4393 -1.80179 21.0004 1.1951Z" />
                                </svg>

                            </div>
                        </div>
                        <div className={cx("message-times")}>Yesterday 14:38 PM</div>

                    </div>
                </div>
                <div className={cx("message", "friend-msg")}>
                    <div className={cx("box")}>
                        <div className={cx("message-content")}>
                            Hi Alex! What’s Up?
                            <div className={cx("curve")}>
                                <svg width="28" height="13" viewBox="0 0 28 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.98249 0.996751C8.65976 2.38087 7.22337 6.38845 1.00514 10.7702C0.685125 10.9958 0.52828 11.389 0.60542 11.773C0.682577 12.1569 0.979029 12.4591 1.3612 12.5437C1.39586 12.5513 2.22856 12.7332 3.725 12.8641C7.99194 13.2374 16.7859 13.1529 27.9398 8.43827C28.7586 8.55378 4.87252 -1.97158 8.98249 0.996751Z" />
                                </svg>

                            </div>
                        </div>
                        <div className={cx("message-times")}>Yesterday 14:38 PM</div>

                    </div>
                </div>
                <div className={cx("message", "friend-msg")}>
                    <div className={cx("box")}>
                        <div className={cx("message-content")}>
                            Hi Alex! What’s Up?
                            <div className={cx("curve")}>
                                <svg width="28" height="13" viewBox="0 0 28 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.98249 0.996751C8.65976 2.38087 7.22337 6.38845 1.00514 10.7702C0.685125 10.9958 0.52828 11.389 0.60542 11.773C0.682577 12.1569 0.979029 12.4591 1.3612 12.5437C1.39586 12.5513 2.22856 12.7332 3.725 12.8641C7.99194 13.2374 16.7859 13.1529 27.9398 8.43827C28.7586 8.55378 4.87252 -1.97158 8.98249 0.996751Z" />
                                </svg>

                            </div>
                        </div>
                        <div className={cx("message-times")}>Yesterday 14:38 PM</div>

                    </div>
                </div>
                <div className={cx("message", "friend-msg")}>
                    <div className={cx("box")}>
                        <div className={cx("message-content")}>
                            Hi Alex! What’s Up?
                            <div className={cx("curve")}>
                                <svg width="28" height="13" viewBox="0 0 28 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.98249 0.996751C8.65976 2.38087 7.22337 6.38845 1.00514 10.7702C0.685125 10.9958 0.52828 11.389 0.60542 11.773C0.682577 12.1569 0.979029 12.4591 1.3612 12.5437C1.39586 12.5513 2.22856 12.7332 3.725 12.8641C7.99194 13.2374 16.7859 13.1529 27.9398 8.43827C28.7586 8.55378 4.87252 -1.97158 8.98249 0.996751Z" />
                                </svg>

                            </div>
                        </div>
                        <div className={cx("message-times")}>Yesterday 14:38 PM</div>

                    </div>
                </div>
                <div className={cx("message", "my-msg")}>
                    <div className={cx("box")}>
                        <div className={cx("message-content")}>
                            Oh, hello! All perfectly.
                            I work, study and know this wonderful world!
                            <div className={cx("curve")}>
                                <svg width="30" height="14" viewBox="0 0 30 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.0004 1.1951C21.3383 2.57777 22.8564 6.57786 29.5138 10.9208C29.8564 11.1444 30.0225 11.5367 29.937 11.9215C29.8515 12.306 29.5307 12.6103 29.1192 12.6975C29.0819 12.7054 28.1853 12.8928 26.5754 13.0336C21.9849 13.4352 12.5296 13.4087 0.56729 8.76526C-0.31396 8.88622 25.4393 -1.80179 21.0004 1.1951Z" />
                                </svg>

                            </div>
                        </div>
                        <div className={cx("message-times")}>Yesterday 14:38 PM</div>

                    </div>
                </div>
            </div>

            <div className={cx("send-message")} >
                <div className={cx("emoji-picker", { "show": showEmoji })}>
                    <Picker
                        onClickOutside={handleClickOutSideEmoji}
                        navPosition={"bottom"}
                        locale="vi"
                        perLine={11}
                        maxFrequentRows={1}
                        previewPosition={"none"}
                        data={data}
                        onEmojiSelect={console.log}
                        showPreview={false}
                        showSkinTones={false}
                        theme={"auto"}
                    />
                </div>
                <div className={cx("input-field")}>
                    <div className={cx("files")}>
                        <button className={cx('btn-action', 'btn-attack-file')}>
                            <ImAttachment />
                        </button>
                    </div>
                    <input type="text" placeholder='Type a message hear...' />
                    <div className={cx("buttons")}>
                        <button className={cx('btn-action', 'btn-emoji', { show: showEmoji })} onClick={handleClickEmoji}>
                            <MdEmojiEmotions />
                        </button>
                        <button className={cx('btn-action', 'btn-mic')}><BsFillMicFill /></button>
                        <button className={cx('btn-action', 'btn-send')}> <IoIosPaperPlane /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat