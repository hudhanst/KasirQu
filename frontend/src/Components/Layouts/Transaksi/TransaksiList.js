import React, { Fragment } from 'react'

import BreadCrumbs from '../../Containers/BreadCrumbs'
import { TableSearching } from '../../Containers/Searching'
import ListTransaksi from '../../Containers/Transaksi/Transaksi.ListTransaksi'
import ListTransaksiQuery from '../../Containers/Transaksi/Transaksi.Query.ListTransaksi'

const TransaksiList = () => {
    const breadcrumbs = [{ name: 'Transaksi', link: 'transaksi' }, { name: 'Transaksi List', link: 'transaksi/transaksilist' }]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <hr />
            <TableSearching
                tablename={'tabel_list_transaksi'}
                tdnumber={2}
                width='xl'
                label={'Cari Berdasarkan ID'}
                advancesearch={true}
                accordiondetails={<ListTransaksiQuery />}
            />
            <hr />
            <ListTransaksi />
        </Fragment>
    )
}

export default TransaksiList