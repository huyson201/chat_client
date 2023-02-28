import authApis from '@apis/auth.api'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { setProfile } from '@redux/slices/Auth.slice'
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
                dispatch(setProfile(res.data.data))
            } catch (error: any) {
                navigate("/login", {
                    replace: true
                })
            }
        }

        if (auth.isLoggedIn === null) {
            fetch()
        }
    }, [])

    if (!auth.isLoggedIn === null && auth.isLoggedIn === false) {
        return <Navigate to={"/login"} replace />
    }

    if (auth.isLoggedIn === null) {
        return <div>
            loading...
        </div>
    }

    return (
        <>
            {children}
        </>
    )
}

export default PrivateRoute