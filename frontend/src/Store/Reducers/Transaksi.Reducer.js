import {
    TRANSAKSI_LOADING,
    TRANSAKSI_LOADED,
    ADD_BARANG_TO_TRANSAKSI,
    CHANGE_TRANSAKSI_ITEM_JUMLAH,
    CLEAR_A_BARANG_FROM_TRANSAKSI,
    CLEAR_BARANG_IN_TRANSAKSI,
} from '../Actions/Type.Actions'

const initialState = {
    isTransaksiLoading: false,
    Transaksi: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case TRANSAKSI_LOADING:
            return {
                ...state,
                isTransaksiLoading: true,
            }
        case TRANSAKSI_LOADED:
            return {
                ...state,
                isTransaksiLoading: false,
            }
        case ADD_BARANG_TO_TRANSAKSI:
            const newTransaksi = {
                Barcode: action.payload.Barcode,
                NamaBarang: action.payload.NamaBarang,
                Jumlah: 1,
                HargaSatuan: action.payload.HargaJual,
                HargaTotal: 1 * action.payload.HargaJual,
                isEditAble: false,
            }
            // console.log(state.Transaksi)
            state.Transaksi.push(newTransaksi)
            // console.log(state.Transaksi)
            return {
                ...state,
                // Transaksi: action.payload
                // Transaksi:[...state.Transaksi, actions.payload]
            }
        case CHANGE_TRANSAKSI_ITEM_JUMLAH:
            state.Transaksi[action.payload.Index].Jumlah=action.payload.Jumlah
            state.Transaksi[action.payload.Index].HargaTotal=action.payload.HargaTotal
            return {
                ...state,
            }
        case CLEAR_A_BARANG_FROM_TRANSAKSI:
            state.Transaksi.splice(action.payload, 1)
            return {
                ...state,
            }
        case CLEAR_BARANG_IN_TRANSAKSI:
            state.Transaksi.length = 0
            return {
                ...state,
            }
        default:
            return state
    }
}