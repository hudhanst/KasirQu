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
    TOKO_DETAIL,
    LIST_HISTORY,
    GET_HISTORY_ID_FOR_DETAIL,
    HISTORY_DETAIL,
    LIST_QUERY_HISTORY_EXPORT,
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
    axios.get(`/api/users/user/${UserID}`, tokenConfig(getState))
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
            axios.post('/api/users/register', bodydata, tokenConfigmultipleform(getState))
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
            axios.patch(`/api/users/user/${AccountID}/update`, bodydata, tokenConfigmultipleform(getState))
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
            axios.delete(`/api/users/user/${AccountID}/delete`, tokenConfig(getState))
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
    axios.get(`/api/users`, tokenConfig(getState))
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

export const get_TokoDetail = () => (dispatch, getState) => {
    dispatch({ type: ACCOUNT_LOADING })
    axios.get('/api/toko/detail', tokenConfig(getState))
        .then(res => {
            // console.log(res)
            dispatch({
                type: TOKO_DETAIL,
                payload: res.data.toko
            })
        }).catch(err => {
            console.log(err)
            dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
        })
    dispatch({ type: ACCOUNT_LOADED })
}

export const Update_Toko = (UpdateData, Auth) => (dispatch, getState) => {
    dispatch({ type: ACCOUNT_LOADING })
    if (Auth) {
        const isSuperUser = Auth.isSuperUser
        if (isSuperUser) {
            const bodydata = new FormData()

            bodydata.append("NamaToko", UpdateData.NamaToko)
            bodydata.append("Alamat", UpdateData.Alamat)
            bodydata.append("Kontak", UpdateData.Kontak)
            if (UpdateData.Logo !== null) {
                bodydata.append("Logo", UpdateData.Logo);
            }
            axios.patch('/api/toko/update', bodydata, tokenConfigmultipleform(getState))
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

export const Load_History_List = () => (dispatch, getState) => {
    // console.log(2)
    dispatch({ type: ACCOUNT_LOADING })
    axios.get(`/api/history/list`, tokenConfig(getState))
        .then(res => {
            // console.log(res)
            dispatch({
                type: LIST_HISTORY,
                payload: res.data.HistoryList
            })
            // dispatch({ type: ACCOUNT_LOADED })
        }).catch(err => {
            console.log(err.response)
            dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
            // dispatch({ type: ACCOUNT_LOADED })
        })
    dispatch({ type: ACCOUNT_LOADED })
}

export const get_HistoryId_Detail = (HistoryID) => (dispatch) => {
    // console.log(UserID)
    dispatch({
        type: GET_HISTORY_ID_FOR_DETAIL,
        payload: HistoryID
    })
}

export const get_HistoryDetail = (UserID) => (dispatch, getState) => {
    dispatch({ type: ACCOUNT_LOADING })
    axios.get(`/api/history/detail/${UserID}`, tokenConfig(getState))
        .then(res => {
            // console.log(res)
            dispatch({
                type: HISTORY_DETAIL,
                payload: res.data.HistoryDetail,
            })
            // dispatch({ type: ACCOUNT_LOADED })
        }).catch(err => {
            console.log(err.response)
            dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
            // dispatch({ type: ACCOUNT_LOADED })
        })
    dispatch({ type: ACCOUNT_LOADED })
}

export const Load_Export_Query_History = (Query) => (dispatch, getState) => {
    dispatch({ type: ACCOUNT_LOADING })
    const UserName = Query.UserName
    const DateMin = Query.DateMin
    const DateMax = Query.DateMax
    const Location = Query.Location
    const Action = Query.Action
    const Status = Query.Status

    const body = JSON.stringify({ UserName, DateMin, DateMax, Location, Action, Status })
    axios.post('/api/history/querylist', body, tokenConfig(getState))
        .then(res => {
            // console.log(res)
            dispatch({
                type: LIST_QUERY_HISTORY_EXPORT,
                payload: res.data.QueryHistory
            })
            if (res.data.QueryHistory) {
                const QueryHistory = res.data.QueryHistory
                if (QueryHistory.length >= 1) {
                    dispatch(Create_Success_Messages(res.status ? res.status : null, res.data.msg ? res.data.msg : null))
                } else {
                    dispatch(Create_Error_Messages(null, 'data tidak ditemukan'))
                }
            }
            // dispatch({ type: ACCOUNT_LOADED })
        }).catch(err => {
            console.log(err.response)
            dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
            // dispatch({ type: ACCOUNT_LOADED })
        })
    dispatch({ type: ACCOUNT_LOADED })
}

export const Export_History = (Data, Auth) => (dispatch, getState) => {
    dispatch({ type: ACCOUNT_LOADING })
    if (Auth) {
        const isSuperUser = Auth.isSuperUser
        if (isSuperUser) {
            const ExportData = Data

            const body = JSON.stringify({ ExportData })

            axios.post(`/api/history/export`, body, {
                responseType: 'blob',
                ...tokenConfig(getState)
            })
                .then(res => {
                    // console.log(res)

                    const url = window.URL.createObjectURL(new Blob([res.data]))
                    const link = document.createElement('a')
                    link.href = url
                    link.setAttribute('download', 'Export.History.xlsx')
                    document.body.appendChild(link)
                    link.click()

                    dispatch(Create_Success_Messages(null, 'Proses Export History Berhasil'))
                }).catch(err => {
                    console.log(err.response)
                    // dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg))
                    dispatch(Create_Error_Messages(null, 'Ada Kesalahan Pada Proses Export History'))
                })
        } else {
            dispatch(Create_Error_Messages(null, 'maaf anda tidak diperkenankan melakukan ini'))
        }
    } else {
        dispatch(Create_Error_Messages(null, 'anda harus login untuk melakukan ini'))
    }
    dispatch({ type: ACCOUNT_LOADED })
}