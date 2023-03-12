import React from 'react'
import styles from './Register.module.scss'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form'

import bindClass from 'classnames/bind'
import Input from '@components/Input/Input'
import { FacebookButton, GoogleButton } from '@components/Button/Button'
import authApis from '@apis/auth.api';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { registerAccount } from '@redux/thunks/auth.thunk';
import { loginOauth } from '@redux/slices/Auth.slice';


const validationSchema = yup.object({
    first_name: yup.string().required("FirstName is required"),
    last_name: yup.string().required("LastName is required"),
    email: yup.string().email("Email invalid").required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required("confirm password is required"),
});

export interface RegisterFormType {
    first_name: string
    last_name: string
    email: string
    password: string
    confirmPassword: string
}

const cx = bindClass.bind(styles)
const RegisterForm = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const { handleSubmit, register, formState: { errors, isDirty, isValid } } = useForm<RegisterFormType>({
        resolver: yupResolver(validationSchema),
        reValidateMode: "onChange"
    });

    if (isLoggedIn) {
        return <Navigate to={"/"} replace />
    }

    const onSubmit = handleSubmit(async (data) => {
        dispatch(registerAccount(data)).then(() => {
            navigate("/", { replace: true })
        })

    })

    const loginGoogle = () => {
        dispatch(loginOauth())
        window.open("http://localhost:4000/api/auth/google", "_self")
    }


    return (
        <div className={cx("register-form")}>
            <div className={cx("page-title")}>
                Create your account
            </div>
            <div className={cx("form-body")}>
                <div className={cx("form-left")}>
                    <form action="#" onSubmit={onSubmit}>
                        <div className={cx("form-title")}>Sign up</div>
                        <div className={cx("input-row")}>
                            <Input {...register("first_name")} type='text' placeholder='First Name' />
                            <Input {...register("last_name")} type='text' placeholder='Last Name' />
                        </div>
                        <div className={cx("feedback", "error", { show: errors.first_name || errors.last_name })}>First Name and Last Name are required</div>

                        <Input {...register("email")} type='text' placeholder='Your Email' />
                        <div className={cx("feedback", "error", { show: errors.email })}>{errors.email?.message}</div>

                        <Input {...register("password")} type='password' placeholder='Password' />
                        <div className={cx("feedback", "error", { show: errors.password })}>{errors.password?.message}</div>

                        <Input {...register("confirmPassword")} type='password' placeholder='Confirm Password' />
                        <div className={cx("feedback", "error", { show: errors.confirmPassword })}>{errors.confirmPassword?.message}</div>

                        <button className={cx('login-btn', "form-btn")}>Sign Up</button>
                    </form>
                </div>
                <div className={cx("form-right")}>
                    <p className={cx("text")}>
                        If you already have an account? <a className={cx("login-link")} href="#">Login</a>.
                    </p>

                    <div className={cx('or-text')}>Or</div>

                    <GoogleButton onClick={loginGoogle} customText='Continue with google' />
                    <FacebookButton customText='Continue with facebook' />
                </div>
            </div>

        </div >
    )
}

export default RegisterForm