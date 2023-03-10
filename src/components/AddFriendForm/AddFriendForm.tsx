import React, { ChangeEvent, useState } from 'react'
import styles from './AddFriendForm.module.scss'
import bindClass from 'classnames/bind'
import { IoCloseOutline } from 'react-icons/io5'
import * as yup from "yup"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios'
import { AiFillCloseCircle } from 'react-icons/ai'
import { FindFriendData } from '../../types/RequestFriend'
import friendApis from '@apis/Friend.api'
import { useAppSelector } from '@hooks/redux'

export interface AddFriendFormProps {
    onClickClose: () => void
    onClickCancel: () => void,
    requestCloseModal: () => void
}

const cx = bindClass.bind(styles)

const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required')
});


const AddFriendForm = ({ onClickClose, onClickCancel, requestCloseModal }: AddFriendFormProps) => {
    const [foundUser, setFoundUser] = useState<FindFriendData>()
    const [isAddFriend, setIsAddFriend] = useState<boolean>(false)
    const [error, setError] = useState<string>()

    const [requestText, setRequestText] = useState<string>("")

    const { register, formState: { errors }, handleSubmit, reset } = useForm<{ email: string }>({
        resolver: yupResolver(validationSchema),
        reValidateMode: "onChange"
    })

    const auth = useAppSelector(state => state.auth.profile)

    const handleReset = () => {
        reset({
            email: ""
        })
        setFoundUser(undefined)
        setIsAddFriend(false)
        setRequestText("")
    }

    const handleSearch = handleSubmit(data => {
        friendApis.findUser(data.email)
            .then(res => {
                setFoundUser(res.data.data)
            })
            .catch(err => {
                if (axios.isAxiosError(err) && err.response?.status === 404) {
                    setError("Email has not been registered for an account")
                }
            })

    })

    const handleClickAddFriend = () => {
        setIsAddFriend(true)
        setRequestText("Hi, I'am " + `${auth?.first_name} ${auth?.last_name}`)
    }

    const handleOnchangeReqText = (event: ChangeEvent<HTMLTextAreaElement>) => {

        setRequestText(event.target.value)
    }

    const handleAddFriend = () => {
        if (!foundUser) return
        friendApis.createRequestFriend(foundUser._id, requestText)
        requestCloseModal()
    }
    const handleBack = () => {
        setIsAddFriend(false)
        setRequestText("")
    }
    return (
        <div className={cx("add-friend_form")}>
            <div className={cx("form-header")}>
                <div className={cx("title")}>Add friend</div>
                <button className={cx("times-btn")} onClick={onClickClose}>
                    <IoCloseOutline />
                </button>
            </div>
            <div className={cx("input-field")}>
                <input type="text" placeholder='Email' {...register("email")} />
                <button onClick={handleReset}><AiFillCloseCircle /></button>
            </div>
            <div className={cx("error-feedback", { show: error || errors.email })}>{errors.email?.message || error}</div>
            {
                foundUser && <>
                    <div className={cx("user-info")}>
                        <div className={cx("avatar")}>
                            <img src={foundUser.avatar_url} alt="" />
                        </div>
                        <div className={cx("name")}>
                            {`${foundUser.first_name} ${foundUser.last_name}`}
                        </div>
                        <div className={cx("email")}>
                            {foundUser.email}
                        </div>
                        {
                            !foundUser.isFriend && !isAddFriend && foundUser._id !== auth?._id && !foundUser.isRequested && <button className={cx("add-friend_btn")} onClick={handleClickAddFriend}>
                                Add friends
                            </button>
                        }
                        {
                            !foundUser.isFriend && !isAddFriend && foundUser._id !== auth?._id && foundUser.isRequested && <div className={cx("request-sent")}>
                                Friend request sent
                            </div>
                        }
                        {
                            foundUser.isFriend && !isAddFriend && foundUser._id !== auth?._id && <button className={cx("add-friend_btn")}>
                                Unfriend
                            </button>
                        }

                        {isAddFriend && <div className={cx("request-friend")}>
                            <div className={cx("request-text")}>
                                <textarea maxLength={150} defaultValue={requestText} onChange={handleOnchangeReqText} ></textarea>
                                <span className={cx("count-char")}>{requestText.length} / 150 ký tự</span>
                            </div>
                            <div className={cx("buttons", "request-btns")}>
                                <button className={cx("cancel", "btn")} onClick={handleBack}>Back</button>
                                <button className={cx("add-confirm", "btn")} onClick={handleAddFriend}>Add Friend</button>
                            </div>
                        </div>}

                    </div>
                </>
            }
            {
                !foundUser && <>
                    <div className={cx("buttons")}>
                        <button className={cx("cancel", "btn")} onClick={onClickCancel}>Cancel</button>
                        <button className={cx("search", "btn")} onClick={handleSearch}>Search</button>
                    </div>
                </>
            }
        </div>
    )
}

export default AddFriendForm