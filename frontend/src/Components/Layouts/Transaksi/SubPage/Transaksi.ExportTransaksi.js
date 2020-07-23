import React, { Fragment } from 'react'

import { Typography } from '@material-ui/core'

import Searching from '../../../Containers/Searching'
import TransaksiExport from '../../../Containers/Transaksi/Transaksi.TransaksiExport'
// import QueryBarang from '../../../Containers/Barang/Barang.Barang.Query'
import QueryTransaksi from '../../../Containers/Transaksi/Transaksi.Query.ListTransaksi'

const ExportTransaksi = () => {
    return (
        <Fragment>
            <Typography variant='h4' align='center'>
                Export Transaksi
            </Typography>
            <Searching
                hidesearch={true}

                advancesearch={true}
                // accordiondetails={<QueryBarang />}
                accordiondetails={<QueryTransaksi />}
            />
            <TransaksiExport />
        </Fragment>
    )
}

export default ExportTransaksi