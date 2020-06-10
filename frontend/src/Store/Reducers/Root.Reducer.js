import { combineReducers } from 'redux'

import Auth from './Auth.Reducer'
import Barang from './Barang.Reducer'

const RootReducer = combineReducers({
    Auth, Barang
})

export default RootReducer