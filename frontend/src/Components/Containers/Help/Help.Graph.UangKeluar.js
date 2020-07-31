import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Load_Graph_UangKeluar_List } from '../../../Store/Actions/Help.Actions'
import { get_BarangId_Detail } from '../../../Store/Actions/Barang.Actions'

import { Short_Column_INT, Short_Column_STR } from '../Shorting'

import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

import { MUI_HorizontalMargin, MUI_VerticalMargin } from '../../../MUI_theme'

import { DataTidakDitemukan } from '../Page404'
import MoneyFormater from '../MoneyFormater'
import Charting from '../Charting'

class UangKeluarGraph extends React.Component {
    componentDidMount() {
        this.props.Load_Graph_UangKeluar_List()
    }
    ButtonShortSTR(ColumnNumb) {
        Short_Column_STR('table_graph_uangkeluar', ColumnNumb)
    }
    ButtonShortINT(ColumnNumb) {
        Short_Column_INT('table_graph_uangkeluar', ColumnNumb)
    }
    ConverNumberToMoneyFormat(OriginValue) {
        const MoneyFormate = MoneyFormater(OriginValue ? OriginValue : 0)
        return MoneyFormate
    }
    onClick_get_BarangId_Detail(BarangID) {
        this.props.get_BarangId_Detail(BarangID)
    }
    render() {
        ////// data
        const data = this.props.GraphUangKeluarList
        ////// sumdata
        const TotalUangKeluar = data.reduce((prev, cur) => {
            return prev + cur.UangKeluar
        }, 0)
        ////// graphdata
        const graphlabels = data.map((item) => item.Tanggal)
        const graphdatasetsdata = data.map((item) => item.UangKeluar)

        return (
            <Fragment>
                {
                    (data && data.length > 0) ? (
                        <Fragment>
                            <Charting
                                canvasstyle={{ ...MUI_HorizontalMargin, ...MUI_VerticalMargin, width: '800px', height: '300px', padding: '10px' }}
                                type='bar'
                                labels={graphlabels}
                                datasetslabel='Grafik Jumlah Uang Keluar'
                                datasetsdata={graphdatasetsdata}
                            />

                            <Table id='table_graph_uangkeluar'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(0)}>No</TableCell>
                                        <TableCell style={{ width: '25%' }} align="center" onClick={() => this.ButtonShortSTR(1)}>Tanggal</TableCell>
                                        <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(2)}>Total Uang Keluar&nbsp;(Rp)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((item, index) => (
                                        <TableRow hover key={index}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="left">{item.Tanggal}</TableCell>
                                            <TableCell align="right">{this.ConverNumberToMoneyFormat(item.UangKeluar)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Table>
                                <TableHead>
                                    <TableRow >
                                        <TableCell style={{ width: '5%' }} align="center" >Total:</TableCell>
                                        <TableCell style={{ width: '25%' }} align="center" ></TableCell>
                                        <TableCell style={{ width: '10%' }} align="right" >{this.ConverNumberToMoneyFormat(TotalUangKeluar)}</TableCell>
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
    GraphUangKeluarList: state.Help.GraphUangKeluarList,
})

export default connect(mapStateToProps, { Load_Graph_UangKeluar_List, get_BarangId_Detail })(UangKeluarGraph)