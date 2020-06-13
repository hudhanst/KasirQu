import React, { Fragment } from 'react'

import { Container } from '@material-ui/core'

import { MUI_st_Account_Container } from '../../../MUI_theme'

import BreadCrumbs from '../../Containers/BreadCrumbs'
import AccountDetail from '../../Containers/Account/Account.AccountDetail'
import LogOutButton from '../../Containers/LogOutButton'

const Account = () => {
    // const breadcrumbs = [{ name: 'Transaksi', link: 'transaksi' }, { name: 'Barang', link: 'barang' }, { name: 'Help', link: 'help' }, { name: 'Account', link: 'account' },]
    const breadcrumbs = [{ name: 'Account', link: 'account' }]
    return (
        <Fragment>
            <Container style={MUI_st_Account_Container} maxWidth="md">
                <BreadCrumbs breadcrumbs={breadcrumbs} />
                <AccountDetail />
                <LogOutButton />
            </Container>
        </Fragment>
    )
}

export default Account