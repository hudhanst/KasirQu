import axios from 'axios'

import { tokenConfig } from './Auth.Actions'

import {
    JENISBARANG_LOADING,
    JENISBARANG_LOADED,
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
    // console.log('JenisBarangID', JenisBarangID)
    dispatch({
        type: GET_JENISBARANG_ID_FOR_DETAIL,
        payload: JenisBarangID
    })
}

export const get_JenisBarangDetail = (JenisBarangID) => (dispatch, getState) => {
    dispatch({ type: JENISBARANG_LOADING })
    axios.get(`/api/jenisbarang/detail/${JenisBarangID}`, tokenConfig(getState))
        .then(res => {
            // console.log(res)
            dispatch({
                type: JENISBARANG_DETAIL,
                payload: res.data.jenisbarang,
            })
            // dispatch({ type: JENISBARANG_LOADED })
        }).catch(err => {
            console.log(err.response)
            dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
            // dispatch({ type: JENISBARANG_LOADED })
        })
    dispatch({ type: JENISBARANG_LOADED })
}

export const Add_JenisBarang = (JenisBarang, Auth) => (dispatch, getState) => {
    dispatch({ type: JENISBARANG_LOADING })
    // console.log(AddAccountData, Auth)
    if (Auth) {
        const isSuperUser = Auth.isSuperUser
        const isAdmin = Auth.isAdmin
        if (isSuperUser || isAdmin) {
            const NamaJenisBarang = JenisBarang.NamaJenisBarang
            const Kepemilikan = JenisBarang.Kepemilikan
            const Ket = JenisBarang.Ket

            const body = JSON.stringify({ NamaJenisBarang, Kepemilikan, Ket })

            axios.post('/api/jenisbarang/tambah', body, tokenConfig(getState))
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
    dispatch({ type: JENISBARANG_LOADED })
}

export const get_JenisBarangId_Update = (JenisBarangID) => (dispatch) => {
    // console.log(JenisBarangID, 'JenisBarangID')
    dispatch({
        type: GET_JENISBARANG_ID_FOR_UPDATE,
        payload: JenisBarangID
    })
}

export const Update_JenisBarang = (JenisBarangID, UpdateData, Auth) => (dispatch, getState) => {
    dispatch({ type: JENISBARANG_LOADING })
    if (Auth) {
        const isSuperUser = Auth.isSuperUser
        const isAdmin = Auth.isAdmin
        if (isSuperUser || isAdmin) {
            // const NamaJenisBarang = UpdateData.NamaJenisBarang
            const Kepemilikan = UpdateData.Kepemilikan
            const Ket = UpdateData.Ket

            const body = JSON.stringify({ Kepemilikan, Ket })

            axios.patch(`/api/jenisbarang/detail/${JenisBarangID}/update`, body, tokenConfig(getState))
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
    dispatch({ type: JENISBARANG_LOADED })
}

export const Delete_a_JenisBarang = (JenisBarangID, Auth) => (dispatch, getState) => {
    // console.log(JenisBarangID, 'JenisBarangID')
    dispatch({ type: JENISBARANG_LOADING })
    if (Auth) {
        const isSuperUser = Auth.isSuperUser
        const isAdmin = Auth.isAdmin
        if (isSuperUser || isAdmin) {
            axios.delete(`/api/jenisbarang/detail/${JenisBarangID}/delete`, tokenConfig(getState))
                .then(res => {
                    // console.log(res)
                    dispatch({
                        type: JENISBARANG_DELETED,
                        payload: JenisBarangID
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
    dispatch({ type: JENISBARANG_LOADED })
}

export const Load_JenisBarang_List = () => (dispatch, getState) => {
    dispatch({ type: JENISBARANG_LOADING })
    axios.get('/api/jenisbarang/list', tokenConfig(getState))
        .then(res => {
            // console.log(res)
            dispatch({
                type: LIST_JENISBARANG,
                payload: res.data.listjenisbarang
            })
            // dispatch({ type: JENISBARANG_LOADED })
        }).catch(err => {
            console.log(err.response)
            dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
            // dispatch({ type: JENISBARANG_LOADED })
        })
    dispatch({ type: JENISBARANG_LOADED })
}

export const Load_Query_KatagoriBarang = (Query) => (dispatch, getState) => {
    dispatch({ type: JENISBARANG_LOADED })
    const JenisBarang = Query.JenisBarang
    const Kepemilikan = Query.Kepemilikan
    const Ket = Query.Ket

    const body = JSON.stringify({ JenisBarang, Kepemilikan, Ket })
    axios.post('/api/jenisbarang/querylist', body, tokenConfig(getState))
        .then(res => {
            // console.log(res)
            dispatch({
                type: LIST_QUERY_JENISBARANG_EXPORT,
                payload: res.data.QueryListJenisBarang
            })
            if (res.data.QueryListJenisBarang) {
                const QueryListJenisBarang = res.data.QueryListJenisBarang
                if (QueryListJenisBarang.length >= 1) {
                    dispatch(Create_Success_Messages(res.status ? res.status : null, res.data.msg ? res.data.msg : null))
                } else {
                    dispatch(Create_Error_Messages(null, 'data tidak ditemukan'))
                }
            }
            // dispatch({ type: JENISBARANG_LOADED })
        }).catch(err => {
            console.log(err.response)
            dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
            // dispatch({ type: JENISBARANG_LOADED })
        })
    dispatch({ type: JENISBARANG_LOADED })
}

export const Cek_Import_KatagoriBarang = (Data) => (dispatch, getState) => {
    dispatch({ type: JENISBARANG_LOADING })
    // console.log('Data', typeof Data)
    // console.log('Data', Data)
    dispatch({
        type: CEK_IMPORT_KATAGORIBARANG,
        payload: Data
    })
    dispatch({ type: JENISBARANG_LOADED })
}

export const Import_KatagoriBarang = (Data, Auth) => (dispatch, getState) => {
    dispatch({ type: JENISBARANG_LOADING })
    if (Auth) {
        const isSuperUser = Auth.isSuperUser
        if (isSuperUser) {
            const ImportData = Data

            const body = JSON.stringify({ ImportData })

            axios.post(`/api/jenisbarang/import`, body, tokenConfig(getState))
                .then(res => {
                    console.log(res)
                    // dispatch(Create_Success_Messages(res.status ? res.status : null, res.data.msg ? res.data.msg : null))
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
    dispatch({ type: JENISBARANG_LOADED })
}

export const Export_KatagoriBarang = (Data, Auth) => (dispatch, getState) => {
    dispatch({ type: JENISBARANG_LOADING })
    if (Auth) {
        const isSuperUser = Auth.isSuperUser
        if (isSuperUser) {
            const ExportData = Data

            const body = JSON.stringify({ ExportData })

            axios.post(`/api/jenisbarang/export`, body, {
                responseType: 'blob',
                ...tokenConfig(getState)
            })
                .then(res => {
                    // console.log(res)

                    const url = window.URL.createObjectURL(new Blob([res.data]))
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
                }).catch(err => {
                    console.log(err.response)
                    // dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg))
                })
        } else {
            dispatch(Create_Error_Messages(null, 'maaf anda tidak diperkenankan melakukan ini'))
        }
    } else {
        dispatch(Create_Error_Messages(null, 'anda harus login untuk melakukan ini'))
    }
    dispatch({ type: JENISBARANG_LOADED })
}