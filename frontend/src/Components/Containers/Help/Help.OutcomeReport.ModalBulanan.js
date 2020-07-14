import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Load_OutcomeReport_Modal_List } from '../../../Store/Actions/Help.Actions'

import { Short_Column_INT, Short_Column_STR } from '../Shorting'

import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

import { MUI_HorizontalMargin, MUI_VerticalMargin } from '../../../MUI_theme'

import { DataTidakDitemukan } from '../Page404'
import MoneyFormater from '../MoneyFormater'
import Charting from '../Charting'

class ModalBulanan extends React.Component {
    componentDidMount() {
        this.props.Load_OutcomeReport_Modal_List()
    }
    ButtonShortSTR(ColumnNumb) {
        Short_Column_STR('table_outcomereport_modalbulanan', ColumnNumb)
    }
    ButtonShortINT(ColumnNumb) {
        Short_Column_INT('table_outcomereport_modalbulanan', ColumnNumb)
    }
    ConverNumberToMoneyFormat(OriginValue) {
        const MoneyFormate = MoneyFormater(OriginValue ? OriginValue : 0)
        return MoneyFormate
    }
    render() {
        ////// data
        const data = this.props.OutcomeReportModalList
        ////// sumdata
        const TotalTotalModal = data.reduce((prev, cur) => {
            return prev + cur.ModalHarian
        }, 0)
        ////// graphdata
        const graphlabels = data.map((item) => item.Tanggal)
        const graphdatasetsdata = data.map((item) => item.ModalHarian)

        return (
            <Fragment>
                {
                    (data && data.length > 0) ? (
                        <Fragment>
                            <Table id='table_outcomereport_modalbulanan'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(0)}>No</TableCell>
                                        <TableCell style={{ width: '70%' }} align="center" onClick={() => this.ButtonShortSTR(1)}>Tanggal</TableCell>
                                        <TableCell style={{ width: '25%' }} align="center" onClick={() => this.ButtonShortSTR(2)}>Total Belanja Modal&nbsp;(Rp)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((item, index) => (
                                        <TableRow hover key={index}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="left">{item.Tanggal}</TableCell>
                                            <TableCell align="right">{this.ConverNumberToMoneyFormat(item.ModalHarian)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Table>
                                <TableHead>
                                    <TableRow >
                                        <TableCell style={{ width: '5%' }} align="left" >Total:</TableCell>
                                        <TableCell style={{ width: '70%' }} align="center" ></TableCell>
                                        <TableCell style={{ width: '25%' }} align="right" >{this.ConverNumberToMoneyFormat(TotalTotalModal)}</TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>

                            <Charting
                                canvasstyle={{ ...MUI_HorizontalMargin, ...MUI_VerticalMargin, width: '800px', height: '300px', padding: '10px' }}
                                type='bar'
                                labels={graphlabels}
                                datasetslabel='Grafik Pembelanjaan Modal perHari'
                                datasetsdata={graphdatasetsdata}
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
    OutcomeReportModalList: state.Help.OutcomeReportModalList,
})

export default connect(mapStateToProps, { Load_OutcomeReport_Modal_List })(ModalBulanan)