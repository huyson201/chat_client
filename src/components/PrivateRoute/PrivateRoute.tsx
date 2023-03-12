import authApis from '@apis/auth.api'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { fetchProfile } from '@redux/thunks/auth.thunk'
import axios, { AxiosError } from 'axios'
import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


interface PrivateRouteProps {
    children: JSX.Element | JSX.Element[]
}
const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const auth = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (auth.loginOauth) {
            dispatch(fetchProfile())
        }
    }, [auth.loginOauth])

    if (auth.loginOauth && !auth.profile) {
        return <div>Loading...</div>
    }

    if (!auth.isLoggedIn) {
        return <Navigate to={"/login"} replace />
    }

    return (
        <>
            {children}
        </>
    )
}

export default PrivateRoute