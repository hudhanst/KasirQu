import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Load_IncomeReport_Barang_List } from '../../../Store/Actions/Help.Actions'

import { Short_Column_INT, Short_Column_STR } from '../Shorting'

import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

import { MUI_HorizontalMargin, MUI_VerticalMargin } from '../../../MUI_theme'

import { DataTidakDitemukan } from '../Page404'
import MoneyFormater from '../MoneyFormater'
import Charting from '../Charting'

class BulananBarangReport extends React.Component {
    componentDidMount() {
        this.props.Load_IncomeReport_Barang_List()
    }
    ButtonShortSTR(ColumnNumb) {
        Short_Column_STR('table_report_barang', ColumnNumb)
    }
    ButtonShortINT(ColumnNumb) {
        Short_Column_INT('table_report_barang', ColumnNumb)
    }
    ConverNumberToMoneyFormat(OriginValue) {
        const MoneyFormate = MoneyFormater(OriginValue ? OriginValue : 0)
        return MoneyFormate
    }
    render() {
        ////// data
        const data = this.props.IncomeReportBarangList
        // const secdata = this.props.IncomeReportBarangData
        ////// sumdata
        const TotalBarang = data.reduce((prev, cur) => {
            return prev + cur.TotalBarang
        }, 0)
        const TotalModal = data.reduce((prev, cur) => {
            return prev + (cur.TotalBarang * cur.ModalBarang)
        }, 0)
        const TotalHarga = data.reduce((prev, cur) => {
            return prev + cur.HargaTotal
        }, 0)
        ////// graphdata
        const graphlabels = data.map((item) => item.Barcode)
        const graphdatasetsdata = data.map((item) => item.TotalBarang)

        return (
            <Fragment>
                {(data && data.length > 0) ? (
                    <Fragment>
                        <Table id='table_report_barang'>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(0)}>No</TableCell>
                                    <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortSTR(1)}>Barcode</TableCell>
                                    <TableCell style={{ width: '55%' }} align="center" onClick={() => this.ButtonShortSTR(2)}>Nama Barang</TableCell>
                                    <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(3)}>Jenis Barang</TableCell>
                                    <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(4)}>Total Barang Terjual&nbsp;(satuan)</TableCell>
                                    <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(5)}>Total Estimasi Modal Dikeluarkan&nbsp;(Rp)</TableCell>
                                    <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(6)}>Total Estimasi Pendapatan Diperoleh&nbsp;(Rp)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item, index) => (
                                    <TableRow hover key={index}>
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell align="left">{item.Barcode}</TableCell>
                                        <TableCell align="left">{item.NamaBarang}</TableCell>
                                        <TableCell align="center" >{item.JenisBarang}</TableCell>
                                        <TableCell align="right">{item.TotalBarang}</TableCell>
                                        <TableCell align="right">{this.ConverNumberToMoneyFormat(item.TotalBarang * item.ModalBarang)}</TableCell>
                                        <TableCell align="right">{this.ConverNumberToMoneyFormat(item.HargaTotal)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Table>
                            <TableHead>
                                <TableRow >
                                    <TableCell style={{ width: '5%' }} align="left" >Total:</TableCell>
                                    <TableCell style={{ width: '5%' }} align="left" ></TableCell>
                                    <TableCell style={{ width: '55%' }} align="left" ></TableCell>
                                    <TableCell style={{ width: '10%' }} align="left" ></TableCell>
                                    <TableCell style={{ width: '5%' }} align="right" >{TotalBarang}</TableCell>
                                    <TableCell style={{ width: '10%' }} align="right" >{this.ConverNumberToMoneyFormat(TotalModal)}</TableCell>
                                    <TableCell style={{ width: '10%' }} align="right" >{this.ConverNumberToMoneyFormat(TotalHarga)}</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                        {/* <hr /> */}
                        {/* {secdata ? (
                            <Table>
                                <TableHead>
                                    {secdata.map((item, index) => (
                                        <Fragment key={index}>
                                            <TableRow >
                                                <TableCell align="left">Total Diskon &nbsp;(%)</TableCell>
                                                <TableCell align="right">{item.TotalDiskon}</TableCell>
                                            </TableRow>
                                            <TableRow >
                                                <TableCell align="left">Total PotonganHarga &nbsp;(Rp)</TableCell>
                                                <TableCell align="right">{this.ConverNumberToMoneyFormat(item.TotalPotonganHarga)}</TableCell>
                                            </TableRow>
                                            <TableRow >
                                                <TableCell align="left">Total Pembayaran &nbsp;(Rp)</TableCell>
                                                <TableCell align="right">{this.ConverNumberToMoneyFormat(item.TotalTotalPembayaran)}</TableCell>
                                            </TableRow>
                                            <TableRow >
                                                <TableCell align="left">Total Keuntungan &nbsp;(Rp)</TableCell>
                                                <TableCell align="right">{this.ConverNumberToMoneyFormat(item.TotalTotalPembayaran - TotalModal)}</TableCell>
                                            </TableRow>
                                        </Fragment>
                                    ))}
                                </TableHead>
                            </Table>
                        ) : null} */}
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
    // User: state.Auth.User,
    isHelpLoading: state.Help.isHelpLoading,
    IncomeReportBarangList: state.Help.IncomeReportBarangList,
    // IncomeReportBarangData: state.Help.IncomeReportBarangData,
})

export default connect(mapStateToProps, { Load_IncomeReport_Barang_List })(BulananBarangReport)