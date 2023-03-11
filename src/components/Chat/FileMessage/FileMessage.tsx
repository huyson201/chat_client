import React, { useMemo } from 'react'
import styles from './FileMessage.module.scss'
import bindClass from 'classnames/bind'
import { BsClock } from 'react-icons/bs'
import ZipIcon from '@assets/icons/zip.svg'
import DocIcon from '@assets/icons/doc-file.svg'
import PdfIcon from '@assets/icons/pdf-file.svg'
import ExcelIcon from '@assets/icons/microsoft-excel.svg'
import TxtIcon from '@assets/icons/txt.svg'
import PPIcon from '@assets/icons/microsoft-powerpoint.svg'
import { MessageType } from '../../../types/Message'
import { format } from 'timeago.js'

const cx = bindClass.bind(styles)

const Icon: { [key: string]: string } = {
    "doc": DocIcon,
    "docx": DocIcon,
    "zip": ZipIcon,
    "rar": ZipIcon,
    "pdf": PdfIcon,
    "xlsx": ExcelIcon,
    "txt": TxtIcon,
    "pptx": PPIcon,
    "ppsx": PPIcon
}

export interface FileMessageProps {
    message: MessageType,
    msgType: "my-msg" | "friend-msg"
}
const FileMessage = ({ message, msgType }: FileMessageProps) => {
    const fileFormat = useMemo(() => {
        return message.content.split(".")[1]
    }, [message])

    return (
        <div className={cx("message", msgType)}>
            <div className={cx("message-box")}>
                <a href={message.fileUrl} className={cx("download")} target='_blank' download>
                    <div className={cx("box")}>
                        <div className={cx("message-content")}>
                            <div className={cx("icon")}>
                                <img src={Icon[fileFormat]} alt="icon" />
                            </div>
                            <div className={cx("file-name")}>{message.content}</div>
                        </div>
                        <div className={cx("message-times")}>
                            <BsClock className={cx("clock")} />
                            {format(message.createdAt.toString())}
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default FileMessage