import {
    ACCOUNT_LOADING,
    ACCOUNT_LOADED,
    GET_ACCOUNT_ID_FOR_DETAIL,
    ACCOUNT_DETAIL,
    GET_ACCOUNT_ID_FOR_UPDATE,
    ACCOUNT_DELETED,
    LIST_ACCOUNT,
    TOKO_DETAIL,
    LIST_HISTORY,
    HISTORY_DETAIL,
    GET_HISTORY_ID_FOR_DETAIL,
    LIST_QUERY_HISTORY_EXPORT,
} from '../Actions/Type.Actions'

const initialState = {
    isAccountLoading: false,
    idDetailAccount: null,
    AccountDetail: null,
    idUpdateAccount: null,
    AccountList: [],
    TokoDetail: null,
    HistoryList: [],
    idDetailHistory: null,
    HistoryDetail: null,
    ExportHistoryList: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ACCOUNT_LOADING:
            return {
                ...state,
                isAccountLoading: true,
            }
        case ACCOUNT_LOADED:
            return {
                ...state,
                isAccountLoading: false,
            }
        case GET_ACCOUNT_ID_FOR_DETAIL:
            return {
                ...state,
                idDetailAccount: action.payload,
            }
        case ACCOUNT_DETAIL:
            return {
                ...state,
                AccountDetail: action.payload,
            }
        case GET_ACCOUNT_ID_FOR_UPDATE:
            return {
                ...state,
                idUpdateAccount: action.payload,
            }
        case ACCOUNT_DELETED:
            return {
                ...state,
                AccountList: state.AccountList.filter(AccountList => AccountList._id !== action.payload)
            }
        case LIST_ACCOUNT:
            return {
                ...state,
                AccountList: action.payload,
            }
        case TOKO_DETAIL:
            return {
                ...state,
                TokoDetail: action.payload,
            }
        case LIST_HISTORY:
            return {
                ...state,
                HistoryList: action.payload,
            }
        case GET_HISTORY_ID_FOR_DETAIL:
            return {
                ...state,
                idDetailHistory: action.payload,
            }
        case HISTORY_DETAIL:
            return {
                ...state,
                HistoryDetail: action.payload,
            }
        case LIST_QUERY_HISTORY_EXPORT:
            return {
                ...state,
                ExportHistoryList: action.payload,
            }
        default:
            return state
    }
}