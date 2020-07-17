import React from 'react'

import { Route, Switch } from 'react-router-dom'

import PrivateRoute from './Security/PrivateRoute'

import Login from './Components/Layouts/Account/Login'
import FirsTimeUse from './Components/Layouts/FirsTimeUse'
import Logout from './Components/Layouts/Account/Logout'

import Home from './Components/Layouts/Home'

import Transaksi from './Components/Layouts/Transaksi/Transaksi'
import TransaksiImportExport from './Components/Layouts/Transaksi/TransaksiImportExport'
import Belanja from './Components/Layouts/Transaksi/Belanja'
import TransaksiList from './Components/Layouts/Transaksi/TransaksiList'

import Barang from './Components/Layouts/Barang/Barang'
import KatagoriBarang from './Components/Layouts/Barang/katagoribarang'
import KatagoriBarangImportExport from './Components/Layouts/Barang/KatagoriBarangImportExport'
import KonfigurasiBarang from './Components/Layouts/Barang/KonfigurasiBarang'
import BarangImportExport from './Components/Layouts/Barang/BarangImportExport'

import Help from './Components/Layouts/Help/Help'
import IncomeReport from './Components/Layouts/Help/IncomeReport'
import OutcomeReport from './Components/Layouts/Help/OutcomeReport'
import Graph from './Components/Layouts/Help/Graph'

import Account from './Components/Layouts/Account/Account'
import UserList from './Components/Layouts/Account/UserList'
import TokoDetail from './Components/Layouts/Account/TokoDetail'
import History from './Components/Layouts/Account/History'

const BaseRouter = () => {
    return (
        <Switch>
            <PrivateRoute exact path="/" component={Home} />

            <PrivateRoute exact path="/transaksi" component={Transaksi} />
            <PrivateRoute exact path="/transaksi/importexport" component={TransaksiImportExport} />
            <PrivateRoute exact path="/transaksi/belanja" component={Belanja} />
            <PrivateRoute exact path="/transaksi/transaksilist" component={TransaksiList} />

            <PrivateRoute exact path="/barang" component={Barang} />
            <PrivateRoute exact path="/barang/katagoribarang" component={KatagoriBarang} />
            <PrivateRoute exact path="/barang/katagoribarang/importexport" component={KatagoriBarangImportExport} />
            <PrivateRoute exact path="/barang/konfigurasibarang" component={KonfigurasiBarang} />
            <PrivateRoute exact path="/barang/konfigurasibarang/importexport" component={BarangImportExport} />

            <PrivateRoute exact path="/help" component={Help} />
            <PrivateRoute exact path="/help/incomereport" component={IncomeReport} />
            <PrivateRoute exact  path="/help/outcomereport" component={OutcomeReport} />
            <PrivateRoute exact path="/help/graph" component={Graph} />

            <PrivateRoute exact path="/account" component={Account} />
            <PrivateRoute exact path="/account/userlist" component={UserList} />
            <PrivateRoute exact path="/account/tokodetail" component={TokoDetail} />
            <PrivateRoute exact path="/account/tokodetail/history" component={History} />

            <Route exact path="/firsttimeuse" component={FirsTimeUse} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />

        </Switch>
    )
}

export default BaseRouter