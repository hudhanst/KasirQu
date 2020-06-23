import React, { Fragment } from 'react'

// import {Typography} from '@material-ui/core'

import BreadCrumbs from '../../Containers/BreadCrumbs'
// import DetailToko from '../../Containers/Account/Account.DetailToko'
import AddBarangToBelanja from '../../Containers/Transaksi/Transaksi.AddBarangToBelanja'
import TransaksiBelanja from '../../Containers/Transaksi/Transaksi.Belanja'

const Belanja = () => {
    const breadcrumbs = [{ name: 'Transaksi', link: 'transaksi' }, { name: 'Belanja', link: 'transaksi/belanja' }]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            {/* <DetailToko /> */}
            <hr />
            <AddBarangToBelanja />
            <hr />
            <TransaksiBelanja />
        </Fragment>
    )
}

export default Belanja