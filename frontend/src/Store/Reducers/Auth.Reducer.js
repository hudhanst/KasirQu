import {
    CREATE_SUPER_USER_SUCCESS,
    DARKMODE_CONFIG,
    AUTH_LOADING,
    AUTH_LOADED,
    LOGIN_SUCCESS,
    USER_LOADED,
    USER_EXPIRED,
    GET_ACCOUNTID_FOR_DETAIL,
    GET_ACCOUNT_DETAIL,
    GET_ACCOUNTID_FOR_UPDATE,
    GET_LIST_ACCOUNT,
    ACCOUNT_DELETE,
    LOGOUT_SUCCESS,
} from '../Actions/Type.Actions'

const initialState = {
    token: localStorage.getItem('KasirQU_token'),
    isAuth: localStorage.getItem('KasirQU_isAuth'),
    isUserLoading: false,
    User: null,
    idDetailAccount: null,
    AccountDetail: null,
    idUpdateAccount: null,
    AccountList: [],
    isDarkMode: localStorage.getItem('KasirQU_isDarkMode')
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_SUPER_USER_SUCCESS:
            localStorage.setItem('KasirQU_token', action.payload.token)
            localStorage.setItem('KasirQU_isAuth', true)
            return {
                ...state,
                isAuth: true,
                token: action.payload.token,
                User: action.payload.user
            }
        case DARKMODE_CONFIG:
            localStorage.setItem('KasirQU_isDarkMode', action.payload)
            return {
                ...state,
                isDarkMode: action.payload,
            }
        case AUTH_LOADING:
            return {
                ...state,
                isUserLoading: true,
            }
        case AUTH_LOADED:
            return {
                ...state,
                isUserLoading: false,
            }
        case USER_LOADED:
            return {
                ...state,
                User: action.payload
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('KasirQU_token', action.payload.token)
            localStorage.setItem('KasirQU_isAuth', true)
            return {
                ...state,
                ...action.payload,
                isAuth: true,
                token: action.payload.token,
                User: action.payload.user
            }
        case GET_ACCOUNTID_FOR_DETAIL:
            return {
                ...state,
                idDetailAccount: action.payload,
            }
        case GET_ACCOUNT_DETAIL:
            return {
                ...state,
                AccountDetail: action.payload,
            }
        case GET_ACCOUNTID_FOR_UPDATE:
            return {
                ...state,
                idUpdateAccount: action.payload,
            }
        case GET_LIST_ACCOUNT:
            return {
                ...state,
                AccountList: action.payload,
            }
        case ACCOUNT_DELETE:
            return {
                ...state,
                AccountList: state.AccountList.filter(AccountList => AccountList._id !== action.payload)
            }
        case USER_EXPIRED:
        case LOGOUT_SUCCESS:
            localStorage.clear();
            return {
                ...state,
                token: null,
                User: null,
                isAuth: false,
                isUserLoading: false,
            }
        default:
            return state
    }
}