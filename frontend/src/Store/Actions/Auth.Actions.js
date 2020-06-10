// import axios from 'axios'

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

export const Config_DarkMode = (isDarkMode) => (dispatch) => {
    dispatch({
        type: DARKMODE_CONFIG,
        payload: !isDarkMode,
    })
}

export const LogIn = (username, password) => (dispatch) => {
    dispatch({ type: AUTH_LOADING })
    // const userdatabases = [
    //     {
    //         Username: 'kasir',
    //         Password: '123',
    //         Name: 'kasir_kasirqu',
    //         isUserActive: true,
    //         isUserKasir: true,
    //         isUserAdmin: false,
    //         isUserSuperUser: false,
    //         LastActive: '13-09-2001'
    //     },
    //     {
    //         Username: 'admin',
    //         Password: '1234',
    //         Name: 'admin_kasirqu',
    //         isUserActive: true,
    //         isUserKasir: true,
    //         isUserAdmin: true,
    //         isUserSuperUser: false,
    //         LastActive: '13-09-2001'
    //     },
    //     {
    //         Username: 'superuser',
    //         Password: '12345',
    //         Name: 'superuser_kasirqu',
    //         isUserActive: true,
    //         isUserKasir: true,
    //         isUserAdmin: true,
    //         isUserSuperUser: true,
    //         LastActive: '13-09-2001'
    //     }
    // ]
    dispatch({
        type: LOGIN_SUCCESS,
        // payload: isDarkMode,
    })
    dispatch({ type: AUTH_LOADED })
}
// export const LogIn = (nomerinduk, password) => (dispatch) =>{
//     const body =JSON.stringify({nomerinduk, password})
//     const config={
//         headers:{
//             'Content-Type':'application/json'
//         }
//     }
//     // axios.post('http://127.0.0.1:8000/api/auth/login',body, defualtheader())
//     axios.post('http://127.0.0.1:8000/api/auth/login',body, config)
//     .then(res=>{
//         dispatch({
//             type:LOGIN_SUCCESS,
//             payload:res.data
//         })
//     }).catch(err=>{
//         // console.log(err.response.data)
//         dispatch(ErrorMassages(err.response.data))
//         // console.log(nomerinduk, password, config)
//         // dispatch(returnErrors(err.response.data, err.response.status))
//     })
// }
export const LogOut = (username, password) => (dispatch) => {
    dispatch({
        type: LOGOUT_SUCCESS,
        // payload: isDarkMode,
    })
}