import React, { useEffect, useState } from 'react'
import styles from './LinkPreview.module.scss'
import bindClass from 'classnames/bind'
import Linkify from 'linkify-react';
import commonApi from '@apis/common';
import { LinkReviewData } from '../../../types/common';
import { MessageType } from '../../../types/Message';
import { format } from 'timeago.js';
import { BsClock } from 'react-icons/bs';
import { MessageItemContent } from '../MessageItem/MessageItem';

const cx = bindClass.bind(styles)

export interface LinkPreviewProps {
    url: string,
    message: MessageType,
    msgType: "my-msg" | "friend-msg",

}

const LinkPreview = ({ url, message, msgType }: LinkPreviewProps) => {
    const [data, setData] = useState<LinkReviewData>()
    const [loading, setLoading] = useState<boolean>()

    useEffect(() => {
        setLoading(true)
        commonApi.getLinkReview(url)
            .then(res => setData(res.data.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [url])


    if (!data || loading) {
        return (
            <MessageItemContent content={<Linkify options={{ target: "_blank" }}>{message.content}</Linkify>} date={message.createdAt} />
        )
    }

    return (
        <div className={cx("link-preview")}>
            <div className={cx("link")}>
                <Linkify options={{ target: "_blank" }}>{message.content}</Linkify>
            </div>
            <div className={cx("review-box")}>
                <a href={url} target='_blank'>
                    <div className={cx("content")}>
                        {
                            data.images.length > 0 && <div className={cx("img-box")}>
                                <img src={data.images[0]} alt="" />
                            </div>
                        }

                        <div className={cx("title")}>
                            {data.title && data.title}
                        </div>
                        <div className={cx("desc")}>
                            {data.description && data.description.length > 60 ? data.description.substring(0, 60) + '...' : data.description}
                        </div>
                    </div>
                    <div className={cx("message-times", msgType)}>
                        <BsClock className={cx("clock")} />
                        {format(message.createdAt.toString())}
                    </div>
                </a>
            </div>

        </div>
    )

}

export default LinkPreview