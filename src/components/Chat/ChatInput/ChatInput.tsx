import React, { ChangeEvent, KeyboardEvent, MouseEvent, useRef, useState } from "react"
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import bindClass from 'classnames/bind'
import styles from './ChatInput.module.scss'
import { ImAttachment } from "react-icons/im"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { MdEmojiEmotions } from "react-icons/md"
import { IoIosPaperPlane } from "react-icons/io"
import commonApi from "@apis/common"
import { FileUploadResponse } from "../../../types/common"

const cx = bindClass.bind(styles)

export interface ChatInputProps {
    handleSendMsg?: (message: string) => void,
    handleSendFile?: (fileInfo: FileUploadResponse) => void
}


const ChatInput = ({ handleSendMsg, handleSendFile }: ChatInputProps) => {
    const emojiPickerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLDivElement>(null)
    const sendBtnRef = useRef<HTMLButtonElement>(null)
    const inputFileRef = useRef<HTMLInputElement>(null)
    const [showEmoji, setShowEmoji] = useState<boolean>(false)
    const [typingMessage, setTypingMessage] = useState<string>("")


    const handleOnKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            sendBtnRef.current?.click()
        }
    }

    const handleOnchange = (event: ContentEditableEvent) => {
        let value = event.target.value
        setTypingMessage(value);

        if (!inputRef.current) return

        if (value === "") {
            inputRef.current.classList.remove(cx("empty"))
        }
        else {
            inputRef.current.classList.add(cx("empty"))
        }

    }

    const handleOnchangeFile = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) return
        let formData = new FormData()
        formData.append("file", event.target.files[0])
        commonApi.uploadFile(formData).then(res => {
            if (handleSendFile) {
                handleSendFile(res.data.data)
            }
        }).catch(err => console.log(err))
    }

    const handleClickEmoji = (e: MouseEvent) => {
        e.stopPropagation()

        setShowEmoji(prev => !prev)
    }

    //  hide emoji picker if click outside
    const handleClickOutSideEmoji = () => {
        setShowEmoji(false)
    }


    const handleSelectEmoji = (data: any) => {
        setTypingMessage(prev => prev + data.native)
        inputRef.current?.setAttribute("data-placeholder", '')
    }

    const handleClickSend = () => {
        if (typingMessage.trim() === '') return

        if (handleSendMsg) {
            handleSendMsg(typingMessage)
        }
        setTypingMessage("")
    }

    return (
        <div className={cx("send-message")} >
            <div className={cx("files")}>
                <input type="file" name='file' hidden ref={inputFileRef} accept='.doc,.docx,.txt,.zip,.pdf,.rar,.xlsx,.pptx,.txt' onChange={handleOnchangeFile} />
                <button className={cx('btn-action', 'btn-attack-file')} onClick={() => inputFileRef.current?.click()}>
                    <ImAttachment />
                </button>
            </div>
            <div className={cx("editable-box")}>
                <ContentEditable
                    onChange={handleOnchange}
                    disabled={false}
                    html={typingMessage}
                    className={cx("input-field")}
                    data-placeholder='Aa'
                    onKeyDown={handleOnKeyDown}
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
                <button onClick={handleClickSend} ref={sendBtnRef} className={cx('btn-action', 'btn-send')}>Send <IoIosPaperPlane className={cx("send-icon")} /></button>
            </div>
        </div>
    )
}

export default ChatInput