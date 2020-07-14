import axios from 'axios'

import { tokenConfig } from './Auth.Actions'

import {
    TRANSAKSI_LOADING,
    TRANSAKSI_LOADED,
    ////// TRANSAKSI
    ADD_BARANG_TO_TRANSAKSI,
    CHANGE_TRANSAKSI_DETAIL,
    CLEAR_A_BARANG_FROM_TRANSAKSI,
    CLEAR_BARANG_IN_TRANSAKSI,
    ////// BELANJA
    ADD_BARANG_TO_BELANJA,
    CHANGE_BELANJA_DETAIL,
    CLEAR_A_BARANG_FROM_BELANJA,
    CLEAR_BARANG_IN_BELANJA,
    //////
    LIST_TRANSAKSI,
    QUERY_LIST_TRANSAKSI,
    GET_TRANSAKSI_ID_FOR_DETAIL,
    TRANSAKSI_DETAIL,
} from './Type.Actions'

import {
    Create_Error_Messages,
    Create_Success_Messages,
} from './Messages.Actions'

////// TRANSAKSI
export const Add_Barang_To_Transaksi = (Barang) => (dispatch) => {
    dispatch({ type: TRANSAKSI_LOADING })
    dispatch({
        type: ADD_BARANG_TO_TRANSAKSI,
        payload: Barang,
    })
    dispatch({ type: TRANSAKSI_LOADED })
}
export const Change_Transaksi_Detail = (Index, Jumlah, NamaSatuan, MinBarang, HargaSatuan) => (dispatch) => {
    dispatch({ type: TRANSAKSI_LOADING })
    const TotalBarang = Jumlah * MinBarang
    const HargaTotal = TotalBarang * HargaSatuan
    dispatch({
        type: CHANGE_TRANSAKSI_DETAIL,
        payload: { Index, NamaSatuan, Jumlah, HargaSatuan, TotalBarang, HargaTotal }
    })
    dispatch({ type: TRANSAKSI_LOADED })
}
export const Clear_A_Barang_From_Transaksi = (Index) => (dispatch) => {
    // console.log(Index )
    dispatch({ type: TRANSAKSI_LOADING })
    dispatch({
        type: CLEAR_A_BARANG_FROM_TRANSAKSI,
        payload: Index,
    })
    dispatch({ type: TRANSAKSI_LOADED })
}
export const Clear_Barang_In_Transaksi = () => (dispatch) => {
    // console.log(2)
    dispatch({ type: TRANSAKSI_LOADING })
    dispatch({ type: CLEAR_BARANG_IN_TRANSAKSI })
    dispatch({ type: TRANSAKSI_LOADED })
}

export const Transaksi_Transaksi = (Data, Diskon, PotonganHarga, Ket, Auth) => (dispatch, getState) => {
    // console.log(2)
    dispatch({ type: TRANSAKSI_LOADING })
    if (Auth) {
        const NamaKasir = Auth.UserName
        // const NamaKasir = null
        const DetailTransaksi = Data.map(({ SatuanOptions, isDecimal, isEditAble, ...item }) => item)
        const Total = DetailTransaksi.reduce((prev, cur) => {
            return prev + cur.HargaTotal
        }, 0)
        let TotalPembayaran = Total ? Total : 0
        if ((Diskon >= 1) && (Diskon <= 100)) {
            TotalPembayaran = TotalPembayaran - ((TotalPembayaran * Diskon) / 100)
            if ((PotonganHarga >= 0) && (PotonganHarga <= TotalPembayaran)) {
                TotalPembayaran = TotalPembayaran - PotonganHarga
            }
        } else {
            if ((PotonganHarga >= 0) && (PotonganHarga <= TotalPembayaran)) {
                TotalPembayaran = TotalPembayaran - PotonganHarga
            }
        }

        const body = JSON.stringify({ NamaKasir, DetailTransaksi, Diskon, PotonganHarga, TotalPembayaran, Ket })
        axios.post('/api/transaksi/transaksi/tambah', body, tokenConfig(getState))
            .then(res => {
                // console.log(res)
                dispatch(Create_Success_Messages(res.status ? res.status : null, res.data.msg ? res.data.msg : null))
            }).catch(err => {
                console.log(err)
                dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg))
            })
    } else {
        dispatch(Create_Error_Messages(null, 'anda harus login untuk melakukan ini'))
    }
    dispatch({ type: TRANSAKSI_LOADED })
}

////// BELANJA

export const Add_Barang_To_Belanja = (Barang) => (dispatch) => {
    dispatch({ type: TRANSAKSI_LOADING })
    dispatch({
        type: ADD_BARANG_TO_BELANJA,
        payload: Barang,
    })
    dispatch({ type: TRANSAKSI_LOADED })
}
export const Change_Belanja_Detail = (Index, Jumlah, HargaModal, HargaJual) => (dispatch) => {
    dispatch({ type: TRANSAKSI_LOADING })
    const TotalModal = Jumlah * HargaModal
    dispatch({
        type: CHANGE_BELANJA_DETAIL,
        payload: { Index, Jumlah, HargaModal, HargaJual, TotalModal }
    })
    dispatch({ type: TRANSAKSI_LOADED })
}
export const Clear_A_Barang_From_Belanja = (Index) => (dispatch) => {
    // console.log(Index )
    dispatch({ type: TRANSAKSI_LOADING })
    dispatch({
        type: CLEAR_A_BARANG_FROM_BELANJA,
        payload: Index,
    })
    dispatch({ type: TRANSAKSI_LOADED })
}
export const Clear_Barang_In_Belanja = () => (dispatch) => {
    // console.log(2)
    dispatch({ type: TRANSAKSI_LOADING })
    dispatch({ type: CLEAR_BARANG_IN_BELANJA })
    dispatch({ type: TRANSAKSI_LOADED })
}

export const Transaksi_Belanja = (Data, Ket, Auth) => (dispatch, getState) => {
    // console.log(2)
    dispatch({ type: TRANSAKSI_LOADING })
    if (Auth) {
        const NamaKasir = Auth.UserName
        // const NamaKasir = null
        const DetailTransaksi = Data.map(({ isEditAble, ...item }) => item)
        const TotalPembayaran = DetailTransaksi.reduce((prev, cur) => {
            return prev + cur.TotalModal
        }, 0)

        const body = JSON.stringify({ NamaKasir, DetailTransaksi, TotalPembayaran, Ket })
        // console.log(body)
        axios.post('/api/transaksi/belanja/tambah', body, tokenConfig(getState))
            .then(res => {
                // console.log(res)
                dispatch(Create_Success_Messages(res.status ? res.status : null, res.data.msg ? res.data.msg : null))
            }).catch(err => {
                console.log(err)
                dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg))
            })
    } else {
        dispatch(Create_Error_Messages(null, 'anda harus login untuk melakukan ini'))
    }
    dispatch({ type: TRANSAKSI_LOADED })
}

export const Load_Transaksi_List = () => (dispatch, getState) => {
    dispatch({ type: TRANSAKSI_LOADING })
    axios.get('/api/transaksi/list', tokenConfig(getState))
        .then(res => {
            // console.log(res)
            dispatch({
                type: LIST_TRANSAKSI,
                payload: res.data.ListTransaksi
            })
            // dispatch({ type: TRANSAKSI_LOADED })
        }).catch(err => {
            console.log(err.response)
            dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
            // dispatch({ type: TRANSAKSI_LOADED })
        })
    dispatch({ type: TRANSAKSI_LOADED })
}
export const Load_Query_Transaksi_List = (data) => (dispatch, getState) => {
    dispatch({ type: TRANSAKSI_LOADING })
    const TransaksiID = data.TransaksiID
    const UserName = data.UserName
    const Jenis = data.Jenis
    const isAllData = data.isAllData
    const DateMin = isAllData === true ? '' : data.DateMin
    const DateMax = isAllData === true ? '' : data.DateMax
    const DiskonMin = data.DiskonMin
    const DiskonMax = data.DiskonMax
    const PotonganHargaMin = data.PotonganHargaMin
    const PotonganHargaMax = data.PotonganHargaMax
    const TotalTransaksiMin = data.TotalTransaksiMin
    const TotalTransaksiMax = data.TotalTransaksiMax
    const Ket = data.Ket

    const body = JSON.stringify({ TransaksiID, UserName, Jenis, DateMin, DateMax, DiskonMin, DiskonMax, PotonganHargaMin, PotonganHargaMax, TotalTransaksiMin, TotalTransaksiMax, Ket })
    axios.post('/api/transaksi/querylist', body, tokenConfig(getState))
        .then(res => {
            // console.log(res)
            dispatch({
                type: QUERY_LIST_TRANSAKSI,
                payload: res.data.ListTransaksi
            })
            if (res.data.ListTransaksi) {
                const ListTransaksi = res.data.ListTransaksi
                if (ListTransaksi.length >= 1) {
                    dispatch(Create_Success_Messages(res.status ? res.status : null, res.data.msg ? res.data.msg : null))
                } else {
                    dispatch(Create_Error_Messages(null, 'data tidak ditemukan'))
                }
            }
            // dispatch({ type: TRANSAKSI_LOADED })
        }).catch(err => {
            console.log(err.response)
            dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
            // dispatch({ type: TRANSAKSI_LOADED })
        })
    dispatch({ type: TRANSAKSI_LOADED })
}
export const get_TransaksiId_Detail = (TransaksiID) => (dispatch) => {
    // console.log('TransaksiID', TransaksiID)
    dispatch({
        type: GET_TRANSAKSI_ID_FOR_DETAIL,
        payload: TransaksiID
    })
}
export const get_TransaksiDetail = (TransaksiID) => (dispatch, getState) => {
    dispatch({ type: TRANSAKSI_LOADING })
    axios.get(`/api/transaksi/detail/${TransaksiID}`, tokenConfig(getState))
        .then(res => {
            // console.log(res)
            dispatch({
                type: TRANSAKSI_DETAIL,
                payload: res.data.transaksi,
            })
            // dispatch({ type: TRANSAKSI_LOADED })
        }).catch(err => {
            console.log(err.response)
            dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
            // dispatch({ type: TRANSAKSI_LOADED })
        })
    dispatch({ type: TRANSAKSI_LOADED })
}