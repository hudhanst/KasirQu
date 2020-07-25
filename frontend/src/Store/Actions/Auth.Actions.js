import axios from 'axios'

import {
    CREATE_SUPER_USER_SUCCESS,
    DARKMODE_CONFIG,
    AUTH_LOADING,
    AUTH_LOADED,
    SET_NEW_IP,
    LOGIN_SUCCESS,
    USER_LOADED,
    USER_EXPIRED,
    LOGOUT_SUCCESS,
} from '../Actions/Type.Actions'

import {
    Create_Error_Messages,
} from './Messages.Actions'

export const Get_IpAddres = () => {
    try {
        const IpAddres = localStorage.getItem('KasirQU_Server_IpAddres')
        const ServerPort = '5000'
        if (IpAddres) {
            return `http://${IpAddres}:${ServerPort}`
        } else {
            const LocalIp = '127.0.0.1'
            return `http://${LocalIp}:${ServerPort}`
        }
    } catch (err) {
        console.log(err)
    }
}

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

export const First_Time_Use = (UserData, TokoData) => async (dispatch, getState) => {
    // console.log('Log: First_Time_Use -> UserData', UserData)
    // console.log('Log: First_Time_Use -> TokoData', TokoData)
    dispatch({ type: AUTH_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: First_Time_Use -> IpAddres', IpAddres)

        const bodydata = new FormData()

        bodydata.append("UserName", UserData.UserName)
        bodydata.append("Name", UserData.Name)
        bodydata.append("Password", UserData.Password)
        bodydata.append("coupon", UserData.cupon)
        if (UserData.Profilepicture !== null) {
            bodydata.append("ProfilePicture", UserData.Profilepicture)
        }
        const Responses = await axios.post(`${IpAddres}/api/users/firsttimeuse/register/superuser`, bodydata)
        // console.log('Log: First_Time_Use -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: CREATE_SUPER_USER_SUCCESS,
                payload: Responses.data
            })
        }

        const bodydatatoko = new FormData()

        bodydatatoko.append("NamaToko", TokoData.NamaToko)
        bodydatatoko.append("Alamat", TokoData.Alamat)
        bodydatatoko.append("Kontak", TokoData.Kontak ? TokoData.Kontak : null)
        if (TokoData.Logo !== null) {
            bodydatatoko.append("Logo", TokoData.Logo)
        }
        const Responses_Responses = await axios.post(`${IpAddres}/api/toko/firsttimeuse/tokoconfig`, bodydatatoko, tokenConfigmultipleform(getState))
        // console.log('Log: First_Time_Use -> Responses_Responses', Responses_Responses)

        if (Responses && Responses_Responses) {
            dispatch({ type: AUTH_LOADED })
        }
    } catch (err) {
        console.log('Log: First_Time_Use -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: AUTH_LOADED })
    }
    // dispatch({ type: AUTH_LOADED })
}

export const LogIn = (UserName, Password, NewIp) => async (dispatch) => {
    // console.log('Log: LogIn -> UserName', UserName)
    // console.log('Log: LogIn -> Password', Password)
    // console.log('Log: LogIn -> NewIp', NewIp)
    dispatch({ type: AUTH_LOADING })
    if (NewIp) {
        dispatch({
            type: SET_NEW_IP,
            payload: NewIp
        })
    }
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: LogIn -> IpAddres', IpAddres)

        const body = JSON.stringify({ UserName, Password })
        const Responses = await axios.post(`${IpAddres}/api/auth/login`, body, defaultheader())
        // console.log('Log: LogIn -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: Responses.data
            })
        }
    } catch (err) {
        console.log('Log: LogIn -> err', err)
        if (err.message === 'Network Error') {
            dispatch(Create_Error_Messages(null, 'ada kesalahan pada jaringan yang anda coba akses, silakan isi ip adress yang benar jika di client'))
        } else {
            dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
        }
    }
    dispatch({ type: AUTH_LOADED })
}

export const Load_User = () => async (dispatch, getState) => {
    dispatch({ type: AUTH_LOADING })
    try {
        const IpAddres = await Get_IpAddres()
        // console.log('Log: Load_User -> IpAddres', IpAddres)

        const Responses = await axios.get(`${IpAddres}/api/auth/user`, tokenConfig(getState))
        // console.log('Log: Load_User -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: USER_LOADED,
                payload: Responses.data ? Responses.data : null
            })
            dispatch({ type: AUTH_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_User -> err', err)
        try {
            if (err.message === 'Network Error') {
                dispatch(Create_Error_Messages(null, 'gagal mendapatkan userdetail, anda tidak terhubung dengan server'))
                dispatch({ type: AUTH_LOADED })
            } else if (err.response.status === 400) {
                dispatch({ type: USER_EXPIRED })
                dispatch({ type: AUTH_LOADED })
            } else {
                dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
                dispatch({ type: AUTH_LOADED })
            }
        } catch (err_err) {
            console.log(err_err.response)
            dispatch({ type: AUTH_LOADED })
        }
    }
}

export const LogOut = () => (dispatch) => {
    dispatch({
        type: LOGOUT_SUCCESS,
    })
}