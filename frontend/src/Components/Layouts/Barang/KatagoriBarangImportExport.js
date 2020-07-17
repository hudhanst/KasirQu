import React, { Fragment } from 'react'

import { Paper, Tabs, Tab } from '@material-ui/core'

import BreadCrumbs from '../../Containers/BreadCrumbs'

import ImportKatagoriBarang from './SubPage/KategoriBarang.ImportKatagoriBarang'
import ExportKatagoriBarang from './SubPage/KategoriBarang.ExportKatagoriBarang'

const KatagoriBarangImportExport = () => {
    const breadcrumbs = [{ name: 'Barang', link: 'barang' }, { name: 'Kategori Barang ', link: 'barang/katagoribarang' }, { name: 'Import/Export Kategori Barang ', link: 'barang/katagoribarang/importexport' }]

    const [value, setValue] = React.useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    const TapData = [
        { taplabel: 'Export Kategori Barang', TapPanel: <ExportKatagoriBarang /> },
        { taplabel: 'Import Kategori Barang', TapPanel: <ImportKatagoriBarang /> },
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

export default KatagoriBarangImportExport