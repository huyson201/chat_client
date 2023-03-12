import React, { forwardRef, useMemo } from 'react'
import bindClass from 'classnames/bind'
import styles from './MessageItem.module.scss'
import Linkify from "linkify-react";


const cx = bindClass.bind(styles)
export interface MessageItemProps {
    msgType: "my-msg" | "friend-msg",
    message: MessageType
}
import LinkPreview from '../LinkPreview/LinkPreview'
import * as linkify from "linkifyjs";
import { MessageType } from '../../../types/Message';
import { BsClock } from 'react-icons/bs';
import { format } from 'timeago.js';



export const MessageItem = forwardRef<HTMLDivElement, MessageItemProps>(({ message, msgType = "my-msg" }, ref) => {
    const links = useMemo(() => {
        return linkify.find(message.content)
    }, [message])

    const renderLink = ({ attributes, content, ...args }: { attributes: any, content: any }) => {
        const { href, ...props } = attributes;
        return <a href={href} target='_blank' {...props}>{content}</a>;
    };

    return (
        <div ref={ref} className={cx("message", msgType)}>
            <div className={cx("message-box")}>
                {msgType === "friend-msg" && <div className={cx("sender")}>{`${message.sender.first_name} ${message.sender.last_name}`} </div>}
                {
                    links.length === 0 && <MessageItemContent content={message.content} date={message.createdAt} />
                }

                {
                    links.length === 1 && <LinkPreview msgType={msgType} url={links[0].href} message={message} />
                }

                {
                    links.length >= 2 && <MessageItemContent
                        content={<Linkify options={{ render: renderLink }}> {message.content} </Linkify>}
                        date={message.createdAt} />
                }


            </div>
        </div>
    )
})
export interface MessageItemContentProps {
    content: string | React.ReactNode,
    date: string | Date,
}

export const MessageItemContent = ({ content, date }: MessageItemContentProps) => {
    return (
        <div className={cx("box")}>
            <div className={cx("message-content")}>
                {content}
            </div>
            <div className={cx("message-times")}>
                <BsClock className={cx("clock")} />
                {format(date.toString())}
            </div>
        </div>
    )
}
export default MessageItem