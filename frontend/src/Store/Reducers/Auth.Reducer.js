import {
    DARKMODE_CONFIG,
    // USER_LOADING,
    // USER_LOADED,
    // USER_EXPIRED,
    // LOGIN_SUCCESS,
    // LOGIN_FAIL,
    // LOGOUT_SUCCESS,
} from '../Actions/Type.Actions'

const initialState = {
    // token: localStorage.getItem('token'),
    token: true,
    // isAuth: localStorage.getItem('isAuthenticated'),
    isAuth: true,
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
        default:
            return state
    }
}