// import {
//     USER_LOADING,
//     USER_LOADED,
//     USER_EXPIRED,
//     LOGIN_SUCCESS,
//     LOGIN_FAIL,
//     LOGOUT_SUCCESS,
// } from '../Actions/Type.Actions'

const initialState = {
    // token: localStorage.getItem('token'),
    token: true,
    // isAuth: localStorage.getItem('isAuthenticated'),
    isAuth: true,
    isUserLoading: false,
    User: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        default:
            return state
    }
}