import axios from 'axios'

import {
    BARANG_LOADING,
    BARANG_LOADED,
    GET_BARANG_ID_FOR_DETAIL,
    BARANG_DETAIL,
    GET_BARANG_ID_FOR_UPDATE,
    BARANG_DELETED,
    LIST_BARANG,
    LIST_QUERY_BARANG_EXPORT,
    CEK_IMPORT_BARANG,
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
    axios.get(`/api/barang/detail/${BarangID}`, tokenConfig(getState))
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
            bodydata.append("isDecimal", Barang.isDecimal)
            bodydata.append("Ket", Barang.Ket)
            if (Barang.BarangPic !== null) {
                bodydata.append("BarangPic", Barang.BarangPic);
            }
            axios.post('/api/barang/tambah', bodydata, tokenConfigmultipleform(getState))
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
            const SatuanJual = UpdateData.SatuanJual.map(({ isEditAble, ...item }) => item)
            console.log(SatuanJual)
            const bodydata = new FormData()

            bodydata.append("Name", UpdateData.Name)
            bodydata.append("Jenis", UpdateData.Jenis)
            bodydata.append("Stok", UpdateData.Stok)
            bodydata.append("isDecimal", UpdateData.isDecimal)
            bodydata.append("HargaModal", UpdateData.HargaModal)
            bodydata.append("HargaJual", UpdateData.HargaJual)
            SatuanJual.forEach(element => {
                bodydata.append("SatuanJual[]", JSON.stringify(element))
            })
            bodydata.append("Ket", UpdateData.Ket)
            if (UpdateData.BarangPic !== null) {
                bodydata.append("BarangPic", UpdateData.BarangPic);
            }

            axios.patch(`/api/barang/detail/${BarangID}/update`, bodydata, tokenConfigmultipleform(getState))
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
            axios.delete(`/api/barang/detail/${BarangID}/delete`, tokenConfig(getState))
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
    axios.get('/api/barang/list', tokenConfig(getState))
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

export const Load_Barang_List_Base_On_Jenis = (JenisID) => (dispatch, getState) => {
    dispatch({ type: BARANG_LOADING })
    // const body = JSON.stringify({ Jenis })
    axios.get(`/api/barang/jenisbaranglist/${JenisID}`, tokenConfig(getState))
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

export const Load_Export_Query_Barang = (Query) => (dispatch, getState) => {
    dispatch({ type: BARANG_LOADING })
    const NamaBarang = Query.NamaBarang
    const JenisBarang = Query.JenisBarang
    const Kepemilikan = Query.Kepemilikan
    const StokMin = Query.StokMin
    const StokMax = Query.StokMax
    const HargaModalMin = Query.HargaModalMin
    const HargaModalMax = Query.HargaModalMax
    const HargaJualMin = Query.HargaJualMin
    const HargaJualMax = Query.HargaJualMax
    const Ket = Query.Ket

    const body = JSON.stringify({ NamaBarang, JenisBarang, Kepemilikan, StokMin, StokMax, HargaModalMin, HargaModalMax, HargaJualMin, HargaJualMax, Ket })
    axios.post('/api/barang/querylist', body, tokenConfig(getState))
        .then(res => {
            // console.log(res)
            dispatch({
                type: LIST_QUERY_BARANG_EXPORT,
                payload: res.data.QueryListBarang
            })
            if (res.data.QueryListBarang) {
                const QueryListBarang = res.data.QueryListBarang
                if (QueryListBarang.length >= 1) {
                    dispatch(Create_Success_Messages(res.status ? res.status : null, res.data.msg ? res.data.msg : null))
                } else {
                    dispatch(Create_Error_Messages(null, 'data tidak ditemukan'))
                }
            }
            // dispatch({ type: BARANG_LOADED })
        }).catch(err => {
            console.log(err.response)
            dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
            // dispatch({ type: BARANG_LOADED })
        })
    dispatch({ type: BARANG_LOADED })
}

export const Export_Barang = (Data, Auth) => (dispatch, getState) => {
    dispatch({ type: BARANG_LOADING })
    if (Auth) {
        const isSuperUser = Auth.isSuperUser
        if (isSuperUser) {
            const ExportData = Data

            const body = JSON.stringify({ ExportData })

            axios.post(`/api/barang/export`, body, {
                responseType: 'blob',
                ...tokenConfig(getState)
            })
                .then(res => {
                    console.log(res)

                    const url = window.URL.createObjectURL(new Blob([res.data]))
                    const link = document.createElement('a')
                    link.href = url
                    link.setAttribute('download', 'Export.Barang.xlsx')
                    document.body.appendChild(link)
                    link.click()
                    
                    dispatch(Create_Success_Messages(null, 'Proses Export Barang Berhasil'))
                }).catch(err => {
                    console.log(err.response)
                    // dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg))
                    dispatch(Create_Error_Messages(null, 'Ada Kesalahan Pada Proses Export Barang'))
                })
        } else {
            dispatch(Create_Error_Messages(null, 'maaf anda tidak diperkenankan melakukan ini'))
        }
    } else {
        dispatch(Create_Error_Messages(null, 'anda harus login untuk melakukan ini'))
    }
    dispatch({ type: BARANG_LOADED })
}

export const Cek_Import_Barang = (Data) => (dispatch, getState) => {
    dispatch({ type: BARANG_LOADING })
    // console.log('Data', typeof Data)
    // console.log('Data', Data)
    dispatch({
        type: CEK_IMPORT_BARANG,
        payload: Data
    })
    dispatch({ type: BARANG_LOADED })
}

export const Import_Barang = (Data, Auth) => (dispatch, getState) => {
    dispatch({ type: BARANG_LOADING })
    if (Auth) {
        const isSuperUser = Auth.isSuperUser
        if (isSuperUser) {
            const ImportData = Data

            const body = JSON.stringify({ ImportData })

            axios.post(`/api/barang/import`, body, tokenConfig(getState))
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