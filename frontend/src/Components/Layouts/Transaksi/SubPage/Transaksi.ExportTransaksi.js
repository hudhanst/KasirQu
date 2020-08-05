import React, { Fragment } from 'react'

import { Typography } from '@material-ui/core'

import { TableSearching } from '../../../Containers/Searching'
import TransaksiExport from '../../../Containers/Transaksi/Transaksi.TransaksiExport'
import QueryTransaksi from '../../../Containers/Transaksi/Transaksi.Query.ListTransaksi'

const ExportTransaksi = () => {
    return (
        <Fragment>
            <Typography variant='h4' align='center'>
                Export Transaksi
            </Typography>
            <TableSearching
                hidesearch={true}

                advancesearch={true}
                accordiondetails={<QueryTransaksi />}
            />
            <TransaksiExport />
        </Fragment>
    )
}

export default ExportTransaksi