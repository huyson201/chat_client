import React, { useEffect, useState } from 'react'
import styles from './LinkPreview.module.scss'
import bindClass from 'classnames/bind'
import Linkify from 'linkify-react';
import commonApi from '@apis/common';
import { LinkReviewData } from '../../../types/common';
import { MessageType } from '../../../types/Message';
import { format } from 'timeago.js';
import { BsClock } from 'react-icons/bs';

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

    if (loading) {
        return null
    }
    if (!data && !loading) {
        return <a href={url} target='_blank'>{message.content}</a>
    }
    if (data) {
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
                                {data.title}
                            </div>
                            <div className={cx("desc")}>
                                {data.description.length > 60 ? data.description.substring(0, 60) + '...' : data.description}
                            </div>
                        </div>
                    </a>
                </div>
                <div className={cx("message-times", msgType)}>
                    <BsClock className={cx("clock")} />
                    {format(message.createdAt.toString())}
                </div>
            </div>
        )
    }

    return (
        <a href={url} target='_blank'>{message.content}</a>
    )
}

export default LinkPreview