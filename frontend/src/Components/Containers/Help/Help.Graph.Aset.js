import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Load_Graph_Aset_List } from '../../../Store/Actions/Help.Actions'
import { get_BarangId_Detail } from '../../../Store/Actions/Barang.Actions'

import { Short_Column_INT, Short_Column_STR, Short_Column_Money } from '../Shorting'

import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

import { MUI_HorizontalMargin, MUI_VerticalMargin } from '../../../MUI_theme'

import { DataTidakDitemukan } from '../Page404'
import { ConvertInttoMoney } from '../Formater'
import GenericModals from '../GenericModals'
import BarangDetail from '../Barang/Barang.BarangDetail'
import Charting from '../Charting'

class AsetGraph extends React.Component {
    componentDidMount() {
        this.props.Load_Graph_Aset_List()
    }
    ButtonShortSTR(ColumnNumb) {
        Short_Column_STR('table_graph_aset', ColumnNumb)
    }
    ButtonShortINT(ColumnNumb) {
        Short_Column_INT('table_graph_aset', ColumnNumb)
    }
    ButtonShortMoney(ColumnNumb) {
        Short_Column_Money('table_graph_aset', ColumnNumb)
    }
    ConverNumberToMoneyFormat(OriginValue) {
        const MoneyFormate = ConvertInttoMoney(OriginValue ? OriginValue : 0)
        return MoneyFormate
    }
    onClick_get_BarangId_Detail(BarangID) {
        this.props.get_BarangId_Detail(BarangID)
    }
    render() {
        ////// data
        const data = this.props.GraphAsetList
        ////// sumdata
        const TotalStok = data.reduce((prev, cur) => {
            return prev + cur.Stok
        }, 0)
        const TotalModal = data.reduce((prev, cur) => {
            return prev + (cur.HargaModal * cur.Stok)
        }, 0)
        ////// graphdata
        const graphlabels = data.map((item) => item.Barcode)
        const graphdatasetsdata = data.map((item) => (item.Stok * item.HargaModal))

        return (
            <Fragment>
                {
                    (data && data.length > 0) ? (
                        <Fragment>
                            <Charting
                                canvasstyle={{ ...MUI_HorizontalMargin, ...MUI_VerticalMargin, width: '800px', height: '300px', padding: '10px' }}
                                type='pie'
                                labels={graphlabels}
                                datasetslabel='Grafik Jumlah Keuntungan perHari'
                                datasetsdata={graphdatasetsdata}
                            />

                            <Table id='table_graph_aset'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(0)}>No</TableCell>
                                        <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortSTR(1)}>Barcode</TableCell>
                                        <TableCell style={{ width: '50%' }} align="center" onClick={() => this.ButtonShortSTR(2)}>Name</TableCell>
                                        <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortSTR(3)}>Jenis</TableCell>
                                        <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(4)}>Stok</TableCell>
                                        <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortMoney(5)}>Modal&nbsp;(Rp)</TableCell>
                                        <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortMoney(6)}>Total Modal&nbsp;(Rp)</TableCell>
                                        <TableCell style={{ width: '10%' }} align="center" >Detail</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((item, index) => (
                                        <TableRow hover key={index}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="left">{item.Barcode}</TableCell>
                                            <TableCell align="left">{item.Name}</TableCell>
                                            <TableCell align="center">{item.Jenis}</TableCell>
                                            <TableCell align="right">{item.Stok}</TableCell>
                                            <TableCell align="right">{this.ConverNumberToMoneyFormat(item.HargaModal)}</TableCell>
                                            <TableCell align="right">{this.ConverNumberToMoneyFormat((item.HargaModal * item.Stok))}</TableCell>
                                            <TableCell align="center">
                                                <GenericModals
                                                    size='s'
                                                    header='Jenis Barang Detail'
                                                    body={<BarangDetail />}
                                                    Buttoncolor='primary'
                                                    ButtononClickeven={() => this.onClick_get_BarangId_Detail(item._id)}
                                                    Buttonlabel={'Detail'}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Table>
                                <TableHead>
                                    <TableRow >
                                        <TableCell style={{ width: '5%' }} align="center" >Total:</TableCell>
                                        <TableCell style={{ width: '5%' }} align="center" ></TableCell>
                                        <TableCell style={{ width: '50%' }} align="center" ></TableCell>
                                        <TableCell style={{ width: '5%' }} align="center" ></TableCell>
                                        <TableCell style={{ width: '5%' }} align="right" >{TotalStok}</TableCell>
                                        <TableCell style={{ width: '10%' }} align="right" ></TableCell>
                                        <TableCell style={{ width: '10%' }} align="right" >{this.ConverNumberToMoneyFormat(TotalModal)}</TableCell>
                                        <TableCell style={{ width: '10%' }} align="center" ></TableCell>
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
    GraphAsetList: state.Help.GraphAsetList,
})

export default connect(mapStateToProps, { Load_Graph_Aset_List, get_BarangId_Detail })(AsetGraph)