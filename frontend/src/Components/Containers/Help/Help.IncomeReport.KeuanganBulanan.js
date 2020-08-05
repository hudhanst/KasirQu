import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Load_IncomeReport_Keuangan_List } from '../../../Store/Actions/Help.Actions'

import { Short_Column_INT, Short_Column_STR, Short_Column_Money, Short_Column_Date } from '../Shorting'

import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

import { MUI_HorizontalMargin, MUI_VerticalMargin } from '../../../MUI_theme'

import { DataTidakDitemukan } from '../Page404'
import { ConvertInttoMoney } from '../Formater'
import Charting from '../Charting'

class KeuanganBulanan extends React.Component {
    componentDidMount() {
        this.props.Load_IncomeReport_Keuangan_List()
    }
    ButtonShortSTR(ColumnNumb) {
        Short_Column_STR('table_incomereport_keuangan', ColumnNumb)
    }
    ButtonShortINT(ColumnNumb) {
        Short_Column_INT('table_incomereport_keuangan', ColumnNumb)
    }
    ButtonShortMoney(ColumnNumb) {
        Short_Column_Money('table_incomereport_keuangan', ColumnNumb)
    }
    ButtonShortDate(ColumnNumb) {
        Short_Column_Date('table_incomereport_keuangan', ColumnNumb)
    }
    ConverNumberToMoneyFormat(OriginValue) {
        const MoneyFormate = ConvertInttoMoney(OriginValue ? OriginValue : 0)
        return MoneyFormate
    }
    render() {
        ////// data
        const data = this.props.IncomeReportKeuanganList
        ////// sumdata
        const TotalDiskon = data.reduce((prev, cur) => {
            return prev + cur.DiskonHarian
        }, 0)
        const TotalPotongan = data.reduce((prev, cur) => {
            return prev + cur.PotonganHargaHarian
        }, 0)
        const TotalKeuntungan = data.reduce((prev, cur) => {
            return prev + cur.KeuntunganHarian
        }, 0)
        ////// graphdata
        const graphlabels = data.map((item) => item.Tanggal)
        const graphdatasetsdata = data.map((item) => item.KeuntunganHarian)
        const graphdatasetsdata_1 = data.map((item) => item.PotonganHargaHarian)
        const graphdatasetsdata_2 = data.map((item) => item.DiskonHarian)

        return (
            <Fragment>
                {
                    (data && data.length > 0) ? (
                        <Fragment>
                            <Table id='table_incomereport_keuangan'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(0)}>No</TableCell>
                                        <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortDate(1)}>Tanggal</TableCell>
                                        <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(2)}>Total Diskon Diberikan Harian&nbsp;(%)</TableCell>
                                        <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortMoney(3)}>Total Potongan Diberikan Harian&nbsp;(Rp)</TableCell>
                                        <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortMoney(4)}>Total Keuntungan Harian&nbsp;(Rp)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((item, index) => (
                                        <TableRow hover key={index}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="left">{item.Tanggal}</TableCell>
                                            <TableCell align="right">{item.DiskonHarian}%</TableCell>
                                            <TableCell align="right">{this.ConverNumberToMoneyFormat(item.PotonganHargaHarian)}</TableCell>
                                            <TableCell align="right">{this.ConverNumberToMoneyFormat(item.KeuntunganHarian)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Table>
                                <TableHead>
                                    <TableRow >
                                        <TableCell style={{ width: '5%' }} align="left" >Total:</TableCell>
                                        <TableCell style={{ width: '10%' }} align="center" ></TableCell>
                                        <TableCell style={{ width: '10%' }} align="right" >{TotalDiskon}%</TableCell>
                                        <TableCell style={{ width: '10%' }} align="right" >{this.ConverNumberToMoneyFormat(TotalPotongan)}</TableCell>
                                        <TableCell style={{ width: '10%' }} align="right" >{this.ConverNumberToMoneyFormat(TotalKeuntungan)}</TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>

                            <Charting
                                canvasstyle={{ ...MUI_HorizontalMargin, ...MUI_VerticalMargin, width: '800px', height: '300px', padding: '10px' }}
                                type='bar'
                                // labels={graphlabels}
                                // datasetslabel='Grafik Jumlah Keuntungan perHari'
                                // datasetsdata={graphdatasetsdata}
                                data={{
                                    datasets: [{
                                        label: 'Total Keuntungan Harian (Rp)',
                                        data: graphdatasetsdata,
                                        backgroundColor: 'green',
                                    }, {
                                        label: 'Total Potongan Harian (Rp)',
                                        data: graphdatasetsdata_1,
                                        backgroundColor: 'red',
                                        // type: 'line'
                                    }, {
                                        label: 'Total Diskon (%)',
                                        data: graphdatasetsdata_2,
                                        borderColor: 'blue',
                                        backgroundColor: 'blue',
                                        fill: false,
                                        type: 'line'

                                        // Changes this dataset to become a line
                                        // type: 'line'
                                    }],
                                    labels: graphlabels
                                }}
                            />
                        </Fragment>
                    ) : <DataTidakDitemukan />
                }
            </Fragment >
        )
    }
}

const mapStateToProps = (state) => ({
    isHelpLoading: state.Help.isHelpLoading,
    IncomeReportKeuanganList: state.Help.IncomeReportKeuanganList,
})

export default connect(mapStateToProps, { Load_IncomeReport_Keuangan_List })(KeuanganBulanan)