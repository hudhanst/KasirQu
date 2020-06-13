import React from 'react'

import { Route, Switch } from 'react-router-dom'

import PrivateRoute from './Security/PrivateRoute'

import Login from './Components/Layouts/Account/Login'
import Logout from './Components/Layouts/Account/Logout'

import Home from './Components/Layouts/Home'
import Transaksi from './Components/Layouts/Transaksi/Transaksi'
import Barang from './Components/Layouts/Barang/Barang'
import Help from './Components/Layouts/Help/Help'
import Account from './Components/Layouts/Account/Account'
import UserList from './Components/Layouts/Account/UserList'

const BaseRouter = () => {
    return (
        <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/transaksi" component={Transaksi} />
            <PrivateRoute exact path="/barang" component={Barang} />
            <PrivateRoute exact path="/help" component={Help} />
            <PrivateRoute exact path="/account" component={Account} />
            <PrivateRoute exact path="/account/userlist" component={UserList} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
        </Switch>
    )
}

export default BaseRouter