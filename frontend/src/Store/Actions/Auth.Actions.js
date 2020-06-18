import axios from 'axios'

import {
    CREATE_SUPER_USER_SUCCESS,
    DARKMODE_CONFIG,
    AUTH_LOADING,
    AUTH_LOADED,
    LOGIN_SUCCESS,
    USER_LOADED,
    USER_EXPIRED,
    LOGOUT_SUCCESS,
} from '../Actions/Type.Actions'

import {
    Create_Error_Messages,
} from './Messages.Actions'

export const defaultheader = () => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return config
}

export const tokenConfig = (getState) => {
    // GET TOKEN FROM STATE
    const token = getState().Auth.token

    // HEADERS
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // if token, add header
    if (token) {
        // console.log('token', token)
        config.headers['x-auth-token'] = token
    }

    return config
}
export const tokenConfigmultipleform = (getState) => {
    const token = getState().Auth.token
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
            // 'Content-Type':'multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL'
        }
    }
    if (token) {
        config.headers['x-auth-token'] = `${token}`
    }
    return config
}

export const Config_DarkMode = (isDarkMode) => (dispatch) => {
    dispatch({
        type: DARKMODE_CONFIG,
        payload: !isDarkMode,
    })
}

export const First_Time_Use = (UserData, TokoData) => (dispatch, getState) => {
    dispatch({ type: AUTH_LOADING })
    // const body = JSON.stringify({ UserName, Name, Password, coupon })
    const bodydata = new FormData()

    bodydata.append("UserName", UserData.UserName)
    bodydata.append("Name", UserData.Name)
    bodydata.append("Password", UserData.Password)
    bodydata.append("coupon", UserData.cupon)
    if (UserData.Profilepicture !== null) {
        bodydata.append("ProfilePicture", UserData.Profilepicture)
    }
    axios.post('http://127.0.0.1:5000/api/users/firsttimeuse/register/superuser', bodydata)
        .then(res => {
            // console.log(res.data)
            dispatch({
                type: CREATE_SUPER_USER_SUCCESS,
                payload: res.data
            })
            dispatch({ type: AUTH_LOADED })
            dispatch({ type: AUTH_LOADING })
            const bodydatatoko = new FormData()

            bodydatatoko.append("NamaToko", TokoData.NamaToko)
            bodydatatoko.append("Alamat", TokoData.Alamat)
            bodydatatoko.append("Kontak", TokoData.Kontak ? TokoData.Kontak : null)
            if (TokoData.Logo !== null) {
                bodydatatoko.append("Logo", TokoData.Logo)
            }
            axios.post('http://127.0.0.1:5000/api/toko/firsttimeuse/tokoconfig', bodydatatoko, tokenConfigmultipleform(getState))
                .then(res => {
                    // console.log(res)
                    dispatch({ type: AUTH_LOADED })
                }).catch(err => {
                    console.log(err)
                    dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
                    dispatch({ type: AUTH_LOADED })
                })
        }).catch(err => {
            console.log(err.response)
            dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
            dispatch({ type: AUTH_LOADED })
        })
    // dispatch({ type: AUTH_LOADED })
}

export const LogIn = (UserName, Password) => (dispatch) => {
    dispatch({ type: AUTH_LOADING })
    const body = JSON.stringify({ UserName, Password })
    axios.post('http://127.0.0.1:5000/api/auth/login', body, defaultheader())
        .then(res => {
            // console.log(res.data)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            // dispatch({ type: AUTH_LOADED })
        }).catch(err => {
            console.log(err.response)
            dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
            // dispatch({ type: AUTH_LOADED })
        })
    dispatch({ type: AUTH_LOADED })
}

export const Load_User = () => (dispatch, getState) => {
    dispatch({ type: AUTH_LOADING })
    axios.get('http://127.0.0.1:5000/api/auth/user', tokenConfig(getState))
        .then(res => {
            // console.log(res.data)
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
            dispatch({ type: AUTH_LOADED })
        }).catch(err => {
            console.log(err.response)
            if (err.response.status === 400) {
                dispatch({ type: USER_EXPIRED })
            }
            dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
            dispatch({ type: AUTH_LOADED })
        })
    // dispatch({ type: AUTH_LOADED })
}

export const LogOut = () => (dispatch) => {
    dispatch({
        type: LOGOUT_SUCCESS,
    })
}