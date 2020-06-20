import axios from 'axios'

import {
    BARANG_LOADING,
    BARANG_LOADED,
    GET_BARANG_ID_FOR_DETAIL,
    BARANG_DETAIL,
    GET_BARANG_ID_FOR_UPDATE,
    BARANG_DELETED,
    LIST_BARANG,
} from './Type.Actions'

import { tokenConfig, tokenConfigmultipleform } from './Auth.Actions'

import {
    Create_Error_Messages,
    Create_Success_Messages,
} from './Messages.Actions'

export const get_BarangId_Detail = (BarangID) => (dispatch) => {
    // console.log('BarangID', BarangID)
    dispatch({
        type: GET_BARANG_ID_FOR_DETAIL,
        payload: BarangID
    })
}

export const get_BarangDetail = (BarangID) => (dispatch, getState) => {
    // console.log('BarangID',BarangID)
    dispatch({ type: BARANG_LOADING })
    axios.get(`http://127.0.0.1:5000/api/barang/detail/${BarangID}`, tokenConfig(getState))
        .then(res => {
            // console.log(res)
            dispatch({
                type: BARANG_DETAIL,
                payload: res.data.barang,
            })
            // dispatch({ type: BARANG_LOADED })
        }).catch(err => {
            console.log(err.response)
            dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
            // dispatch({ type: BARANG_LOADED })
        })
    dispatch({ type: BARANG_LOADED })
}

export const Add_Barang = (Barang, Auth) => (dispatch, getState) => {
    dispatch({ type: BARANG_LOADING })
    // console.log(AddAccountData, Auth)
    if (Auth) {
        const isSuperUser = Auth.isSuperUser
        const isAdmin = Auth.isAdmin
        if (isSuperUser || isAdmin) {
            const bodydata = new FormData()

            bodydata.append("Barcode", Barang.Barcode)
            bodydata.append("Name", Barang.Name)
            bodydata.append("Jenis", Barang.Jenis)
            bodydata.append("Ket", Barang.Ket)
            if (Barang.BarangPic !== null) {
                bodydata.append("BarangPic", Barang.BarangPic);
            }
            axios.post('http://127.0.0.1:5000/api/barang/tambah', bodydata, tokenConfigmultipleform(getState))
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
    dispatch({ type: BARANG_LOADED })
}

export const get_BarangId_Update = (BarangID) => (dispatch) => {
    // console.log(BarangID, 'BarangID')
    dispatch({
        type: GET_BARANG_ID_FOR_UPDATE,
        payload: BarangID
    })
}

export const Update_Barang = (BarangID, UpdateData, Auth) => (dispatch, getState) => {
    dispatch({ type: BARANG_LOADING })
    if (Auth) {
        const isSuperUser = Auth.isSuperUser
        const isAdmin = Auth.isAdmin
        if (isSuperUser || isAdmin) {
            const bodydata = new FormData()

            bodydata.append("Name", UpdateData.Name)
            bodydata.append("Jenis", UpdateData.Jenis)
            bodydata.append("Stok", UpdateData.Stok)
            bodydata.append("HargaModal", UpdateData.HargaModal)
            bodydata.append("HargaJual", UpdateData.HargaJual)
            bodydata.append("Ket", UpdateData.Ket)
            if (UpdateData.BarangPic !== null) {
                console.log(1)
                bodydata.append("BarangPic", UpdateData.BarangPic);
            }

            axios.patch(`http://127.0.0.1:5000/api/barang/detail/${BarangID}/update`, bodydata, tokenConfigmultipleform(getState))
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
    dispatch({ type: BARANG_LOADED })
}

export const Delete_a_Barang = (BarangID, Auth) => (dispatch, getState) => {
    // console.log(BarangID, 'BarangID')
    dispatch({ type: BARANG_LOADING })
    if (Auth) {
        const isSuperUser = Auth.isSuperUser
        const isAdmin = Auth.isAdmin
        if (isSuperUser || isAdmin) {
            axios.delete(`http://127.0.0.1:5000/api/barang/detail/${BarangID}/delete`, tokenConfig(getState))
                .then(res => {
                    // console.log(res)
                    dispatch({
                        type: BARANG_DELETED,
                        payload: BarangID
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
    dispatch({ type: BARANG_LOADED })
}

export const Load_Barang_List = () => (dispatch, getState) => {
    dispatch({ type: BARANG_LOADING })
    axios.get('http://127.0.0.1:5000/api/barang/list', tokenConfig(getState))
        .then(res => {
            // console.log(res)
            dispatch({
                type: LIST_BARANG,
                payload: res.data.ListBarang
            })
            // dispatch({ type: BARANG_LOADED })
        }).catch(err => {
            console.log(err.response)
            dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
            // dispatch({ type: BARANG_LOADED })
        })
    dispatch({ type: BARANG_LOADED })
}