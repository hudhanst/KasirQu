import React, { Fragment } from 'react'

import { Typography } from '@material-ui/core'

import BarangBulanan from '../../../Containers/Help/Help.OutcomeReport.BarangBulanan'

const OutcomeReportBarangBulanan = () => {
    return (
        <Fragment>
            <Typography variant='h4' align='center'>
                Laporan Belanja Barang Bulanan
                </Typography>
            <BarangBulanan />
        </Fragment >
    )
}

export default OutcomeReportBarangBulanan