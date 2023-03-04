import React, { useState, MouseEvent, useMemo, useEffect, ChangeEvent, useRef } from 'react'
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
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { MessageType } from '../../types/Message'
import conversationApi from '@apis/conversation.api'
import { Socket } from 'socket.io-client'
import { setMessages } from '@redux/slices/Message.slice'
import { format } from "timeago.js"
import { User } from '../../types/conversation'

const cx = bindClass.bind(styles)

interface ChatProps {
    clickRightSide?: (clickState: boolean) => void
}

interface ConversationInfo {
    name?: string,
    isOnline?: boolean,
    avatar?: string
}
const Chat = ({ clickRightSide }: ChatProps) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()
    const [showEmoji, setShowEmoji] = useState<boolean>(false)
    const [sidebarState, setSidebarState] = useState<boolean>(false)
    // const [messages, setMessages] = useState<MessageType[] | null>([])
    const messages = useAppSelector(state => state.messages)
    const [typingMessage, setTypingMessage] = useState<string>("")
    const [receivers, setReceivers] = useState<User | User[] | undefined>([])
    const [conversationInfo, setConversationInfo] = useState<ConversationInfo>({
        name: "",
        isOnline: false
    })
    const chatConversation = useAppSelector(state => state.chat)
    const auth = useAppSelector(state => state.auth.profile)
    const socket = useAppSelector(state => state.socket.socket)


    // get list messages
    useEffect(() => {
        if (chatConversation.currentChat) {

            //* get list messages of currentChat
            conversationApi.getMessages(chatConversation.currentChat._id)
                .then(res => dispatch(setMessages({
                    conversationId: chatConversation.currentChat?._id,
                    messages: res.data.data.docs
                })))
                .catch(err => console.log(err))


            /**
             * get conversation info
             ** name, avatar, online statue, receiver
             */
            if (!chatConversation.currentChat.is_group) {
                let friend = chatConversation.currentChat?.members.find(item => item._id !== auth?._id)
                // get conversation info
                setConversationInfo({
                    name: `${friend?.first_name} ${friend?.last_name}`,
                    avatar: friend?.avatar_url,
                    isOnline: friend?.online_status === "online" ? true : false
                })

                setReceivers(friend)
            } else {
                setReceivers(chatConversation.currentChat.members.filter(fr => fr._id !== auth?._id))
                setConversationInfo({
                    name: chatConversation.currentChat.name,
                    isOnline: chatConversation.currentChat.members.some(fr => fr.online_status === "online"),
                })
            }

        }


    }, [chatConversation.currentChat])

    // // register receiveMessage
    // useEffect(() => {
    //     let parseSocket = socket as Socket
    //     if (!parseSocket) return
    //     console.log("register receiveMsg")

    //     parseSocket.on("receiveMessage", (msg: MessageType) => {
    //         dispatch(addMessage(msg))
    //     })


    //     return () => {
    //         parseSocket.off("receiveMessage")
    //     }

    // }, [chatConversation.currentChat, socket])


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })

    }, [messages.messages])
    // handle click emoji icon to show, hide emoji picker
    const handleClickEmoji = (e: MouseEvent) => {
        e.stopPropagation()
        setShowEmoji(prev => !prev)
    }

    //  hide emoji picker if click outsidez
    const handleClickOutSideEmoji = () => {
        setShowEmoji(false)
    }

    // handle click right sidebar button
    const handleClickRightSide = () => {
        setSidebarState(prev => {
            if (clickRightSide) {
                clickRightSide(!prev)
            }
            return !prev
        })

    }

    //generate list message
    const genMessages = () => {
        if (messages.conversationId !== chatConversation.currentChat?._id) return
        return messages.messages?.map(message => {
            let senderId = message.sender._id || message.sender
            let msgType: "my-msg" | "friend-msg" = senderId === auth?._id ? "my-msg" : "friend-msg"
            return <MessageItem key={message._id} message={message} msgType={msgType} />
        })
    }

    //handle type message
    const handleOnchangeMsg = (e: ChangeEvent<HTMLInputElement>) => {
        setTypingMessage(e.target.value)
    }

    // handle send message
    const handleSendMsg = () => {
        if (socket) {
            socket.emit("sendMessage", {
                conversation: chatConversation.currentChat,
                sender: auth,
                message: typingMessage,
                to: receivers
            })
        }
        setTypingMessage("")
    }
    return (
        <div className={cx("chat-box")}>
            <div className={cx("header")}>
                <div className={cx("avatar")}>
                    <img src={conversationInfo.avatar || avatar} alt="avatar" />
                    <div className={cx("dot-status", { "online": conversationInfo.isOnline }, "avt-dot")}></div>
                </div>
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
                    <button className={cx("call")}><HiPhone /></button>
                    <button className={cx("video-call")}><HiVideoCamera /></button>
                    <button className={cx("sidebar-right", { active: sidebarState })} onClick={handleClickRightSide}><BsLayoutSidebarInsetReverse /></button>
                </div>
            </div>
            <div className={cx("chat-content")}>
                {genMessages()}
                <div style={{ float: "left", clear: "both" }} ref={scrollRef}></div>
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
                    <input type="text" placeholder='Type a message hear...' onChange={handleOnchangeMsg} value={typingMessage} />
                    <div className={cx("buttons")}>
                        <button className={cx('btn-action', 'btn-emoji', { show: showEmoji })} onClick={handleClickEmoji}>
                            <MdEmojiEmotions />
                        </button>
                        <button className={cx('btn-action', 'btn-mic')}><BsFillMicFill /></button>
                        <button onClick={handleSendMsg} className={cx('btn-action', 'btn-send')}> <IoIosPaperPlane /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export interface MessageItemProps {
    msgType: "my-msg" | "friend-msg",
    message: MessageType
}
export const MessageItem = ({ message, msgType = "my-msg" }: MessageItemProps) => {
    return (
        <div className={cx("message", msgType)}>
            <div className={cx("box")}>
                <div className={cx("message-content")}>
                    {message.content}
                    <div className={cx("curve")}>
                        <svg width="30" height="14" viewBox="0 0 30 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.0004 1.1951C21.3383 2.57777 22.8564 6.57786 29.5138 10.9208C29.8564 11.1444 30.0225 11.5367 29.937 11.9215C29.8515 12.306 29.5307 12.6103 29.1192 12.6975C29.0819 12.7054 28.1853 12.8928 26.5754 13.0336C21.9849 13.4352 12.5296 13.4087 0.56729 8.76526C-0.31396 8.88622 25.4393 -1.80179 21.0004 1.1951Z" />
                        </svg>

                    </div>
                </div>
                <div className={cx("message-times")}>
                    {format(message.createdAt.toString())}
                    {/* Yesterday 14:38 PM */}
                </div>

            </div>
        </div>
    )
}

export default Chat