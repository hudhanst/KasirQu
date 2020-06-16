import axios from 'axios'

import {
    CREATE_SUPER_USER_SUCCESS,
    DARKMODE_CONFIG,
    AUTH_LOADING,
    AUTH_LOADED,
    LOGIN_SUCCESS,
    USER_LOADED,
    USER_EXPIRED,
    GET_ACCOUNTID_FOR_DETAIL,
    GET_ACCOUNT_DETAIL,
    GET_ACCOUNTID_FOR_UPDATE,
    GET_LIST_ACCOUNT,
    ACCOUNT_DELETE,
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

export const First_Time_Register = (UserName, Name, Password, coupon, Profilepicture) => (dispatch) => {
    dispatch({ type: AUTH_LOADING })
    // const body = JSON.stringify({ UserName, Name, Password, coupon })
    const bodydata = new FormData()

    bodydata.append("UserName", UserName)
    bodydata.append("Name", Name)
    bodydata.append("Password", Password)
    bodydata.append("coupon", coupon)
    if (Profilepicture !== null) {
        bodydata.append("ProfilePicture", Profilepicture)
    }
    axios.post('http://127.0.0.1:5000/api/users/firsttimeuse/register/superuser', bodydata)
        .then(res => {
            // console.log(res.data)
            dispatch({
                type: CREATE_SUPER_USER_SUCCESS,
                payload: res.data
            })
            dispatch({ type: AUTH_LOADED })
        }).catch(err => {
            console.log(err.response)
            dispatch(Create_Error_Messages(err.response.status, err.response.data.msg))
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
            dispatch(Create_Error_Messages(err.response.status, err.response.data.msg))
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
            dispatch(Create_Error_Messages(err.response.status, err.response.data.msg))
            dispatch({ type: AUTH_LOADED })
        })
    // dispatch({ type: AUTH_LOADED })
}

export const get_AccountId_Detail = (UserID) => (dispatch) => {
    // console.log(UserID)
    dispatch({
        type: GET_ACCOUNTID_FOR_DETAIL,
        payload: UserID
    })
}

export const get_AccountDetail = (UserID) => (dispatch, getState) => {
    dispatch({ type: AUTH_LOADING })
    axios.get(`http://127.0.0.1:5000/api/users/user/${UserID}`, tokenConfig(getState))
        .then(res => {
            // console.log(res)
            dispatch({
                type: GET_ACCOUNT_DETAIL,
                payload: res.data,
            })
            // dispatch({ type: AUTH_LOADED })
        }).catch(err => {
            console.log(err.response)
            dispatch(Create_Error_Messages(err.response.status, err.response.data.msg))
            // dispatch({ type: AUTH_LOADED })
        })
    dispatch({ type: AUTH_LOADED })
}

export const Add_Account = (AddAccountData, Auth) => (dispatch, getState) => {
    dispatch({ type: AUTH_LOADING })
    // console.log(AddAccountData, Auth)
    if (Auth) {
        const isSuperUser = Auth.isSuperUser
        if (isSuperUser) {
            const bodydata = new FormData()

            bodydata.append("UserName", AddAccountData.UserName)
            bodydata.append("Name", AddAccountData.Name)
            bodydata.append("Password", AddAccountData.Password)
            bodydata.append("isKasir", AddAccountData.isKasir)
            bodydata.append("isAdmin", AddAccountData.isAdmin)
            bodydata.append("isSuperUser", AddAccountData.isSuperUser)
            if (AddAccountData.Profilepicture !== null) {
                bodydata.append("ProfilePicture", AddAccountData.Profilepicture);
            }
            // console.log('bodydata', ...bodydata)
            axios.post('http://127.0.0.1:5000/api/users/register', bodydata, tokenConfigmultipleform(getState))
                .then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err.response)
                    dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg))
                })
        } else {
            dispatch(Create_Error_Messages(null, 'maaf anda tidak diperkenankan melakukan ini'))
        }
    } else {
        dispatch(Create_Error_Messages(null, 'anda harus login untuk melakukan ini'))
    }
    dispatch({ type: AUTH_LOADED })

}

export const get_AccountId_Update = (UserID) => (dispatch) => {
    // console.log(UserID)
    dispatch({
        type: GET_ACCOUNTID_FOR_UPDATE,
        payload: UserID
    })
}

export const Update_Account = (AccountID, UpdateData, Auth) => (dispatch, getState) => {
    dispatch({ type: AUTH_LOADING })
    // console.log(AccountID, UpdateData, Auth)
    if (Auth) {
        const isSuperUser = Auth.isSuperUser
        if (isSuperUser) {
            const bodydata = new FormData()

            bodydata.append("Name", UpdateData.Name)
            bodydata.append("Password", UpdateData.Password)
            bodydata.append("isActive", UpdateData.isActive)
            bodydata.append("isKasir", UpdateData.isKasir)
            bodydata.append("isAdmin", UpdateData.isAdmin)
            bodydata.append("isSuperUser", UpdateData.isSuperUser)
            if (UpdateData.Profilepicture !== null) {
                bodydata.append("ProfilePicture", UpdateData.Profilepicture);
            }
            axios.patch(`http://127.0.0.1:5000/api/users/user/${AccountID}/update`, bodydata, tokenConfigmultipleform(getState))
                .then(res => {
                    // console.log(res)
                }).catch(err => {
                    console.log(err.response)
                    dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg))
                })
        } else {
            dispatch(Create_Error_Messages(null, 'maaf anda tidak diperkenankan melakukan ini'))
        }
    } else {
        dispatch(Create_Error_Messages(null, 'anda harus login untuk melakukan ini'))
    }
    dispatch({ type: AUTH_LOADED })
}

export const Delete_an_Account = (AccountID, Auth) => (dispatch, getState) => {
    dispatch({ type: AUTH_LOADING })
    // console.log('AccountID',AccountID)
    if (Auth) {
        const isSuperUser = Auth.isSuperUser
        if (isSuperUser) {
            axios.delete(`http://127.0.0.1:5000/api/users/user/${AccountID}/delete`, tokenConfig(getState))
                .then(res => {
                    // console.log(res)
                    dispatch({
                        type: ACCOUNT_DELETE,
                        payload: AccountID
                    })
                }).catch(err => {
                    console.log(err.response)
                    dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg))
                })
        } else {
            dispatch(Create_Error_Messages(null, 'maaf anda tidak diperkenankan melakukan ini'))
        }
    } else {
        dispatch(Create_Error_Messages(null, 'anda harus login untuk melakukan ini'))
    }
    dispatch({ type: AUTH_LOADED })
}

export const Load_Account_List = () => (dispatch, getState) => {
    // console.log(2)
    dispatch({ type: AUTH_LOADING })
    axios.get(`http://127.0.0.1:5000/api/users`, tokenConfig(getState))
        .then(res => {
            // console.log(res)
            dispatch({
                type: GET_LIST_ACCOUNT,
                payload: res.data
            })
            // dispatch({ type: AUTH_LOADED })
        }).catch(err => {
            console.log(err.response)
            dispatch(Create_Error_Messages(err.response.status, err.response.data.msg))
            // dispatch({ type: AUTH_LOADED })
        })
    dispatch({ type: AUTH_LOADED })
}

export const LogOut = () => (dispatch) => {
    dispatch({
        type: LOGOUT_SUCCESS,
    })
}