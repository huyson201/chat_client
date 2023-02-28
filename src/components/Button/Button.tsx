import React, { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss'
import bindClass from 'classnames/bind'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebookF } from 'react-icons/fa'

const cx = bindClass.bind(styles)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}
export const GoogleButton = ({ className, ...props }: ButtonProps) => {
    return (
        <button {...props} className={cx("google-login__btn", "form-btn", className)}>
            <span className={cx("icons")}><FcGoogle /></span> Sign In with Google
        </button>
    )
}

export const FacebookButton = ({ className, ...props }: ButtonProps) => {
    return (
        <button {...props} className={cx("facebook-login__btn", "form-btn")}>
            <span className={cx("icons")}><FaFacebookF /></span>
            Sign In with Facebook
        </button>
    )
}

