import {
    BARANG_LOADING,
    BARANG_LOADED,
    GET_BARANG_ID_FOR_DETAIL,
    BARANG_DETAIL,
    GET_BARANG_ID_FOR_UPDATE,
    BARANG_DELETED,
    LIST_BARANG,
} from '../Actions/Type.Actions'

const initialState = {
    isBarangLoading: false,
    idDetailBarang: null,
    BarangDetail: null,
    idUpdateBarang: null,
    BarangList: [],
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
        case GET_BARANG_ID_FOR_DETAIL:
            return {
                ...state,
                idDetailBarang: action.payload,
            }
        case BARANG_DETAIL:
            return {
                ...state,
                BarangDetail: action.payload,
            }
        case GET_BARANG_ID_FOR_UPDATE:
            return {
                ...state,
                idUpdateBarang: action.payload,
            }
        case BARANG_DELETED:
            return {
                ...state,
                BarangList: state.BarangList.filter(BarangList => BarangList._id !== action.payload)
            }
        case LIST_BARANG:
            return {
                ...state,
                BarangList: action.payload,
            }
        default:
            return state
    }
}