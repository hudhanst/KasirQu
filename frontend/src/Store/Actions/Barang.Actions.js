import axios from 'axios'

import {
    BARANG_LOADING,
    BARANG_LOADED,
    RELOADE_PAGE,
    GET_BARANG_ID_FOR_DETAIL,
    BARANG_DETAIL,
    GET_BARANG_ID_FOR_UPDATE,
    BARANG_DELETED,
    LIST_BARANG,
    LIST_QUERY_BARANG_EXPORT,
    CEK_IMPORT_BARANG,
} from './Type.Actions'

import { tokenConfig, tokenConfigmultipleform, Get_IpAddres } from './Auth.Actions'

import {
    Create_Error_Messages,
    Create_Success_Messages,
} from './Messages.Actions'

export const get_BarangId_Detail = (BarangID) => (dispatch) => {
    // console.log('Log: get_BarangId_Detail -> BarangID', BarangID)
    dispatch({
        type: GET_BARANG_ID_FOR_DETAIL,
        payload: BarangID
    })
}

export const get_BarangDetail = (BarangID) => async (dispatch, getState) => {
    // console.log('Log: get_BarangDetail -> BarangID', BarangID)
    dispatch({ type: BARANG_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: get_BarangDetail -> IpAddres', IpAddres)

        const Responses = await axios.get(`${IpAddres}/api/barang/detail/${BarangID}`, tokenConfig(getState))
        // console.log('Log: get_BarangDetail -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: BARANG_DETAIL,
                payload: Responses.data.barang,
            })
            dispatch({ type: BARANG_LOADED })
        }
    } catch (err) {
        console.log('Log: get_BarangDetail -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: BARANG_LOADED })
    }
}

export const Add_Barang = (Barang, Auth) => async (dispatch, getState) => {
    // console.log('Log: Add_Barang -> Barang', Barang)
    // console.log('Log: Add_Barang -> Auth', Auth)
    dispatch({ type: BARANG_LOADING })
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
        // console.log('Log: Add_Barang -> IpAddres', IpAddres)

        const bodydata = new FormData()

        bodydata.append("Barcode", Barang.Barcode)
        bodydata.append("Name", Barang.Name)
        bodydata.append("Jenis", Barang.Jenis)
        bodydata.append("isDecimal", Barang.isDecimal)
        bodydata.append("Ket", Barang.Ket)
        if (Barang.BarangPic !== null) {
            bodydata.append("BarangPic", Barang.BarangPic);
        }
        const Responses = await axios.post(`${IpAddres}/api/barang/tambah`, bodydata, tokenConfigmultipleform(getState))
        // console.log('Log: Add_Barang -> Responses', Responses)
        if (Responses) {
            dispatch(Create_Success_Messages(Responses.status ? Responses.status : null, Responses.data.msg ? Responses.data.msg : null))
            dispatch({ type: BARANG_LOADED })
            dispatch({ type: RELOADE_PAGE })
        }
    } catch (err) {
        console.log('Log: Add_Barang -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: BARANG_LOADED })
    }
}

export const get_BarangId_Update = (BarangID) => (dispatch) => {
    // console.log('Log: get_BarangId_Update -> BarangID', BarangID)
    dispatch({
        type: GET_BARANG_ID_FOR_UPDATE,
        payload: BarangID
    })
}

export const Update_Barang = (BarangID, UpdateData, Auth) => async (dispatch, getState) => {
    // console.log('Log: Update_Barang -> BarangID', BarangID)
    // console.log('Log: Update_Barang -> UpdateData', UpdateData)
    // console.log('Log: Update_Barang -> Auth', Auth)
    dispatch({ type: BARANG_LOADING })
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
        // console.log('Log: Update_Barang -> IpAddres', IpAddres)

        const SatuanJual = UpdateData.SatuanJual.map(({ isEditAble, ...item }) => item)
        // console.log('Log: Update_Barang -> SatuanJual', SatuanJual)
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

        const Responses = await axios.patch(`${IpAddres}/api/barang/detail/${BarangID}/update`, bodydata, tokenConfigmultipleform(getState))
        // console.log('Log: Update_Barang -> Responses', Responses)
        if (Responses) {
            dispatch(Create_Success_Messages(Responses.status ? Responses.status : null, Responses.data.msg ? Responses.data.msg : null))
            dispatch({ type: BARANG_LOADED })
            dispatch({ type: RELOADE_PAGE })
        }
    } catch (err) {
        console.log('Log: Update_Barang -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: BARANG_LOADED })
    }
}

export const Delete_a_Barang = (BarangID, Auth) => async (dispatch, getState) => {
    // console.log('Log: Delete_a_Barang -> BarangID', BarangID)
    // console.log('Log: Delete_a_Barang -> Auth', Auth)
    dispatch({ type: BARANG_LOADING })
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
        // console.log('Log: Delete_a_Barang -> IpAddres', IpAddres)


        const Responses = await axios.delete(`${IpAddres}/api/barang/detail/${BarangID}/delete`, tokenConfig(getState))
        // console.log('Log: Delete_a_Barang -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: BARANG_DELETED,
                payload: BarangID
            })
            dispatch(Create_Success_Messages(Responses.status ? Responses.status : null, Responses.data.msg ? Responses.data.msg : null))
            dispatch({ type: BARANG_LOADED })
            dispatch({ type: RELOADE_PAGE })
        }
    } catch (err) {
        console.log('Log: Delete_a_Barang -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: BARANG_LOADED })
    }
}

export const Load_Barang_List = () => async (dispatch, getState) => {
    dispatch({ type: BARANG_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: Load_Barang_List -> IpAddres', IpAddres)

        const Responses = await axios.get(`${IpAddres}/api/barang/list`, tokenConfig(getState))
        // console.log('Log: Load_Barang_List -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: LIST_BARANG,
                payload: Responses.data.ListBarang
            })
            dispatch({ type: BARANG_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_Barang_List -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: BARANG_LOADED })
    }
}

export const Load_Barang_List_Base_On_Jenis = (JenisID) => async (dispatch, getState) => {
    // console.log('Log: Load_Barang_List_Base_On_Jenis -> JenisID', JenisID)
    dispatch({ type: BARANG_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: Load_Barang_List_Base_On_Jenis -> IpAddres', IpAddres)

        const Responses = await axios.get(`${IpAddres}/api/barang/jenisbaranglist/${JenisID}`, tokenConfig(getState))
        if (Responses) {
            dispatch({
                type: LIST_BARANG,
                payload: Responses.data.ListBarang
            })
            dispatch({ type: BARANG_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_Barang_List_Base_On_Jenis -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: BARANG_LOADED })
    }
}

export const Load_Export_Query_Barang = (Query) => async (dispatch, getState) => {
    // console.log('Log: Load_Export_Query_Barang -> Query', Query)
    dispatch({ type: BARANG_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: Load_Export_Query_Barang -> IpAddres', IpAddres)

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
        const Responses = await axios.post(`${IpAddres}/api/barang/querylist`, body, tokenConfig(getState))
        // console.log('Log: Load_Export_Query_Barang -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: LIST_QUERY_BARANG_EXPORT,
                payload: Responses.data.QueryListBarang
            })
            if (Responses.data.QueryListBarang) {
                const QueryListBarang = Responses.data.QueryListBarang
                if (QueryListBarang.length >= 1) {
                    dispatch(Create_Success_Messages(Responses.status ? Responses.status : null, Responses.data.msg ? Responses.data.msg : null))
                } else {
                    dispatch(Create_Error_Messages(null, 'data tidak ditemukan'))
                }
            }
            dispatch({ type: BARANG_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_Export_Query_Barang -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: BARANG_LOADED })
    }
}

export const Export_Barang = (Data, Auth) => async (dispatch, getState) => {
    // console.log('Log: Export_Barang -> Data', Data)
    // console.log('Log: Export_Barang -> Auth', Auth)
    dispatch({ type: BARANG_LOADING })
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
        // console.log('Log: Export_Barang -> IpAddres', IpAddres)
        const ExportData = Data

        const body = JSON.stringify({ ExportData })

        const Responses = await axios.post(`${IpAddres}/api/barang/export`, body, {
            responseType: 'blob',
            ...tokenConfig(getState)
        })
        // console.log('Log: Export_Barang -> Responses', Responses)
        if (Responses) {
            const url = window.URL.createObjectURL(new Blob([Responses.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'Export.Barang.xlsx')
            document.body.appendChild(link)
            link.click()
            dispatch(Create_Success_Messages(null, 'Proses Export Barang Berhasil'))
            dispatch({ type: BARANG_LOADED })
        }
    } catch (err) {
        console.log('Log: Export_Barang -> err', err)
        dispatch(Create_Error_Messages(null, 'Ada Kesalahan Pada Proses Export History'))
        dispatch({ type: BARANG_LOADED })
    }
}

export const Cek_Import_Barang = (Data) => async (dispatch, getState) => {
    // console.log('Log: Cek_Import_Barang -> Data', Data)
    dispatch({ type: BARANG_LOADING })
    dispatch({
        type: CEK_IMPORT_BARANG,
        payload: Data
    })
    dispatch({ type: BARANG_LOADED })
}

export const Import_Barang = (Data, Auth) => async (dispatch, getState) => {
    // console.log('Log: Import_Barang -> Data', Data)
    // console.log('Log: Import_Barang -> Auth', Auth)
    dispatch({ type: BARANG_LOADING })
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
        // console.log('Log: Import_Barang -> IpAddres', IpAddres)

        const ImportData = Data

        const body = JSON.stringify({ ImportData })

        const Responses = await axios.post(`${IpAddres}/api/barang/import`, body, tokenConfig(getState))
        // console.log('Log: Import_Barang -> Responses', Responses)
        if (Responses) {
            dispatch(Create_Success_Messages(Responses.status ? Responses.status : null, Responses.data.msg ? Responses.data.msg : null))
            dispatch({ type: BARANG_LOADED })
            dispatch({ type: RELOADE_PAGE })
        }
    } catch (err) {
        console.log('Log: Import_Barang -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: BARANG_LOADED })
    }
}