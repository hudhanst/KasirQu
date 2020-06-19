import {
    JENISBARANG_LOADING,
    JENISBARANG_LOADED,
    GET_JENISBARANG_ID_FOR_DETAIL,
    JENISBARANG_DETAIL,
    GET_JENISBARANG_ID_FOR_UPDATE,
    JENISBARANG_DELETED,
    LIST_JENISBARANG,
} from '../Actions/Type.Actions'

const initialState = {
    isJenisBarangLoading: false,
    idDetailJenisBarang: null,
    JenisBarangDetail: null,
    idUpdateJenisBarang: null,
    JenisBarangList: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case JENISBARANG_LOADING:
            return {
                ...state,
                isJenisBarangLoading: true,
            }
        case JENISBARANG_LOADED:
            return {
                ...state,
                isJenisBarangLoading: false,
            }
        case GET_JENISBARANG_ID_FOR_DETAIL:
            return {
                ...state,
                idDetailJenisBarang: action.payload,
            }
        case JENISBARANG_DETAIL:
            return {
                ...state,
                JenisBarangDetail: action.payload,
            }
        case GET_JENISBARANG_ID_FOR_UPDATE:
            return {
                ...state,
                idUpdateJenisBarang: action.payload,
            }
        case JENISBARANG_DELETED:
            return {
                ...state,
                JenisBarangList: state.JenisBarangList.filter(JenisBarangList => JenisBarangList._id !== action.payload)
            }
        case LIST_JENISBARANG:
            return {
                ...state,
                JenisBarangList: action.payload,
            }
        default:
            return state
    }
}