import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Load_Graph_IntensitasTransaksi_List } from '../../../Store/Actions/Help.Actions'
import { get_BarangId_Detail } from '../../../Store/Actions/Barang.Actions'

import { Short_Column_INT, Short_Column_STR } from '../Shorting'

import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

import { MUI_HorizontalMargin, MUI_VerticalMargin } from '../../../MUI_theme'

import { DataTidakDitemukan } from '../Page404'
import Charting from '../Charting'

class IntensitasTransaksiGraph extends React.Component {
    componentDidMount() {
        this.props.Load_Graph_IntensitasTransaksi_List()
    }
    ButtonShortSTR(ColumnNumb) {
        Short_Column_STR('table_graph_intensitastransaksi', ColumnNumb)
    }
    ButtonShortINT(ColumnNumb) {
        Short_Column_INT('table_graph_intensitastransaksi', ColumnNumb)
    }
    onClick_get_BarangId_Detail(BarangID) {
        this.props.get_BarangId_Detail(BarangID)
    }
    render() {
        ////// data
        const data = this.props.GraphIntensitasTransaksiList
        ////// sumdata
        const TotalIntensitasTransaksi = data.reduce((prev, cur) => {
            return prev + cur.IntensitasTransaksi
        }, 0)
        ////// graphdata
        const graphlabels = data.map((item) => item.Tanggal)
        const graphdatasetsdata = data.map((item) => item.IntensitasTransaksi)

        return (
            <Fragment>
                {
                    (data && data.length > 0) ? (
                        <Fragment>
                            <Charting
                                canvasstyle={{ ...MUI_HorizontalMargin, ...MUI_VerticalMargin, width: '800px', height: '300px', padding: '10px' }}
                                type='bar'
                                labels={graphlabels}
                                datasetslabel='Grafik Jumlah Intensitas Transaksi'
                                datasetsdata={graphdatasetsdata}
                            />

                            <Table id='table_graph_intensitastransaksi'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(0)}>No</TableCell>
                                        <TableCell style={{ width: '25%' }} align="center" onClick={() => this.ButtonShortSTR(1)}>Tanggal</TableCell>
                                        <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortINT(2)}>Intensitas Transaksi</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((item, index) => (
                                        <TableRow hover key={index}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="left">{item.Tanggal}</TableCell>
                                            <TableCell align="right">{item.IntensitasTransaksi}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Table>
                                <TableHead>
                                    <TableRow >
                                        <TableCell style={{ width: '5%' }} align="center" >Total:</TableCell>
                                        <TableCell style={{ width: '25%' }} align="center" ></TableCell>
                                        <TableCell style={{ width: '10%' }} align="right" >{TotalIntensitasTransaksi}</TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </Fragment>
                    ) : <DataTidakDitemukan />
                }
            </Fragment >
        )
    }
}

const mapStateToProps = (state) => ({
    isHelpLoading: state.Help.isHelpLoading,
    GraphIntensitasTransaksiList: state.Help.GraphIntensitasTransaksiList,
})

export default connect(mapStateToProps, { Load_Graph_IntensitasTransaksi_List, get_BarangId_Detail })(IntensitasTransaksiGraph)