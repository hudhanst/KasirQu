import {
    SUCCESS_MESSAGES,
    INFO_MESSAGES,
    WARNING_MESSAGES,
    ERROR_MESSAGES,
    CLEAN_MESSAGES,
} from './Type.Actions'

export const Create_Success_Messages = (StatusCode, msg) => (dispatch) => {
    const data = {
        Status: StatusCode,
        msg: msg
    }
    dispatch({
        type: SUCCESS_MESSAGES,
        payload: data
    })
}

export const Create_Info_Messages = (StatusCode, msg) => (dispatch) => {
    const data = {
        Status: StatusCode,
        msg: msg
    }
    dispatch({
        type: INFO_MESSAGES,
        payload: data
    })
}

export const Create_Warning_Messages = (StatusCode, msg) => (dispatch) => {
    const data = {
        Status: StatusCode,
        msg: msg
    }
    dispatch({
        type: WARNING_MESSAGES,
        payload: data
    })
}

export const Create_Error_Messages = (StatusCode, msg) => (dispatch) => {
    const data = {
        Status: StatusCode,
        msg: msg
    }
    dispatch({
        type: ERROR_MESSAGES,
        payload: data
    })
}

export const Clean_Messages = () => (dispatch) => {
    dispatch({ type: CLEAN_MESSAGES })
}