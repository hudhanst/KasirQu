import React, { Fragment } from 'react'

import BreadCrumbs from '../../Containers/BreadCrumbs'
import Searching from '../../Containers/Searching'
import ListTransaksi from '../../Containers/Transaksi/Transaksi.ListTransaksi'

const TransaksiList = () => {
    const breadcrumbs = [{ name: 'Transaksi', link: 'transaksi' }, { name: 'Transaksi List', link: 'transaksi/transaksilist' }]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <hr />
            <Searching tablename={'tabel_list_transaksi'} tdnumber={2} width='xl' label={'Cari Berdasarkan ID'} />
            <hr />
            <ListTransaksi />
        </Fragment>
    )
}

export default TransaksiList