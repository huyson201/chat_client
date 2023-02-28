import React from 'react'
import styles from './Register.module.scss'

import bindClass from 'classnames/bind'
import Input from '@components/Input/Input'

import { FacebookButton, GoogleButton } from '@components/Button/Button'

const cx = bindClass.bind(styles)
const RegisterFom = () => {
    return (
        <div className={cx("register-form")}>
            <div className={cx("page-title")}>
                Create your account
            </div>
            <div className={cx("form-body")}>
                <div className={cx("form-left")}>
                    <form action="#">
                        <div className={cx("form-title")}>Sign up</div>
                        <div className={cx("input-row")}>
                            <Input type='text' placeholder='FirstName...' />
                            <Input type='text' placeholder='LastName...' />
                        </div>
                        <Input type='text' placeholder='Your email...' />
                        <Input type='password' placeholder='password' />
                        <button className={cx('login-btn', "form-btn")}>Sign Up</button>
                    </form>
                </div>
                <div className={cx("form-right")}>
                    <p className={cx("text")}>
                        If you already have an account? <a className={cx("login-link")} href="#">Login</a>.
                    </p>

                    <div className={cx('or-text')}>Or</div>

                    <GoogleButton />
                    <FacebookButton />
                </div>
            </div>

        </div >
    )
}

export default RegisterFom