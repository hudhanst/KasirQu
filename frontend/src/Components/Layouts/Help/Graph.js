import React, { Fragment } from 'react'

import { Paper, Tabs, Tab } from '@material-ui/core'

import BreadCrumbs from '../../Containers/BreadCrumbs'
import GraphAset from './SubPage/Graph.Aset'
import UangMasuk from './SubPage/Graph.UangMasuk'
import UangKeluar from './SubPage/Graph.UangKeluar'
import UangLose from './SubPage/Graph.UangLose'
import IntensitasTransaksi from './SubPage/Graph.IntensitasTransaksi'
import IntensitasBarangTransaksi from './SubPage/Graph.IntensitasBarangTransaksi'

const Graph = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'Laporan Grafik', link: 'help/graph' }]
    const [value, setValue] = React.useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const TapData = [
        { taplabel: 'Cek Aset', TapPanel: <GraphAset /> },
        { taplabel: 'Cek Uang Masuk', TapPanel: <UangMasuk /> },
        { taplabel: 'Cek Uang Keluar', TapPanel: <UangKeluar /> },
        { taplabel: 'Cek Uang Lose', TapPanel: <UangLose /> },
        { taplabel: 'Intensitas Transaksi', TapPanel: <IntensitasTransaksi /> },
        { taplabel: 'Intensitas Barang Transaksi', TapPanel: <IntensitasBarangTransaksi /> },
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
            {value === 2 ? TapData[value].TapPanel : null}
            {value === 3 ? TapData[value].TapPanel : null}
            {value === 4 ? TapData[value].TapPanel : null}
            {value === 5 ? TapData[value].TapPanel : null}
        </Fragment >
    )
}

export default Graph