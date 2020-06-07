import { combineReducers } from 'redux'

import Auth from './Auth.Reducer'

const RootReducer = combineReducers({
    Auth,
})

export default RootReducer