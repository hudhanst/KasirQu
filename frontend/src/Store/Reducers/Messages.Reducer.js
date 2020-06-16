import {
    SUCCESS_MESSAGES,
    INFO_MESSAGES,
    WARNING_MESSAGES,
    ERROR_MESSAGES,
    CLEAN_MESSAGES,
} from '../Actions/Type.Actions'

const initialState = {
    isMessages: false,
    MessagesType: null,
    MessagesCode: null,
    Messages: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SUCCESS_MESSAGES:
            return {
                ...state,
                isMessages: true,
                MessagesType: "success",
                MessagesCode: action.payload.Status,
                Messages: action.payload.msg,
            }
        case INFO_MESSAGES:
            return {
                ...state,
                isMessages: true,
                MessagesType: "info",
                MessagesCode: action.payload.Status,
                Messages: action.payload.msg,
            }
        case WARNING_MESSAGES:
            return {
                ...state,
                isMessages: true,
                MessagesType: "warning",
                MessagesCode: action.payload.Status,
                Messages: action.payload.msg,
            }
        case ERROR_MESSAGES:
            return {
                ...state,
                isMessages: true,
                MessagesType: "error",
                MessagesCode: action.payload.Status,
                Messages: action.payload.msg,
            }
        case CLEAN_MESSAGES:
            state.isMessages = false
            state.MessagesType = null
            state.MessagesCode = null
            state.Messages = null
            return {
                ...state,
            }
        default:
            return state
    }
}