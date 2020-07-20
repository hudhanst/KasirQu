import React, { Fragment } from 'react'

import { Paper, Tabs, Tab } from '@material-ui/core'

import BreadCrumbs from '../../Containers/BreadCrumbs'

import ExportBarang from './SubPage/Barang.ExportBarang'
import ImportBarang from './SubPage/Barang.ImportBarang'

const BarangImportExport = () => {
    const breadcrumbs = [{ name: 'Barang', link: 'barang' }, { name: 'Konfigurasi Barang ', link: 'barang/konfigurasibarang' }, { name: 'Import/Export Barang ', link: 'barang/konfigurasibarang/importexport' }]

    const [value, setValue] = React.useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    const TapData = [
        { taplabel: 'Export Barang', TapPanel: <ExportBarang /> },
        { taplabel: 'Import Barang', TapPanel: <ImportBarang /> },
        // { taplabel: 'Import Barang Update', TapPanel: <ImportKatagoriBarang /> },
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
            {/* {value === 2 ? TapData[value].TapPanel : null} */}
        </Fragment>
    )
}

export default BarangImportExport