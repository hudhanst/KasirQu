import React, { Fragment } from 'react'

import { Paper, Tabs, Tab } from '@material-ui/core'

import BreadCrumbs from '../../Containers/BreadCrumbs'

import ExportTransaksi from './SubPage/Transaksi.ExportTransaksi'
import ImportTransaksi from './SubPage/Transaksi.ImportTransaksi'

const TransaksiImportExport = () => {
    const breadcrumbs = [{ name: 'Transaksi', link: 'transaksi' }, { name: 'Import/Export Transaksi ', link: 'transaksi/importexport' }]
    const [value, setValue] = React.useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    const TapData = [
        { taplabel: 'Export Transaksi', TapPanel: <ExportTransaksi /> },
        { taplabel: 'Import Transaksi', TapPanel: <ImportTransaksi /> },
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
        </Fragment>
    )
}

export default TransaksiImportExport