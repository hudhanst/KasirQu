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
    axios.get(`http://127.0.0.1:5000/api/jenisbarang/detail/${JenisBarangID}`, tokenConfig(getState))
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
        if (isSuperUser) {
            const NamaJenisBarang = JenisBarang.NamaJenisBarang
            const Ket = JenisBarang.Ket

            const body = JSON.stringify({ NamaJenisBarang, Ket })

            axios.post('http://127.0.0.1:5000/api/jenisbarang/tambah', body, tokenConfig(getState))
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
    console.log(JenisBarangID, 'JenisBarangID')
    dispatch({
        type: GET_JENISBARANG_ID_FOR_UPDATE,
        payload: JenisBarangID
    })
}

export const Update_JenisBarang = (JenisBarangID, UpdateData, Auth) => (dispatch, getState) => {
    dispatch({ type: JENISBARANG_LOADING })
    if (Auth) {
        const isSuperUser = Auth.isSuperUser
        if (isSuperUser) {

            const NamaJenisBarang = UpdateData.NamaJenisBarang
            const Ket = UpdateData.Ket

            const body = JSON.stringify({ NamaJenisBarang, Ket })

            axios.patch(`http://127.0.0.1:5000/api/jenisbarang/detail/${JenisBarangID}/update`, body, tokenConfig(getState))
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
    console.log(JenisBarangID, 'JenisBarangID')
    dispatch({ type: JENISBARANG_LOADING })
    if (Auth) {
        const isSuperUser = Auth.isSuperUser
        if (isSuperUser) {
            axios.delete(`http://127.0.0.1:5000/api/jenisbarang/detail/${JenisBarangID}/delete`, tokenConfig(getState))
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
    axios.get('http://127.0.0.1:5000/api/jenisbarang/list', tokenConfig(getState))
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