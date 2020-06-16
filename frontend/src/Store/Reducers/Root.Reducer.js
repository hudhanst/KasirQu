import { combineReducers } from 'redux'

import Auth from './Auth.Reducer'
import Transaksi from './Transaksi.Reducer'
import Barang from './Barang.Reducer'
import Messages from './Messages.Reducer'

const RootReducer = combineReducers({
    Auth, Transaksi, Barang, Messages
})

export default RootReducer