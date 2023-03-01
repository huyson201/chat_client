import React, { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss'
import bindClass from 'classnames/bind'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebookF } from 'react-icons/fa'

const cx = bindClass.bind(styles)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    customText?: string
}
export const GoogleButton = ({ className, customText, ...props }: ButtonProps) => {
    return (
        <button {...props} className={cx("google-login__btn", "form-btn", className)}>
            <span className={cx("icons")}><FcGoogle /></span> {customText || "Sign In with Google"}
        </button>
    )
}

export const FacebookButton = ({ className, customText, ...props }: ButtonProps) => {
    return (
        <button {...props} className={cx("facebook-login__btn", "form-btn")}>
            <span className={cx("icons")}><FaFacebookF /></span>
            {customText || " Sign In with Facebook"}
        </button>
    )
}

