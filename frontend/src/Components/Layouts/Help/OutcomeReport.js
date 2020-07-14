import React, { Fragment } from 'react'

import { Paper, Tabs, Tab } from '@material-ui/core'

import BreadCrumbs from '../../Containers/BreadCrumbs'
import OutcomeReportBarangBulanan from './SubPage/OutcomeReport.BarangBulanan'
import OutcomeReportModalBulanan from './SubPage/OutcomeReport.ModalBulanan'

const OutcomeReport = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'Laporan Pembelanjaan', link: 'help/outcomereport' }]
    const [value, setValue] = React.useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const TapData = [
        { taplabel: 'Pengeluaran Modal Bulanan', TapPanel: <OutcomeReportModalBulanan /> },
        { taplabel: 'Pembelian Barang Bulanan', TapPanel: <OutcomeReportBarangBulanan /> }
    ]

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

export default OutcomeReport