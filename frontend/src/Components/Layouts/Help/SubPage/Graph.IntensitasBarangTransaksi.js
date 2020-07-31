import React, { Fragment } from 'react'

import { Typography } from '@material-ui/core'

import Searching from '../../../Containers/Searching'
import IntensitasBarangTransaksiGraph from '../../../Containers/Help/Help.Graph.IntensitasBarangTransaksi'
import QueryIntensitasBarangTransaksi from '../../../Containers/Help/Help.Graph.Query.IntensitasBarangTransaksi'

const IntensitasBarangTransaksi = () => {
    return (
        <Fragment>
            <Typography align='center' variant='h3' >Intensitas Barang Transaksi</Typography>
            <Searching
                hidesearch={true}
                advancesearch={true}
                accordiondetails={<QueryIntensitasBarangTransaksi />}
            />
            <IntensitasBarangTransaksiGraph />
        </Fragment >
    )
}

export default IntensitasBarangTransaksi