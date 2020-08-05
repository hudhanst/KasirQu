import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Load_OutcomeReport_Barang_List } from '../../../Store/Actions/Help.Actions'

import { Short_Column_INT, Short_Column_STR, Short_Column_Money } from '../Shorting'

import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

import { MUI_HorizontalMargin, MUI_VerticalMargin } from '../../../MUI_theme'

import { DataTidakDitemukan } from '../Page404'
import { ConvertInttoMoney } from '../Formater'
import Charting from '../Charting'

class BarangBulanan extends React.Component {
    componentDidMount() {
        this.props.Load_OutcomeReport_Barang_List()
    }
    ButtonShortSTR(ColumnNumb) {
        Short_Column_STR('table_outcomereport_barang', ColumnNumb)
    }
    ButtonShortINT(ColumnNumb) {
        Short_Column_INT('table_outcomereport_barang', ColumnNumb)
    }
    ButtonShortMoney(ColumnNumb) {
        Short_Column_Money('table_outcomereport_barang', ColumnNumb)
    }
    ConverNumberToMoneyFormat(OriginValue) {
        const MoneyFormate = ConvertInttoMoney(OriginValue ? OriginValue : 0)
        return MoneyFormate
    }
    render() {
        ////// data
        const data = this.props.OutcomeReportBarangList
        // const secdata = this.props.IncomeReportBarangData
        ////// sumdata
        const TotalBarang = data.reduce((prev, cur) => {
            return prev + cur.Jumlah
        }, 0)
        const TotalTotalModal = data.reduce((prev, cur) => {
            return prev + cur.TotalModal
        }, 0)
        ////// graphdata
        const graphlabels = data.map((item) => item.Barcode)
        const graphdatasetsdata = data.map((item) => item.Jumlah)

        return (
            <Fragment>
                {(data && data.length > 0) ? (
                    <Fragment>
                        <Table stickyHeader id='table_outcomereport_barang'>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(0)}>No</TableCell>
                                    <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortSTR(1)}>Barcode</TableCell>
                                    <TableCell style={{ width: '65%' }} align="center" onClick={() => this.ButtonShortSTR(2)}>Nama Barang</TableCell>
                                    <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(3)}>Jenis Barang</TableCell>
                                    <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(4)}>Jumlah&nbsp;(satuan)</TableCell>
                                    <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortMoney(5)}>Total Modal&nbsp;(Rp)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item, index) => (
                                    <TableRow hover key={index}>
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell align="left">{item.Barcode}</TableCell>
                                        <TableCell align="left">{item.NamaBarang}</TableCell>
                                        <TableCell align="center" >{item.JenisBarang}</TableCell>
                                        <TableCell align="right">{item.Jumlah}</TableCell>
                                        <TableCell align="right">{this.ConverNumberToMoneyFormat(item.TotalModal)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Table>
                            <TableHead>
                                <TableRow >
                                    <TableCell style={{ width: '5%' }} align="left" >Total:</TableCell>
                                    <TableCell style={{ width: '5%' }} align="left" ></TableCell>
                                    <TableCell style={{ width: '65%' }} align="left" ></TableCell>
                                    <TableCell style={{ width: '10%' }} align="left" ></TableCell>
                                    <TableCell style={{ width: '5%' }} align="right" >{TotalBarang}</TableCell>
                                    <TableCell style={{ width: '10%' }} align="right" >{this.ConverNumberToMoneyFormat(TotalTotalModal)}</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                        <Charting
                            canvasstyle={{ ...MUI_HorizontalMargin, ...MUI_VerticalMargin, width: '800px', height: '300px', padding: '10px' }}
                            type='pie'
                            labels={graphlabels}
                            datasetslabel='Grafik Jumlah Penjualan Barang Bulanan'
                            datasetsdata={graphdatasetsdata}
                        />
                    </Fragment>
                ) : <DataTidakDitemukan />
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    isHelpLoading: state.Help.isHelpLoading,
    OutcomeReportBarangList: state.Help.OutcomeReportBarangList,
})

export default connect(mapStateToProps, { Load_OutcomeReport_Barang_List })(BarangBulanan)