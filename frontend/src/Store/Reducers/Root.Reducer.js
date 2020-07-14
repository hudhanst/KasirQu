import { combineReducers } from 'redux'

import Auth from './Auth.Reducer'
import Account from './Account.Reducer'
import Transaksi from './Transaksi.Reducer'
import JenisBarang from './JenisBarang.Reducer'
import Barang from './Barang.Reducer'
import Help from './Help.Reducer'
import Messages from './Messages.Reducer'

const RootReducer = combineReducers({
    Auth, Account, Transaksi, JenisBarang, Barang, Help, Messages
})

export default RootReducer