import axios from 'axios'

import { tokenConfig, Get_IpAddres } from './Auth.Actions'

import {
    JENISBARANG_LOADING,
    JENISBARANG_LOADED,
    RELOADE_PAGE,
    GET_JENISBARANG_ID_FOR_DETAIL,
    JENISBARANG_DETAIL,
    GET_JENISBARANG_ID_FOR_UPDATE,
    JENISBARANG_DELETED,
    LIST_JENISBARANG,
    CEK_IMPORT_KATAGORIBARANG,
    LIST_QUERY_JENISBARANG_EXPORT,
} from './Type.Actions'

import {
    Create_Error_Messages,
    Create_Success_Messages,
} from './Messages.Actions'

export const get_JenisBarangId_Detail = (JenisBarangID) => (dispatch) => {
    // console.log('Log: get_JenisBarangId_Detail -> JenisBarangID', JenisBarangID)
    dispatch({
        type: GET_JENISBARANG_ID_FOR_DETAIL,
        payload: JenisBarangID
    })
}

export const get_JenisBarangDetail = (JenisBarangID) => async (dispatch, getState) => {
    // console.log('Log: get_JenisBarangDetail -> JenisBarangID', JenisBarangID)
    dispatch({ type: JENISBARANG_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: get_JenisBarangDetail -> IpAddres', IpAddres)

        const Responses = await axios.get(`${IpAddres}/api/jenisbarang/detail/${JenisBarangID}`, tokenConfig(getState))
        // console.log('Log: get_JenisBarangDetail -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: JENISBARANG_DETAIL,
                payload: Responses.data.jenisbarang,
            })
            dispatch({ type: JENISBARANG_LOADED })
        }
    } catch (err) {
        console.log('Log: get_JenisBarangDetail -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: JENISBARANG_LOADED })
    }
}

export const Add_JenisBarang = (JenisBarang, Auth) => async (dispatch, getState) => {
    // console.log('Log: Add_JenisBarang -> JenisBarang', JenisBarang)
    // console.log('Log: Add_JenisBarang -> Auth', Auth)
    dispatch({ type: JENISBARANG_LOADING })
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
        const isAdmin = Auth.isAdmin
        if (!isSuperUser || !isAdmin) {
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

        const NamaJenisBarang = JenisBarang.NamaJenisBarang
        const Kepemilikan = JenisBarang.Kepemilikan
        const Ket = JenisBarang.Ket

        const body = JSON.stringify({ NamaJenisBarang, Kepemilikan, Ket })

        const Responses = await axios.post(`${IpAddres}/api/jenisbarang/tambah`, body, tokenConfig(getState))
        console.log('Log: Add_JenisBarang -> Responses', Responses)
        if (Responses) {
            dispatch(Create_Success_Messages(Responses.status ? Responses.status : null, Responses.data.msg ? Responses.data.msg : null))
            dispatch({ type: JENISBARANG_LOADED })
            dispatch({ type: RELOADE_PAGE })
        }
    } catch (err) {
        console.log('Log: Add_JenisBarang -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: JENISBARANG_LOADED })
    }
}

export const get_JenisBarangId_Update = (JenisBarangID) => (dispatch) => {
    // console.log('Log: get_JenisBarangId_Update -> JenisBarangID', JenisBarangID)
    dispatch({
        type: GET_JENISBARANG_ID_FOR_UPDATE,
        payload: JenisBarangID
    })
}

export const Update_JenisBarang = (JenisBarangID, UpdateData, Auth) => async (dispatch, getState) => {
    // console.log('Log: Update_JenisBarang -> JenisBarangID', JenisBarangID)
    // console.log('Log: Update_JenisBarang -> UpdateData', UpdateData)
    // console.log('Log: Update_JenisBarang -> Auth', Auth)
    dispatch({ type: JENISBARANG_LOADING })
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
        const isAdmin = Auth.isAdmin
        if (!isSuperUser || !isAdmin) {
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
        // console.log('Log: Update_JenisBarang -> IpAddres', IpAddres)


        const Kepemilikan = UpdateData.Kepemilikan
        const Ket = UpdateData.Ket

        const body = JSON.stringify({ Kepemilikan, Ket })

        const Responses = await axios.patch(`${IpAddres}/api/jenisbarang/detail/${JenisBarangID}/update`, body, tokenConfig(getState))
        // console.log('Log: Update_JenisBarang -> Responses', Responses)
        if (Responses) {
            dispatch(Create_Success_Messages(Responses.status ? Responses.status : null, Responses.data.msg ? Responses.data.msg : null))
            dispatch({ type: JENISBARANG_LOADED })
            dispatch({ type: RELOADE_PAGE })
        }
    } catch (err) {
        console.log('Log: Update_JenisBarang -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: JENISBARANG_LOADED })
    }
}

export const Delete_a_JenisBarang = (JenisBarangID, Auth) => async (dispatch, getState) => {
    // console.log('Log: Delete_a_JenisBarang -> JenisBarangID', JenisBarangID)
    // console.log('Log: Delete_a_JenisBarang -> Auth', Auth)
    dispatch({ type: JENISBARANG_LOADING })
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
        const isAdmin = Auth.isAdmin
        if (!isSuperUser || !isAdmin) {
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
        // console.log('Log: Delete_a_JenisBarang -> IpAddres', IpAddres)

        const Responses = await axios.delete(`${IpAddres}/api/jenisbarang/detail/${JenisBarangID}/delete`, tokenConfig(getState))
        // console.log('Log: Delete_a_JenisBarang -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: JENISBARANG_DELETED,
                payload: JenisBarangID
            })
            dispatch(Create_Success_Messages(Responses.status ? Responses.status : null, Responses.data.msg ? Responses.data.msg : null))
            dispatch({ type: JENISBARANG_LOADED })
            dispatch({ type: RELOADE_PAGE })
        }
    } catch (err) {
        console.log('Log: Delete_a_JenisBarang -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: JENISBARANG_LOADED })
    }
}

export const Load_JenisBarang_List = () => async (dispatch, getState) => {
    dispatch({ type: JENISBARANG_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: Load_JenisBarang_List -> IpAddres', IpAddres)

        const Responses = await axios.get(`${IpAddres}/api/jenisbarang/list`, tokenConfig(getState))
        // console.log('Log: Load_JenisBarang_List -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: LIST_JENISBARANG,
                payload: Responses.data.listjenisbarang
            })
            dispatch({ type: JENISBARANG_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_JenisBarang_List -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: JENISBARANG_LOADED })
    }
}

export const Load_Export_Query_KatagoriBarang = (Query) => async (dispatch, getState) => {
    // console.log('Log: Load_Export_Query_KatagoriBarang -> Query', Query)
    dispatch({ type: JENISBARANG_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: Load_Export_Query_KatagoriBarang -> IpAddres', IpAddres)

        const JenisBarang = Query.JenisBarang
        const Kepemilikan = Query.Kepemilikan
        const Ket = Query.Ket

        const body = JSON.stringify({ JenisBarang, Kepemilikan, Ket })
        const Responses = await axios.post(`${IpAddres}/api/jenisbarang/querylist`, body, tokenConfig(getState))
        // console.log('Log: Load_Export_Query_KatagoriBarang -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: LIST_QUERY_JENISBARANG_EXPORT,
                payload: Responses.data.QueryListJenisBarang
            })
            if (Responses.data.QueryListJenisBarang) {
                const QueryListJenisBarang = Responses.data.QueryListJenisBarang
                if (QueryListJenisBarang.length >= 1) {
                    dispatch(Create_Success_Messages(Responses.status ? Responses.status : null, Responses.data.msg ? Responses.data.msg : null))
                } else {
                    dispatch(Create_Error_Messages(null, 'data tidak ditemukan'))
                }
            }
            dispatch({ type: JENISBARANG_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_Export_Query_KatagoriBarang -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: JENISBARANG_LOADED })
    }
}

export const Cek_Import_KatagoriBarang = (Data) => (dispatch, getState) => {
    // console.log('Log: Cek_Import_KatagoriBarang -> Data', Data)
    dispatch({ type: JENISBARANG_LOADING })
    dispatch({
        type: CEK_IMPORT_KATAGORIBARANG,
        payload: Data
    })
    dispatch({ type: JENISBARANG_LOADED })
}

export const Import_KatagoriBarang = (Data, Auth) => async (dispatch, getState) => {
    // console.log('Log: Import_KatagoriBarang -> Data', Data)
    // console.log('Log: Import_KatagoriBarang -> Auth', Auth)
    dispatch({ type: JENISBARANG_LOADING })
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
        // console.log('Log: Import_KatagoriBarang -> IpAddres', IpAddres)

        const ImportData = Data

        const body = JSON.stringify({ ImportData })

        const Responses = await axios.post(`${IpAddres}/api/jenisbarang/import`, body, tokenConfig(getState))
        // console.log('Log: Import_KatagoriBarang -> Responses', Responses)
        if (Responses) {
            dispatch(Create_Success_Messages(Responses.status ? Responses.status : null, Responses.data.msg ? Responses.data.msg : null))
            dispatch({ type: JENISBARANG_LOADED })
            dispatch({ type: RELOADE_PAGE })
        }
    } catch (err) {
        console.log('Log: Import_KatagoriBarang -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: JENISBARANG_LOADED })
    }
}

export const Export_KatagoriBarang = (Data, Auth) => async (dispatch, getState) => {
    // console.log('Log: Export_KatagoriBarang -> Data', Data)
    // console.log('Log: Export_KatagoriBarang -> Auth', Auth)
    dispatch({ type: JENISBARANG_LOADING })
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
        // console.log('Log: Export_KatagoriBarang -> IpAddres', IpAddres)

        const ExportData = Data

        const body = JSON.stringify({ ExportData })

        const Responses = await axios.post(`${IpAddres}/api/jenisbarang/export`, body, {
            responseType: 'blob',
            ...tokenConfig(getState)
        })
        // console.log('Log: Export_KatagoriBarang -> Responses', Responses)
        if (Responses) {
            const url = window.URL.createObjectURL(new Blob([Responses.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'Export.JenisBarang.xlsx')
            document.body.appendChild(link)
            link.click()
            // // 1
            // const data = res.data
            // const url = window.URL.createObjectURL(
            //     new Blob([data], {
            //         type: res.headers["content-type"]
            //     })
            // )
            // const response = {
            //     file: url
            // }
            // console.log(response.file)
            // window.open(response.file)

            dispatch(Create_Success_Messages(null, 'Proses Export JenisBarang Berhasil'))
            dispatch({ type: JENISBARANG_LOADED })
        }
    } catch (err) {
        console.log('Log: Export_KatagoriBarang -> err', err)
        dispatch(Create_Error_Messages(null, 'Ada Kesalahan Pada Proses Export JenisBarang'))
        dispatch({ type: JENISBARANG_LOADED })
    }
}