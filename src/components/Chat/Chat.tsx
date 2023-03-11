import React, { useState, useEffect, useRef, useCallback } from 'react'
import styles from './Chat.module.scss'
import bindClass from 'classnames/bind'
import ChatInput from './ChatInput/ChatInput'
import ChatHeader from './ChatHeader/ChatHeader'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import conversationApi from '@apis/conversation.api'
import { setMessages } from '@redux/slices/Message.slice'
import { User } from '../../types/conversation'
import { RotatingLines } from 'react-loader-spinner'
import MessageItem from './MessageItem/MessageItem'
import chatImg from '@assets/images/group-chat.svg'
import About from "@components/About/About";
import { FileUploadResponse } from '../../types/common'
import FileMessage from './FileMessage/FileMessage'

const cx = bindClass.bind(styles)

interface ChatProps {
    clickRightSide?: (clickState: boolean) => void
}

export interface ConversationInfo {
    name?: string,
    isOnline?: boolean,
    avatar?: string | string[],
    is_group: boolean
}
const Chat = ({ clickRightSide }: ChatProps) => {

    const dispatch = useAppDispatch()
    const messages = useAppSelector(state => state.messages)


    const chatContentRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    const [receivers, setReceivers] = useState<User | User[] | undefined>([])
    const [sidebarState, setSidebarState] = useState<boolean>(false)
    const [showMessageLoader, setShowMessageLoader] = useState<boolean>(false)
    const [conversationInfo, setConversationInfo] = useState<ConversationInfo>({
        name: "",
        isOnline: false,
        is_group: false
    })

    const chatConversation = useAppSelector(state => state.chat)
    const auth = useAppSelector(state => state.auth.profile)
    const socket = useAppSelector(state => state.socket.socket)

    const [firstLoad, setFirstLoad] = useState<boolean>(false)





    //* load messages
    useEffect(() => {
        if (chatConversation.currentChat) {
            setShowMessageLoader(true)
            conversationApi.getMessages(chatConversation.currentChat._id)
                .then(res => {
                    return dispatch(setMessages({
                        conversationId: chatConversation.currentChat?._id,
                        messages: res.data.data
                    }))
                })
                .catch(err => console.log(err)).finally(() => {
                    setShowMessageLoader(false)
                })
        }
    }, [chatConversation.currentChat])


    useEffect(() => {
        setFirstLoad(false)
    }, [chatConversation.currentChat])

    //* get conversation info
    useEffect(() => {
        if (chatConversation.currentChat) {
            /**
             ** get conversation info
             ** name, avatar, online statue, receiver
             */
            if (!chatConversation.currentChat.is_group) {
                let friend = chatConversation.currentChat.members.find(item => item._id !== auth?._id)
                // get conversation info
                setConversationInfo({
                    name: `${friend?.first_name} ${friend?.last_name}`,
                    avatar: friend?.avatar_url,
                    isOnline: friend?.online_status === "online" ? true : false,
                    is_group: false
                })

                setReceivers(friend)
            } else {
                setReceivers(chatConversation.currentChat.members.filter(fr => fr._id !== auth?._id))
                setConversationInfo({
                    name: chatConversation.currentChat.name,
                    isOnline: chatConversation.currentChat.members.some(fr => fr.online_status === "online"),
                    is_group: true,
                    avatar: chatConversation.currentChat.members.map(mem => mem.avatar_url)
                })
            }

        }


    }, [chatConversation.currentChat, messages.messages])

    //* scroll to bottom
    useEffect(() => {

        if (scrollRef.current && firstLoad) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }

        if (!chatContentRef.current || !messages.messages || firstLoad) return
        const { scrollHeight, clientHeight } = chatContentRef.current
        chatContentRef.current.scrollTop = scrollHeight - clientHeight
        setFirstLoad(true)
    }, [messages.messages])




    //* handle click right sidebar button
    const handleClickRightSide = () => {
        setSidebarState(prev => {
            if (clickRightSide) {
                clickRightSide(!prev)
            }
            return !prev
        })

    }



    //* handle send message
    const handleSendMsg = (message: string) => {
        if (socket) {
            socket.emit("sendMessage", {
                conversation: chatConversation.currentChat,
                sender: auth,
                message: message,
                to: receivers
            })


        }
    }

    const handleSendFile = (fileInfo: FileUploadResponse) => {
        if (socket) {
            socket.emit("sendMessage", {
                conversation: chatConversation.currentChat,
                sender: auth,
                message: fileInfo.filename,
                fileUrl: fileInfo.fileUrl,
                contentType: "file",
                to: receivers
            })


        }
    }


    //* generate list message
    const genMessages = () => {
        if (messages.conversationId !== chatConversation.currentChat?._id) return
        return messages.messages?.map((message, index) => {
            let senderId = message.sender._id || message.sender
            let msgType: "my-msg" | "friend-msg" = senderId === auth?._id ? "my-msg" : "friend-msg"
            if (message.contentType === "file") {
                return <FileMessage key={message._id} message={message} msgType={msgType} />
            }
            return <MessageItem key={message._id} message={message} msgType={msgType} />
        })
    }


    if (!chatConversation.currentChat || !chatConversation.isChat) {
        return (
            <div className={cx("welcome-box")}>
                <div className={cx("welcome-title")}>
                    Welcome to my app
                </div>
                <p className={cx("sub-title")}>Add friends to chat right now</p>
                <div className={cx("banner")}>
                    <img src={chatImg} alt="banner welcome" />
                </div>
            </div>
        )
    }

    return (
        <div className={cx('chat')}>
            <div className={cx("chat-box")}>
                <ChatHeader conversationInfo={conversationInfo} handleClickRightSide={handleClickRightSide} active={sidebarState} />

                <div ref={chatContentRef} className={cx("chat-content")}>
                    <div className={cx("loader")}>
                        <RotatingLines
                            strokeColor="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="40"
                            visible={showMessageLoader}
                        />
                    </div>
                    {genMessages()}
                    <div style={{ float: "left", clear: "both" }} ref={scrollRef}></div>
                </div>

                <ChatInput handleSendMsg={handleSendMsg} handleSendFile={handleSendFile} />

            </div>
            {/* <About /> */}
        </div>

    )
}


export default Chat