import React, { Fragment } from 'react'

import { Typography } from '@material-ui/core'

import { TableSearching } from '../../../Containers/Searching'
import IntensitasTransaksiGraph from '../../../Containers/Help/Help.Graph.IntensitasTransaksi'
import QueryIntensitasTransaksi from '../../../Containers/Help/Help.Graph.Query.IntensitasTransaksi'

const IntensitasTransaksi = () => {
    return (
        <Fragment>
            <Typography align='center' variant='h3' >Intensitas Transaksi</Typography>
            <TableSearching
                hidesearch={true}
                advancesearch={true}
                accordiondetails={<QueryIntensitasTransaksi />}
            />
            <IntensitasTransaksiGraph />
        </Fragment >
    )
}

export default IntensitasTransaksi