import React, { Fragment } from 'react'

import { Typography } from '@material-ui/core'

import KeuanganBulanan from '../../../Containers/Help/Help.IncomeReport.KeuanganBulanan'

const IncomeReportKeuanganBulanan = () => {
    return (
        <Fragment>
            <Typography variant='h4' align='center'>
                Laporan Pendapatan Keuangan Bulanan
                </Typography>
            <KeuanganBulanan />
        </Fragment >
    )
}

export default IncomeReportKeuanganBulanan