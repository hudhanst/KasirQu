import axios from 'axios'

import { tokenConfig, tokenConfigmultipleform } from './Auth.Actions'
import { Get_IpAddres } from './Auth.Actions'

import {
    ACCOUNT_LOADING,
    ACCOUNT_LOADED,
    RELOADE_PAGE,
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
    // console.log('Log: get_AccountId_Detail -> UserID', UserID)
    dispatch({
        type: GET_ACCOUNT_ID_FOR_DETAIL,
        payload: UserID
    })
}

export const get_AccountDetail = (UserID) => async (dispatch, getState) => {
    // console.log('Log: get_AccountDetail -> UserID', UserID)
    dispatch({ type: ACCOUNT_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: get_AccountDetail -> IpAddres', IpAddres)

        const Responses = await axios.get(`${IpAddres}/api/users/user/${UserID}`, tokenConfig(getState))
        // console.log('Log: get_AccountDetail -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: ACCOUNT_DETAIL,
                payload: Responses.data,
            })
            dispatch({ type: ACCOUNT_LOADED })
        }
    } catch (err) {
        console.log('Log: get_AccountDetail -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: ACCOUNT_LOADED })
    }
    // dispatch({ type: ACCOUNT_LOADED })
}

export const Add_Account = (AddAccountData, Auth) => async (dispatch, getState) => {
    // console.log('Log: Add_Account -> AddAccountData', AddAccountData)
    // console.log('Log: Add_Account -> Auth', Auth)
    dispatch({ type: ACCOUNT_LOADING })
    try {
        if (!Auth) {
            const newerr = {
                response: {
                    data: {
                        msg: 'anda harus login untuk melakukan ini'
                    }
                }
            }
            throw newerr
        }

        const isSuperUser = Auth.isSuperUser
        if (!isSuperUser) {
            const newerr = {
                response: {
                    data: {
                        msg: 'maaf anda tidak diperkenankan melakukan ini'
                    }
                }
            }
            throw newerr
        }

        const IpAddres = Get_IpAddres()
        // console.log('Log: Add_Account -> IpAddres', IpAddres)

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
        const Responses = await axios.post(`${IpAddres}/api/users/register`, bodydata, tokenConfigmultipleform(getState))
        // console.log('Log: Add_Account -> Responses', Responses)
        if (Responses) {
            dispatch(Create_Success_Messages(Responses.status ? Responses.status : null, Responses.data.msg ? Responses.data.msg : null))
            dispatch({ type: ACCOUNT_LOADED })
            dispatch({ type: RELOADE_PAGE })
        }
    } catch (err) {
        console.log('Log: Add_Account -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: ACCOUNT_LOADED })
    }
}

export const get_AccountId_Update = (UserID) => (dispatch) => {
    // console.log('Log: get_AccountId_Update -> UserID', UserID)
    dispatch({
        type: GET_ACCOUNT_ID_FOR_UPDATE,
        payload: UserID
    })
}

export const Update_Account = (AccountID, UpdateData, Auth) => async (dispatch, getState) => {
    // console.log('Log: Update_Account -> AccountID', AccountID)
    // console.log('Log: Update_Account -> UpdateData', UpdateData)
    // console.log('Log: Update_Account -> Auth', Auth)
    dispatch({ type: ACCOUNT_LOADING })
    try {
        if (!Auth) {
            const newerr = {
                response: {
                    data: {
                        msg: 'anda harus login untuk melakukan ini'
                    }
                }
            }
            throw newerr
        }

        const isSuperUser = Auth.isSuperUser
        if (!isSuperUser) {
            const newerr = {
                response: {
                    data: {
                        msg: 'maaf anda tidak diperkenankan melakukan ini'
                    }
                }
            }
            throw newerr
        }

        const IpAddres = Get_IpAddres()
        // console.log('Log: Update_Account -> IpAddres', IpAddres)

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
        const Responses = await axios.patch(`${IpAddres}/api/users/user/${AccountID}/update`, bodydata, tokenConfigmultipleform(getState))
        // console.log('Log: Update_Account -> Responses', Responses)
        if (Responses) {
            dispatch(Create_Success_Messages(Responses.status ? Responses.status : null, Responses.data.msg ? Responses.data.msg : null))
            dispatch({ type: ACCOUNT_LOADED })
            dispatch({ type: RELOADE_PAGE })
        }
    } catch (err) {
        console.log('Log: Update_Account -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: ACCOUNT_LOADED })
    }
}

export const Delete_an_Account = (AccountID, Auth) => async (dispatch, getState) => {
    // console.log('Log: Delete_an_Account -> AccountID', AccountID)
    // console.log('Log: Delete_an_Account -> Auth', Auth)
    dispatch({ type: ACCOUNT_LOADING })
    try {
        if (!Auth) {
            const newerr = {
                response: {
                    data: {
                        msg: 'anda harus login untuk melakukan ini'
                    }
                }
            }
            throw newerr
        }

        const isSuperUser = Auth.isSuperUser
        if (!isSuperUser) {
            const newerr = {
                response: {
                    data: {
                        msg: 'maaf anda tidak diperkenankan melakukan ini'
                    }
                }
            }
            throw newerr
        }

        const IpAddres = Get_IpAddres()
        // console.log('Log: Delete_an_Account -> IpAddres', IpAddres)

        const Responses = await axios.delete(`${IpAddres}/api/users/user/${AccountID}/delete`, tokenConfig(getState))
        // console.log('Log: Delete_an_Account -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: ACCOUNT_DELETED,
                payload: AccountID
            })
            dispatch(Create_Success_Messages(Responses.status ? Responses.status : null, Responses.data.msg ? Responses.data.msg : null))
            dispatch({ type: ACCOUNT_LOADED })
            dispatch({ type: RELOADE_PAGE })
        }
    } catch (err) {
        console.log('Log: Delete_an_Account -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: ACCOUNT_LOADED })
    }
}

export const Load_Account_List = () => async (dispatch, getState) => {
    dispatch({ type: ACCOUNT_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: Load_Account_List -> IpAddres', IpAddres)

        const Responses = await axios.get(`${IpAddres}/api/users`, tokenConfig(getState))
        // console.log('Log: Load_Account_List -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: LIST_ACCOUNT,
                payload: Responses.data
            })
            // dispatch({ type: ACCOUNT_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_Account_List -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: ACCOUNT_LOADED })
    }
}

export const get_TokoDetail = () => async (dispatch, getState) => {
    dispatch({ type: ACCOUNT_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: get_TokoDetail -> IpAddres', IpAddres)
        const Responses = await axios.get(`${IpAddres}/api/toko/detail`, tokenConfig(getState))
        if (Responses) {
            dispatch({
                type: TOKO_DETAIL,
                payload: Responses.data.toko
            })
            dispatch({ type: ACCOUNT_LOADED })
        }
    } catch (err) {
        console.log('Log: get_TokoDetail -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: ACCOUNT_LOADED })
    }
}

export const Update_Toko = (UpdateData, Auth) => async (dispatch, getState) => {
    // console.log('Log: Update_Toko -> UpdateData', UpdateData)
    // console.log('Log: Update_Toko -> Auth', Auth)
    dispatch({ type: ACCOUNT_LOADING })
    try {
        if (!Auth) {
            const newerr = {
                response: {
                    data: {
                        msg: 'anda harus login untuk melakukan ini'
                    }
                }
            }
            throw newerr
        }

        const isSuperUser = Auth.isSuperUser
        if (!isSuperUser) {
            const newerr = {
                response: {
                    data: {
                        msg: 'maaf anda tidak diperkenankan melakukan ini'
                    }
                }
            }
            throw newerr
        }

        const IpAddres = Get_IpAddres()
        // console.log('Log: Update_Toko -> IpAddres', IpAddres)

        const bodydata = new FormData()

        bodydata.append("NamaToko", UpdateData.NamaToko)
        bodydata.append("Alamat", UpdateData.Alamat)
        bodydata.append("Kontak", UpdateData.Kontak)
        if (UpdateData.Logo !== null) {
            bodydata.append("Logo", UpdateData.Logo);
        }
        const Responses = await axios.patch(`${IpAddres}/api/toko/update`, bodydata, tokenConfigmultipleform(getState))
        // console.log('Log: Update_Toko -> Responses', Responses)
        if (Responses) {
            dispatch(Create_Success_Messages(Responses.status ? Responses.status : null, Responses.data.msg ? Responses.data.msg : null))
            dispatch({ type: ACCOUNT_LOADED })
            dispatch({ type: RELOADE_PAGE })
        }
    } catch (err) {
        console.log('Log: Update_Toko -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: ACCOUNT_LOADED })
    }
}

export const Load_History_List = () => async (dispatch, getState) => {
    dispatch({ type: ACCOUNT_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: Load_History_List -> IpAddres', IpAddres)
        const Responses = await axios.get(`${IpAddres}/api/history/list`, tokenConfig(getState))
        // console.log('Log: Load_History_List -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: LIST_HISTORY,
                payload: Responses.data.HistoryList
            })
            dispatch({ type: ACCOUNT_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_History_List -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: ACCOUNT_LOADED })
    }
}

export const get_HistoryId_Detail = (HistoryID) => (dispatch) => {
    // console.log('Log: get_HistoryId_Detail -> HistoryID', HistoryID)
    dispatch({
        type: GET_HISTORY_ID_FOR_DETAIL,
        payload: HistoryID
    })
}

export const get_HistoryDetail = (UserID) => async (dispatch, getState) => {
    // console.log('Log: get_HistoryDetail -> UserID', UserID)
    dispatch({ type: ACCOUNT_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: get_HistoryDetail -> IpAddres', IpAddres)
        const Responses = await axios.get(`${IpAddres}/api/history/detail/${UserID}`, tokenConfig(getState))
        // console.log('Log: get_HistoryDetail -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: HISTORY_DETAIL,
                payload: Responses.data.HistoryDetail,
            })
            dispatch({ type: ACCOUNT_LOADED })
        }
    } catch (err) {
        console.log('Log: get_HistoryDetail -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: ACCOUNT_LOADED })
    }
}

export const Load_Export_Query_History = (Query) => async (dispatch, getState) => {
    // console.log('Log: Load_Export_Query_History -> Query', Query)
    dispatch({ type: ACCOUNT_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: Load_Export_Query_History -> IpAddres', IpAddres)

        const UserName = Query.UserName
        const DateMin = Query.DateMin
        const DateMax = Query.DateMax
        const Location = Query.Location
        const Action = Query.Action
        const Status = Query.Status

        const body = JSON.stringify({ UserName, DateMin, DateMax, Location, Action, Status })
        const Responses = await axios.post(`${IpAddres}/api/history/querylist`, body, tokenConfig(getState))
        // console.log('Log: Load_Export_Query_History -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: LIST_QUERY_HISTORY_EXPORT,
                payload: Responses.data.QueryHistory
            })
            if (Responses.data.QueryHistory) {
                const QueryHistory = Responses.data.QueryHistory
                if (QueryHistory.length >= 1) {
                    dispatch(Create_Success_Messages(Responses.status ? Responses.status : null, Responses.data.msg ? Responses.data.msg : null))
                } else {
                    dispatch(Create_Error_Messages(null, 'data tidak ditemukan'))
                }
            }
            dispatch({ type: ACCOUNT_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_Export_Query_History -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: ACCOUNT_LOADED })
    }
}

export const Export_History = (Data, Auth) => async (dispatch, getState) => {
    // console.log('Log: Export_History -> Data', Data)
    // console.log('Log: Export_History -> Auth', Auth)
    dispatch({ type: ACCOUNT_LOADING })
    try {
        if (!Auth) {
            const newerr = {
                response: {
                    data: {
                        msg: 'anda harus login untuk melakukan ini'
                    }
                }
            }
            throw newerr
        }

        const isSuperUser = Auth.isSuperUser
        if (!isSuperUser) {
            const newerr = {
                response: {
                    data: {
                        msg: 'maaf anda tidak diperkenankan melakukan ini'
                    }
                }
            }
            throw newerr
        }

        const IpAddres = Get_IpAddres()
        // console.log('Log: Export_History -> IpAddres', IpAddres)

        const ExportData = Data

        const body = JSON.stringify({ ExportData })

        const Responses = await axios.post(`${IpAddres}/api/history/export`, body, {
            responseType: 'blob',
            ...tokenConfig(getState)
        })
        // console.log('Log: Export_History -> Responses', Responses)
        if (Responses) {
            const url = window.URL.createObjectURL(new Blob([Responses.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'Export.History.xlsx')
            document.body.appendChild(link)
            link.click()

            dispatch(Create_Success_Messages(null, 'Proses Export History Berhasil'))
            dispatch({ type: ACCOUNT_LOADED })
        }
    } catch (err) {
        console.log('Log: Export_History -> err', err)
        dispatch(Create_Error_Messages(null, 'Ada Kesalahan Pada Proses Export History'))
        // dispatch(
        //     Create_Error_Messages(
        //         err.response ? (
        //             err.response.status ? err.response.status
        //                 : null) : null,
        //         err.response ? (
        //             err.response.data.msg ? err.response.data.msg
        //                 : null) : 'anda tidak terhubung dengan server'
        //     ))
        dispatch({ type: ACCOUNT_LOADED })
    }
}