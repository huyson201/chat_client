import React, { useEffect, useMemo } from 'react'
import style from './Dialogues.module.scss'
import bindClass from 'classnames/bind'
import conversationApi from '@apis/conversation.api'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { setConversation, setPendingConversation } from '@redux/slices/Conversation.slice'
import { Link } from 'react-router-dom'
import { ConversationType } from '../../types/conversation'
import { setCurrentChatAndChat } from '@redux/slices/Chat.slice'
import { BsSearch } from 'react-icons/bs'
import { AiOutlineUserAdd, AiOutlineUsergroupAdd } from 'react-icons/ai'
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
            return (
                <DialoguesItem key={conversation._id} conversation={conversation} authId={auth?._id} onClick={() => disPatch(setCurrentChatAndChat(conversation))} />
            )
        })
    }, [conversations])

    return (
        <div className={cx('dialogues')}>
            <div className={cx("header")}>
                <div className={cx("title")}>Chats</div>
                <div className={cx("header-actions")}>
                    <div className={cx("search")}>
                        <div className={cx("search-icon")}><BsSearch /></div>
                        <input type="text" placeholder='Enter for search...' />
                    </div>
                    <button className={cx("btn-add_friend", "btn")}>
                        <AiOutlineUserAdd />
                    </button>
                    <button className={cx("btn-add_group", "btn")}>
                        <AiOutlineUsergroupAdd />
                    </button>
                </div>
            </div>

            <div className={cx("dialogues-list")}>
                {listConversation && listConversation}
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
    const currentChatId = useAppSelector(state => state.chat.currentChat?._id)

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

    if (conversation.is_group) {
        return (
            <Link onClick={onClick} to="#">
                <div className={cx("dialogues-items", { active: currentChatId === conversation._id })}>
                    <div className={cx("dot-status", { online: isOnline }, "dot")}></div>

                    <div className={cx("items-info")}>
                        <div className={cx("avatar", "group-avatar", `member-${conversation.members.length}`)}>
                            {conversation.members.map((fr => (<img key={fr._id} src={fr.avatar_url} alt="avatar" />)))}
                            {
                                conversation.members.length > 3 && <div className={cx("more-avatar")}>{conversation.members.length - 3}</div>
                            }
                        </div>
                        <div className={cx("name-box")}>
                            <div className={cx("name")}>{`${conversation.name}`}</div>
                            <div className={cx("message")}>{conversation.lastMessage?.content}</div>
                        </div>
                    </div>

                </div>
            </Link>
        )
    }

    return (
        <Link onClick={onClick} to="#">
            <div className={cx("dialogues-items", { active: currentChatId === conversation._id })}>
                <div className={cx("dot-status", { online: isOnline }, "dot")}></div>

                <div className={cx("items-info")}>
                    <div className={cx("avatar")}>
                        <img src={friend[0].avatar_url} alt="avatar" />
                    </div>
                    <div className={cx("name-box")}>
                        <div className={cx("name")}>
                            {`${friend[0].first_name} ${friend[0].last_name}`}
                        </div>
                        <div className={cx("message")}>{conversation.lastMessage?.content}</div>
                    </div>

                </div>
            </div>
        </Link>
    )
}
export default Dialogues