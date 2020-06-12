import { combineReducers } from 'redux'

import Auth from './Auth.Reducer'
import Transaksi from './Transaksi.Reducer'
import Barang from './Barang.Reducer'

const RootReducer = combineReducers({
    Auth, Transaksi, Barang 
})

export default RootReducer