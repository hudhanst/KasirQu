import {
    CREATE_SUPER_USER_SUCCESS,
    DARKMODE_CONFIG,
    AUTH_LOADING,
    AUTH_LOADED,
    RELOADE_PAGE,
    SET_NEW_IP,
    LOGIN_SUCCESS,
    USER_LOADED,
    USER_EXPIRED,
    LOGOUT_SUCCESS,
} from '../Actions/Type.Actions'

const initialState = {
    token: localStorage.getItem('KasirQU_token'),
    isAuth: localStorage.getItem('KasirQU_isAuth'),
    IpAddres: localStorage.getItem('KasirQU_Server_IpAddres'),
    Port: localStorage.getItem('KasirQU_Server_Port'),
    WebSite: localStorage.getItem('KasirQU_Server_WebSite'),
    isUserLoading: false,
    User: null,
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
        case RELOADE_PAGE:
            window.location.reload(true)
            return {
                ...state,
            }
        case SET_NEW_IP: {
            localStorage.setItem('KasirQU_Server_IpAddres', action.payload.newIp)
            localStorage.setItem('KasirQU_Server_Port', action.payload.newPort)
            localStorage.setItem('KasirQU_Server_WebSite', action.payload.newWebSite)
            return {
                ...state,
            }
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