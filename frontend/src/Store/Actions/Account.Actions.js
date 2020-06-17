import axios from 'axios'

import { tokenConfig, tokenConfigmultipleform } from './Auth.Actions'

import {
    ACCOUNT_LOADING,
    ACCOUNT_LOADED,
    GET_ACCOUNT_ID_FOR_DETAIL,
    ACCOUNT_DETAIL,
    GET_ACCOUNT_ID_FOR_UPDATE,
    ACCOUNT_DELETED,
    LIST_ACCOUNT,
} from '../Actions/Type.Actions'

import {
    Create_Error_Messages,
    Create_Success_Messages,
} from './Messages.Actions'

export const get_AccountId_Detail = (UserID) => (dispatch) => {
    // console.log(UserID)
    dispatch({
        type: GET_ACCOUNT_ID_FOR_DETAIL,
        payload: UserID
    })
}

export const get_AccountDetail = (UserID) => (dispatch, getState) => {
    dispatch({ type: ACCOUNT_LOADING })
    axios.get(`http://127.0.0.1:5000/api/users/user/${UserID}`, tokenConfig(getState))
        .then(res => {
            // console.log(res)
            dispatch({
                type: ACCOUNT_DETAIL,
                payload: res.data,
            })
            // dispatch({ type: ACCOUNT_LOADED })
        }).catch(err => {
            console.log(err.response)
            dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
            // dispatch({ type: ACCOUNT_LOADED })
        })
    dispatch({ type: ACCOUNT_LOADED })
}

export const Add_Account = (AddAccountData, Auth) => (dispatch, getState) => {
    dispatch({ type: ACCOUNT_LOADING })
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
                    // console.log(res)
                    dispatch(Create_Success_Messages(res.status ? res.status : null, res.data.msg ? res.data.msg : null))
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
    dispatch({ type: ACCOUNT_LOADED })

}

export const get_AccountId_Update = (UserID) => (dispatch) => {
    // console.log(UserID)
    dispatch({
        type: GET_ACCOUNT_ID_FOR_UPDATE,
        payload: UserID
    })
}

export const Update_Account = (AccountID, UpdateData, Auth) => (dispatch, getState) => {
    dispatch({ type: ACCOUNT_LOADING })
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
                    dispatch(Create_Success_Messages(res.status ? res.status : null, res.data.msg ? res.data.msg : null))
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
    dispatch({ type: ACCOUNT_LOADED })
}

export const Delete_an_Account = (AccountID, Auth) => (dispatch, getState) => {
    dispatch({ type: ACCOUNT_LOADING })
    // console.log('AccountID',AccountID)
    if (Auth) {
        const isSuperUser = Auth.isSuperUser
        if (isSuperUser) {
            axios.delete(`http://127.0.0.1:5000/api/users/user/${AccountID}/delete`, tokenConfig(getState))
                .then(res => {
                    console.log(res)
                    dispatch({
                        type: ACCOUNT_DELETED,
                        payload: AccountID
                    })
                    dispatch(Create_Success_Messages(res.status ? res.status : null, res.data.msg ? res.data.msg : null))
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
    dispatch({ type: ACCOUNT_LOADED })
}

export const Load_Account_List = () => (dispatch, getState) => {
    // console.log(2)
    dispatch({ type: ACCOUNT_LOADING })
    axios.get(`http://127.0.0.1:5000/api/users`, tokenConfig(getState))
        .then(res => {
            // console.log(res)
            dispatch({
                type: LIST_ACCOUNT,
                payload: res.data
            })
            // dispatch({ type: ACCOUNT_LOADED })
        }).catch(err => {
            console.log(err.response)
            dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
            // dispatch({ type: ACCOUNT_LOADED })
        })
    dispatch({ type: ACCOUNT_LOADED })
}