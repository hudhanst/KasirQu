import {
    BARANG_LOADING,
    BARANG_LOADED,
    TABLE_BARANG_LOADED,
} from '../Actions/Type.Actions'

const initialState = {
    isBarangLoading: false,
    Table_Barang: [
        {
            Barcode:'123',
            NamaBarang:'coba',
            StokBarang:100,
            HargaJual:3000,
            HargaBeli:2500,
        },
        {
            Barcode:'12345',
            NamaBarang:'coba1',
            StokBarang:62,
            HargaJual:3500,
            HargaBeli:2000,
        },
        {
            Barcode:'897888',
            NamaBarang:'speda',
            StokBarang:54,
            HargaJual:35000,
            HargaBeli:28000,
        }
    ],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case BARANG_LOADING:
            return {
                ...state,
                isBarangLoading: true,
            }
        case BARANG_LOADED:
            return {
                ...state,
                isBarangLoading: false,
            }
        case TABLE_BARANG_LOADED:
            return {
                ...state,
                // Table_Barang: action.payload
            }
        default:
            return state
    }
}