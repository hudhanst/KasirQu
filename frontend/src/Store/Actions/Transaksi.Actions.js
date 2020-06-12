// import axios from 'axios'

import {
    TRANSAKSI_LOADING,
    TRANSAKSI_LOADED,
    ADD_BARANG_TO_TRANSAKSI,
    CHANGE_TRANSAKSI_ITEM_JUMLAH,
    CLEAR_A_BARANG_FROM_TRANSAKSI,
    CLEAR_BARANG_IN_TRANSAKSI,
} from './Type.Actions'

// export const Add_Barang_To_Transaksi = (Barang, Barcode) => (dispatch) => {
export const Add_Barang_To_Transaksi = (Barang) => (dispatch) => {
    dispatch({ type: TRANSAKSI_LOADING })
    // console.log('Barang', Barang)
    // console.log(' Barcode', Barcode)
    dispatch({
        type: ADD_BARANG_TO_TRANSAKSI,
        payload: Barang,
    })
    // if (Barang) {
    //     // console.log(0.1)
    //     dispatch({
    //         type: ADD_BARANG_TO_TRANSAKSI,
    //         payload: Barang,
    //     })
    // } else {
    //     // console.log(0.2)
    //     dispatch({
    //         type: ADD_BARCODE_TO_TRANSAKSI,
    //         payload: Barcode,
    //     })
    // }
    dispatch({ type: TRANSAKSI_LOADED })
}
export const Change_Transaksi_Item_Jumlah = (Index, Jumlah, HargaSatuan) => (dispatch) => {
    dispatch({ type: TRANSAKSI_LOADING })
    const HargaTotal = Jumlah * HargaSatuan
    dispatch({
        type: CHANGE_TRANSAKSI_ITEM_JUMLAH,
        payload: { Index, Jumlah, HargaTotal }
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