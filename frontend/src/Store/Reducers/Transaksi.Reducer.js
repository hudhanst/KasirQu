import {
    TRANSAKSI_LOADING,
    TRANSAKSI_LOADED,
    CEK_IMPORT_TRANSAKSI,
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
} from '../Actions/Type.Actions'

const initialState = {
    isTransaksiLoading: false,
    Transaksi: [],
    Belanja: [],
    TransaksiList: [],
    idDetailTransaksi: null,
    TransaksiDetail: null,
    TransaksiImportFile: null,
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
        ////// TRANSAKSI
        case ADD_BARANG_TO_TRANSAKSI:
            const newTransaksi = {
                Id: action.payload._id,
                Barcode: action.payload.Barcode,
                NamaBarang: action.payload.Name,
                SatuanOptions: action.payload.SatuanJual,
                isDecimal: action.payload.isDecimal,
                Satuan: "satuan",
                Jumlah: 1,
                HargaSatuan: action.payload.HargaJual,
                TotalBarang: 1,
                HargaTotal: 1 * action.payload.HargaJual,
                isEditAble: false,
            }
            state.Transaksi.push(newTransaksi)
            return {
                ...state,
            }
        case CHANGE_TRANSAKSI_DETAIL:
            state.Transaksi[action.payload.Index].Satuan = action.payload.NamaSatuan
            state.Transaksi[action.payload.Index].Jumlah = action.payload.Jumlah
            state.Transaksi[action.payload.Index].HargaSatuan = action.payload.HargaSatuan
            state.Transaksi[action.payload.Index].TotalBarang = action.payload.TotalBarang
            state.Transaksi[action.payload.Index].HargaTotal = action.payload.HargaTotal
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
        ////// BELANJA
        case ADD_BARANG_TO_BELANJA:
            const newBelanja = {
                Id: action.payload._id,
                Barcode: action.payload.Barcode,
                NamaBarang: action.payload.Name,
                Jumlah: 1,
                HargaModal: 0,
                HargaJual: 0,
                TotalModal: 0,
                isEditAble: false,
            }
            state.Belanja.push(newBelanja)
            return {
                ...state,
            }
        case CHANGE_BELANJA_DETAIL:
            state.Belanja[action.payload.Index].Jumlah = action.payload.Jumlah
            state.Belanja[action.payload.Index].HargaModal = action.payload.HargaModal
            state.Belanja[action.payload.Index].HargaJual = action.payload.HargaJual
            state.Belanja[action.payload.Index].TotalModal = action.payload.TotalModal
            return {
                ...state,
            }
        case CLEAR_A_BARANG_FROM_BELANJA:
            state.Belanja.splice(action.payload, 1)
            return {
                ...state,
            }
        case CLEAR_BARANG_IN_BELANJA:
            state.Belanja.length = 0
            return {
                ...state,
            }
        case QUERY_LIST_TRANSAKSI:
        case LIST_TRANSAKSI:
            return {
                ...state,
                TransaksiList: action.payload,
            }
        case GET_TRANSAKSI_ID_FOR_DETAIL:
            return {
                ...state,
                idDetailTransaksi: action.payload,
            }
        case TRANSAKSI_DETAIL:
            return {
                ...state,
                TransaksiDetail: action.payload,
            }
        case CEK_IMPORT_TRANSAKSI:
            return {
                ...state,
                TransaksiImportFile: action.payload,
            }
        default:
            return state
    }
}