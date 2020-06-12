import React, { Fragment } from 'react'

// import {Typography} from '@material-ui/core'

import BreadCrumbs from '../../Containers/BreadCrumbs'
import DetailToko from '../../Containers/Account/Account.DetailToko'
import AddBarangToTransaksi from '../../Containers/Transaksi/Transaksi.AddBarangToTransaksi'
import TransaksiTransaksi from '../../Containers/Transaksi/Transaksi.Transaksi'

const Transaksi = () => {
    const breadcrumbs = [{ name: 'Transaksi', link: 'transaksi' }]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <DetailToko />
            <hr />
            <AddBarangToTransaksi />
            <hr />
            <TransaksiTransaksi />
        </Fragment>
    )
}

export default Transaksi