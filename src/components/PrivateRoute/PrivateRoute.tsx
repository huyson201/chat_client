import authApis from '@apis/auth.api'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { loginFail, loginSuccess } from '@redux/slices/Auth.slice'
import axios, { AxiosError } from 'axios'
import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


interface PrivateRouteProps {
    children: JSX.Element | JSX.Element[]
}
const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const auth = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const fetch = async () => {
            try {
                let res = await authApis.getProfile()
                dispatch(loginSuccess(res.data.data))
            } catch (error: any) {
                dispatch(loginFail())
                navigate("/login", {
                    replace: true
                })
            }
        }

        if (auth.isPending) {
            fetch()
        }

    }, [])

    if (auth.isPending) {
        return <div>
            loading...
        </div>
    }

    if (!auth.isPending && !auth.isLoggedIn) {
        return <Navigate to={"/login"} replace />
    }

    return (
        <>
            {children}
        </>
    )
}

export default PrivateRoute