import React, { useEffect, useMemo } from 'react'
import style from './Dialogues.module.scss'
import bindClass from 'classnames/bind'
import Search from '@components/icons/Search'
import avatar from "@assets/images/Userpic.jpg"
import conversationApi from '@apis/conversation.api'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { setConversation, setPendingConversation } from '@redux/slices/Conversation.slice'
import { Link } from 'react-router-dom'
import { ConversationType } from '../../types/conversation'
import { setCurrentChatAndChat } from '@redux/slices/Chat.slice'
const cx = bindClass.bind(style)

const Dialogues = () => {
    const disPatch = useAppDispatch()
    const conversations = useAppSelector(state => state.conversation)
    const auth = useAppSelector(state => state.auth.profile)

    useEffect(() => {
        disPatch(setPendingConversation(true))
        conversationApi.getConversations()
            .then(res => disPatch(setConversation(res.data.data)))
            .finally(() => disPatch(setPendingConversation(false)))
    }, [auth])

    const listConversation = useMemo(() => {
        if (!conversations.conversations) return null
        return conversations.conversations.map((conversation, index) => {
            if (!conversation.is_group) {
                return (
                    <DialoguesItem key={conversation._id} conversation={conversation} authId={auth?._id} onClick={() => disPatch(setCurrentChatAndChat(conversation))} />
                )
            }

            return null

        })
    }, [conversations])

    return (
        <div className={cx('dialogues')}>
            <div className={cx("header")}>
                <div className={cx("search")}>
                    <div className={cx("search-icon")}><Search /></div>
                    <input type="text" placeholder='Enter for search...' />
                </div>
            </div>

            <div className={cx("dialogues-list")}>
                {listConversation && listConversation}

                {/* <a href="#">
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
                </a> */}

            </div>
        </div>
    )
}

export interface DialoguesItemType {
    conversation: ConversationType
    authId?: string,
    onClick?: () => void
}

const DialoguesItem = ({ conversation, authId, onClick }: DialoguesItemType) => {

    const socket = useAppSelector(state => state.socket.socket)

    useEffect(() => {
        if (conversation.is_group && socket) {
            socket.emit("joinConversation", conversation)
        }

        return () => {
            if (conversation.is_group && socket) {
                socket.emit("leaveConversation", conversation)
            }
        }

    }, [socket])

    let friend = useMemo(() => {
        return conversation.members?.filter(fr => fr._id !== authId)
    }, [conversation])

    let isOnline: boolean = useMemo(() => {
        if (!friend || friend.length <= 0) return false
        return friend.some(fr => fr.online_status === 'online')
    }, [conversation])

    if (!friend || friend.length <= 0) return null

    return (
        <Link onClick={onClick} to="#">
            <div className={cx("dialogues-items")}>
                <div className={cx("items-info")}>
                    <div className={cx("avatar")}>
                        <img src={friend[0].avatar_url} alt="avatar" />
                        <div className={cx("dot-status", { online: isOnline }, "dot")}></div>
                    </div>
                    <div className={cx("name-box")}>
                        <div className={cx("name")}>{`${friend[0].first_name} ${friend[0].last_name}`}</div>
                        <div className={cx("online-status")}>{isOnline ? "Online" : "Offline"}</div>
                    </div>
                    <div className={cx("online-time")}>3h ago</div>
                </div>
                <div className={cx("message-box")}>
                    <div className={cx("message")}>{conversation.lastMessage?.content}</div>
                    {/* <div className={cx("count")}>2</div> */}
                </div>
            </div>
        </Link>
    )
}
export default Dialogues