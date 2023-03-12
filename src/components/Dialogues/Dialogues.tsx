import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import style from './Dialogues.module.scss'
import bindClass from 'classnames/bind'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { Link } from 'react-router-dom'
import { ConversationType } from '../../types/conversation'
import { setCurrentChatAndChat } from '@redux/slices/Chat.slice'
import { BsSearch } from 'react-icons/bs'
import { AiOutlineUserAdd, AiOutlineUsergroupAdd } from 'react-icons/ai'
import { fetchConversations } from '@redux/thunks/conversation.thunk'
const cx = bindClass.bind(style)

export interface DialoguesProps {
    onClickAddFriend: () => void
}

const Dialogues = ({ onClickAddFriend }: DialoguesProps) => {
    const disPatch = useAppDispatch()
    const conversations = useAppSelector(state => state.conversation)
    const auth = useAppSelector(state => state.auth.profile)
    const [searchConversations, setSearchConversations] = useState<ConversationType[]>()

    useEffect(() => {
        disPatch(fetchConversations())
    }, [auth])


    const listConversation = useMemo(() => {
        if (!conversations.conversations) return null

        return conversations.conversations.map((conversation, index) => {
            return (
                <DialoguesItem key={conversation._id} conversation={conversation} authId={auth?._id} onClick={() => disPatch(setCurrentChatAndChat(conversation))} />
            )
        })
    }, [conversations])

    const genSearchConversations = useMemo(() => {
        if (!searchConversations) return null
        return searchConversations.map((conversation, index) => {
            return (
                <DialoguesItem key={conversation._id} conversation={conversation} authId={auth?._id} onClick={() => disPatch(setCurrentChatAndChat(conversation))} />
            )
        })
    }, [searchConversations])


    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        let searchKey = event.target.value
        if (!conversations.conversations) return null

        let searchList = conversations.conversations.filter(conversation => {
            if (conversation.is_group) {
                return conversation.name?.toLocaleLowerCase().includes(searchKey.toLowerCase())
            }

            let currentMember = conversation.members.find(member => member._id !== auth?._id)
            return `${currentMember?.first_name} ${currentMember?.last_name}`.toLowerCase().includes(searchKey.toLowerCase())

        })

        setSearchConversations([...searchList])
    }



    return (
        <div className={cx('dialogues')}>
            <div className={cx("header")}>
                <div className={cx("title")}>Chats</div>
                <div className={cx("header-actions")}>
                    <div className={cx("search")}>
                        <div className={cx("search-icon")}><BsSearch /></div>
                        <input type="text" placeholder='Enter for search...' onChange={handleSearch} />
                    </div>
                    <button className={cx("btn-add_friend", "btn")} onClick={onClickAddFriend}>
                        <AiOutlineUserAdd />
                    </button>
                    <button className={cx("btn-add_group", "btn")}>
                        <AiOutlineUsergroupAdd />
                    </button>
                </div>
            </div>

            <div className={cx("dialogues-list")}>
                {genSearchConversations ? genSearchConversations : listConversation}
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

    }, [conversation, authId])

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
                            <div className={cx("message")}>{conversation.lastMessage?.content || 'Not available message'}</div>
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
                        <div className={cx("message")}>{conversation.lastMessage?.content || 'Not available message'}</div>
                    </div>

                </div>
            </div>
        </Link>
    )
}
export default Dialogues