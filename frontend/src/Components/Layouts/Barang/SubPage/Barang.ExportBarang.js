import React, { Fragment } from 'react'

import { Typography } from '@material-ui/core'

import Searching from '../../../Containers/Searching'
import BarangExport from '../../../Containers/Barang/Barang.BarangExport'
import QueryBarang from '../../../Containers/Barang/Barang.Barang.Query'

const ExportBarang = () => {
    return (
        <Fragment>
            <Typography variant='h4' align='center'>
                Export Barang
            </Typography>
            <Searching
                hidesearch={true}

                advancesearch={true}
                accordiondetails={<QueryBarang />}
            />
            <BarangExport />
        </Fragment>
    )
}

export default ExportBarang