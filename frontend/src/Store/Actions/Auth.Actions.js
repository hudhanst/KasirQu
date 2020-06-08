// import axios from 'axios'

import {
    DARKMODE_CONFIG,
    // USER_LOADING,
    // USER_LOADED,
    // USER_EXPIRED,
    // LOGIN_SUCCESS,
    // LOGIN_FAIL,
    // LOGOUT_SUCCESS,
} from '../Actions/Type.Actions'

export const Config_DarkMode = (isDarkMode) = (dispatch) => {
    dispatch({
        type: DARKMODE_CONFIG,
        payload: !isDarkMode,
    })
}