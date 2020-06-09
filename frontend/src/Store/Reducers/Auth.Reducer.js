import {
    DARKMODE_CONFIG,
    AUTH_LOADING,
    AUTH_LOADED,
    // USER_LOADING,
    // USER_LOADED,
    // USER_EXPIRED,
    LOGIN_SUCCESS,
    // LOGIN_FAIL,
    LOGOUT_SUCCESS,
} from '../Actions/Type.Actions'

const initialState = {
    token: localStorage.getItem('KasirQU_token'),
    // token: true,
    isAuth: localStorage.getItem('KasirQU_isAuth'),
    // isAuth: true,
    isUserLoading: false,
    User: null,
    isDarkMode: localStorage.getItem('KasirQU_isDarkMode')
}

export default function (state = initialState, action) {
    switch (action.type) {
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
        case LOGIN_SUCCESS:
            // localStorage.setItem('KasirQU_token', action.payload.token)
            localStorage.setItem('KasirQU_token', true)
            localStorage.setItem('KasirQU_isAuth', true)
            return {
                ...state,
                ...action.payload,
                isAuth: true,
                // token: action.payload.token,
                token: true,
                // User: action.payload.user
            }
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