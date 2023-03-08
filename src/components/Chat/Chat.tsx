import React, { useState, MouseEvent, forwardRef, useEffect, useRef, KeyboardEvent, useCallback, useMemo } from 'react'
import styles from './Chat.module.scss'
import bindClass from 'classnames/bind'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { ImAttachment } from 'react-icons/im'
import { MdEmojiEmotions } from 'react-icons/md'
import { IoIosPaperPlane } from 'react-icons/io'
import { BsClock, BsFillMicFill, BsLayoutSidebarInsetReverse } from 'react-icons/bs'
import { HiPhone, HiVideoCamera } from 'react-icons/hi'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { MessageType } from '../../types/Message'
import conversationApi from '@apis/conversation.api'
import Linkify from "linkify-react";
import { loadMessages, setMessages } from '@redux/slices/Message.slice'
import { format } from "timeago.js"
import { User } from '../../types/conversation'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { RotatingLines } from 'react-loader-spinner'

const cx = bindClass.bind(styles)

interface ChatProps {
    clickRightSide?: (clickState: boolean) => void
}

interface ConversationInfo {
    name?: string,
    isOnline?: boolean,
    avatar?: string | string[],
    is_group: boolean
}
const Chat = ({ clickRightSide }: ChatProps) => {

    const dispatch = useAppDispatch()
    const messages = useAppSelector(state => state.messages)


    const chatContentRef = useRef<HTMLDivElement>(null)
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

    const [canFetchNextPage, setCanFetchNextPage] = useState<boolean>(false)


    const firstMessageRef = useCallback((node: HTMLDivElement) => {
        if (!node || !chatContentRef.current) return
        console.log(node.offsetTop - chatContentRef.current.scrollTop)
        // console.log(node.offsetTop - chatContentRef.current.offsetTop;)
    }, [messages])



    useEffect(() => {

        if (chatConversation.currentChat) {
            setShowMessageLoader(true)
            conversationApi.getMessages(chatConversation.currentChat._id, 1)
                .then(res => {
                    return dispatch(setMessages({
                        conversationId: chatConversation.currentChat?._id,
                        messages: res.data.data.docs,
                        totalPage: res.data.data.totalPages,
                        nextPage: res.data.data.nextPage
                    }))
                })
                .catch(err => console.log(err)).finally(() => {
                    setShowMessageLoader(false)
                })
        }
    }, [chatConversation.currentChat])


    useEffect(() => {
        setCanFetchNextPage(false)
    }, [chatConversation.currentChat])

    // get conversation info
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

    useEffect(() => {
        // console.log(firstMessageRef.current)
        if (!chatContentRef.current || !messages.messages || canFetchNextPage) return
        const { scrollHeight, clientHeight } = chatContentRef.current
        chatContentRef.current.scrollTop = scrollHeight - clientHeight
        setCanFetchNextPage(true)
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



    //* set nextPage if scrollTop = 0
    //* load message after scroll to top
    const handleScroll = (e: any) => {
        if (!chatConversation.currentChat || !messages.nextPage) return
        if (e.currentTarget?.scrollTop === 0 && canFetchNextPage && messages.nextPage) {
            setShowMessageLoader(true)
            conversationApi.getMessages(chatConversation.currentChat._id, messages.nextPage)
                .then(res => {
                    dispatch(loadMessages({
                        conversationId: chatConversation.currentChat?._id,
                        messages: res.data.data.docs,
                        totalPage: res.data.data.totalPages,
                        nextPage: res.data.data.nextPage
                    }))
                })
                .catch(err => console.log(err)).finally(() => setShowMessageLoader(false))
        }
    }

    // handle send message
    const handleSendMsg = (message: string) => {
        if (socket) {
            socket.emit("sendMessage", {
                conversation: chatConversation.currentChat,
                sender: auth,
                message: message,
                to: receivers
            })
        }
        // setTypingMessage("")
    }


    //* generate list message
    const genMessages = () => {
        if (messages.conversationId !== chatConversation.currentChat?._id) return
        return messages.messages?.map((message, index) => {
            let senderId = message.sender._id || message.sender
            let msgType: "my-msg" | "friend-msg" = senderId === auth?._id ? "my-msg" : "friend-msg"
            if (index === 0) {
                return <MessageItem ref={firstMessageRef} key={message._id} message={message} msgType={msgType} />
            }
            return <MessageItem key={message._id} message={message} msgType={msgType} />
        })
    }




    return (
        <div className={cx("chat-box")}>
            <ChatHeader conversationInfo={conversationInfo} handleClickRightSide={handleClickRightSide} active={sidebarState} />

            <div ref={chatContentRef} className={cx("chat-content")} onScroll={handleScroll}>
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
                {/* <div style={{ float: "left", clear: "both" }} ref={scrollRef}></div> */}
            </div>

            <ChatInput />

        </div>
    )
}


/**
 ** Message Item components
 */
export interface MessageItemProps {
    msgType: "my-msg" | "friend-msg",
    message: MessageType
}
import LinkPreview from './LinkPreview/LinkPreview'
// import ReactTinyLink from 'react-tiny-link';  
import * as linkify from "linkifyjs";


export const MessageItem = forwardRef<HTMLDivElement, MessageItemProps>(({ message, msgType = "my-msg" }, ref) => {
    const links = useMemo(() => {
        return linkify.find(message.content)
    }, [message])


    return (
        <div ref={ref} className={cx("message", msgType)}>
            <div className={cx("message-box")}>
                {msgType === "friend-msg" && <div className={cx("sender")}>{`${message.sender.first_name} ${message.sender.last_name}`} </div>}
                {
                    links.length === 0 && <div className={cx("box")}>
                        <div className={cx("message-content")}>
                            {message.content}
                        </div>
                        <div className={cx("message-times")}>
                            <BsClock className={cx("clock")} />
                            {format(message.createdAt.toString())}
                        </div>
                    </div>
                }

                {
                    links.length === 1 && <LinkPreview msgType={msgType} url={links[0].href} message={message} />
                }

                {
                    links.length >= 2 && <div className={cx("box")}>
                        <div className={cx("message-content")}>
                            <Linkify>
                                {message.content}
                            </Linkify>
                        </div>
                        <div className={cx("message-times")}>
                            <BsClock className={cx("clock")} />
                            {format(message.createdAt.toString())}
                        </div>
                    </div>
                }


            </div>
        </div>
    )
})




/**
 ** Chat Header Component
 */
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
                <button className={cx("call")}><HiPhone /></button>
                <button className={cx("video-call")}><HiVideoCamera /></button>
                <button className={cx("sidebar-right", { active })} onClick={handleClickRightSide}><BsLayoutSidebarInsetReverse /></button>
            </div>
        </div>
    )
}


/**
 ** ChatInput components
 */
export interface ChatInputProps {
    handleSendMsg?: (message: string) => void
}

const ChatInput = ({ handleSendMsg }: ChatInputProps) => {
    const emojiPickerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLDivElement>(null)
    const inputFileRef = useRef<HTMLInputElement>(null)
    const [showEmoji, setShowEmoji] = useState<boolean>(false)
    const [typingMessage, setTypingMessage] = useState<string>("")

    const handleClickEmoji = (e: MouseEvent) => {
        e.stopPropagation()

        setShowEmoji(prev => !prev)
    }

    //handle type message
    const handleChange = (event: ContentEditableEvent) => {
        const newValue = event.target.value;

        if (event.currentTarget.scrollHeight >= 140) {
            event.currentTarget.style.overflowY = 'scroll'
        }
        else {
            event.currentTarget.style.overflowY = 'visible'
        }

        if (!newValue || newValue === '') {
            event.currentTarget.setAttribute("data-placeholder", 'Aa')
        }
        else {
            event.currentTarget.setAttribute("data-placeholder", '')
        }
        setTypingMessage(newValue);
        if (handleSendMsg) {
            handleSendMsg(newValue);
        }
    };

    //  hide emoji picker if click outsidez
    const handleClickOutSideEmoji = () => {
        setShowEmoji(false)
    }


    const handleSelectEmoji = (data: any) => {
        setTypingMessage(prev => prev + data.native)
        inputRef.current?.setAttribute("data-placeholder", '')
    }


    return (
        <div className={cx("send-message")} >
            <div className={cx("files")}>
                <input type="file" name='file' hidden ref={inputFileRef} accept='.doc,.docx,.txt,.zip,.pdf,.rar' />
                <button className={cx('btn-action', 'btn-attack-file')} onClick={() => inputFileRef.current?.click()}>
                    <ImAttachment />
                </button>
            </div>
            <div className={cx("editable-box")}>
                <ContentEditable
                    onChange={handleChange}
                    disabled={false}
                    html={typingMessage}
                    tagName='div'
                    className={cx("input-field")}
                    data-placeholder='Aa'
                    innerRef={inputRef}


                />
            </div>
            <div className={cx("buttons")}>
                <div className={cx("emoji-box")}>
                    <div ref={emojiPickerRef} className={cx("emoji-picker", { "show": showEmoji })}>
                        <Picker
                            onClickOutside={handleClickOutSideEmoji}
                            navPosition={"bottom"}
                            locale="us"
                            perLine={11}
                            maxFrequentRows={1}
                            previewPosition={"none"}
                            data={data}
                            onEmojiSelect={handleSelectEmoji}
                            showPreview={false}
                            showSkinTones={false}
                            theme={"auto"}
                        />
                    </div>
                    <button className={cx('btn-action', 'btn-emoji', { show: showEmoji })} onClick={handleClickEmoji}>
                        <MdEmojiEmotions />
                    </button>
                </div>

                {/* <button className={cx('btn-action', 'btn-mic')}><BsFillMicFill /></button> */}
                <button onClick={() => handleSendMsg && handleSendMsg(typingMessage)} className={cx('btn-action', 'btn-send')}>Send <IoIosPaperPlane className={cx("send-icon")} /></button>
            </div>
        </div>
    )
}
export default Chat