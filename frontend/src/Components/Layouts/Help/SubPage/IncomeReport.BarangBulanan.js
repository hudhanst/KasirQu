import React, { Fragment } from 'react'

import { Typography } from '@material-ui/core'

// import Searching from '../../../Containers/Searching'
import BarangBulanan from '../../../Containers/Help/Help.IncomeReport.BarangBulanan'
// import QueryBulananReport from '../../../Containers/Help/Help.Report.QueryBulananReport'

const IncomeReportBarangBulanan = () => {
    return (
        <Fragment>
            {/* <Searching
                tablename={'table_report_barang'}
                tdnumber={2}
                width='xl'
                label={'Cari Berdasarkan NamaBarang'}
                advancesearch={true}
                accordiondetails={<QueryBulananReport />}
            /> */}
            <Typography variant='h4' align='center'>
                Laporan Penjualan Barang Bulanan
                </Typography>
            <BarangBulanan />
        </Fragment >
    )
}

export default IncomeReportBarangBulanan