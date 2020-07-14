import React, { Fragment } from 'react'

import { Paper, Tabs, Tab } from '@material-ui/core'

import BreadCrumbs from '../../Containers/BreadCrumbs'
import IncomeReportBarangBulanan from './SubPage/IncomeReport.BarangBulanan'
import IncomeReportKeuanganBulanan from './SubPage/IncomeReport.KeuanganBulanan'

const IncomeReport = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'Laporan Penjualan', link: 'help/incomereport' }]
    const [value, setValue] = React.useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const TapData = [{ taplabel: 'Keuangan Penjualan Bulanan', TapPanel: <IncomeReportKeuanganBulanan /> }, { taplabel: 'Penjualan Barang Bulanan', TapPanel: <IncomeReportBarangBulanan /> }]

    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Paper style={{ marginBottom: '10px' }} >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant={TapData.length > 6 ? "scrollable" : null}
                    scrollButtons="auto"
                    centered={TapData.length > 6 ? false : true}
                >
                    {TapData.map((tapdata, index) => (
                        <Tab key={index} label={tapdata.taplabel} />
                    ))}
                </Tabs>
            </Paper>
            {value === 0 ? TapData[value].TapPanel : null}
            {value === 1 ? TapData[value].TapPanel : null}
        </Fragment >
    )
}

export default IncomeReport