import React from 'react'

import { Route, Switch } from 'react-router-dom'

// import PrivateRoute from './Security/PrivateRoute'

import Home from './Components/Layouts/Home'
import Transaksi from './Components/Layouts/Transaksi'
import Barang from './Components/Layouts/Barang'
import Help from './Components/Layouts/Help'
import Account from './Components/Layouts/Account'

const BaseRouter = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/transaksi" component={Transaksi} />
            <Route exact path="/barang" component={Barang} />
            <Route exact path="/help" component={Help} />
            <Route exact path="/account" component={Account} />
        </Switch>
    )
}

export default BaseRouter