import React, { useEffect } from 'react'
import styles from './LoginForm.module.scss'
import classBind from 'classnames/bind'
import Input from '@components/Input/Input'
import { FacebookButton, GoogleButton } from '@components/Button/Button'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form'
import authApis from '@apis/auth.api'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { login, loginFail, loginSuccess } from '@redux/slices/Auth.slice'
import { Link, Navigate, useNavigate } from 'react-router-dom'
const cx = classBind.bind(styles)


const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

interface FormType {
    email: string,
    password: string
}

const LoginForm = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const { handleSubmit, register, formState: { errors, isDirty, isValid, isValidating } } = useForm<FormType>({
        resolver: yupResolver(validationSchema),
        reValidateMode: "onChange"
    });


    const onSubmit = handleSubmit(async (data) => {
        dispatch(login())
        try {
            let res = await authApis.login(data.email, data.password)
            dispatch(loginSuccess(res.data.data))
            navigate("/", { replace: true })
        } catch (error) {
            dispatch(loginFail())
        }
    })

    const loginGoogle = () => {
        dispatch(login())
        window.open("http://localhost:4000/api/auth/google", "_self")
    }

    if (isLoggedIn) {
        return <Navigate to={"/"} replace />
    }

    return (
        <div className={cx("login-form")}>
            <div className={cx("page-title")}>
                Welcome back
            </div>
            <div className={cx("form-body")}>
                <div className={cx("form-left")}>
                    <form action="#" onSubmit={onSubmit}>
                        <div className={cx("form-title")}>Login</div>
                        <Input {...register("email")} type='text' placeholder='Your email...' />
                        <div className={cx("feedback", "error", { show: errors.email && true })}>{errors.email && errors.email.message}</div>

                        <Input {...register("password")} type='password' placeholder='Password' />
                        <div className={cx("feedback", "error", { show: errors.password && true })}>{errors.password && errors.password.message}</div>

                        <button type='submit' className={cx('login-btn', "form-btn")}>Log in</button>
                    </form>
                </div>

                <div className={cx("form-right")}>
                    <p className={cx("text")}>
                        If you don’t already have an account  <Link to={"/sign-up"} className={cx("sign-up__link")}>click here</Link> to create your account.
                    </p>

                    <div className={cx('or-text')}>Or</div>
                    <GoogleButton onClick={loginGoogle} />
                    <FacebookButton />
                </div>
            </div>
            <div className={cx("forget-password")}>
                So you can’t get in to your account? Did you <Link to={"#"}>forget your password?</Link>
            </div>
        </div >
    )
}

export default LoginForm