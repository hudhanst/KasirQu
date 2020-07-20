import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { get_BarangId_Detail, Export_Barang } from '../../../Store/Actions/Barang.Actions'

import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@material-ui/core'
import { MUI_VerticalMargin, MUI_FullWidth } from '../../../MUI_theme'

import { Short_Column_INT, Short_Column_STR } from '../Shorting'

import { DataTidakDitemukan } from '../Page404'
import MoneyFormater from '../MoneyFormater'
import GenericModals from '../GenericModals'
import BarangDetail from './Barang.BarangDetail'

class BarangExport extends React.Component {
    state = {
        ExportBarangList: []
    }
    componentDidUpdate(prevProps) {
        if (this.props.ExportBarangList !== prevProps.ExportBarangList) {
            const { ExportBarangList } = this.props
            this.setState({ ExportBarangList: ExportBarangList })
        }
    }
    ButtonShortSTR(ColumnNumb) {
        Short_Column_STR('tabel_export_barang', ColumnNumb)
    }
    ButtonShortINT(ColumnNumb) {
        Short_Column_INT('tabel_export_barang', ColumnNumb)
    }
    ConverNumberToMoneyFormat(OriginValue) {
        const MoneyFormate = MoneyFormater(OriginValue ? OriginValue : 0)
        return MoneyFormate
    }
    onClick_get_BarangId_Detail(BarangID) {
        this.props.get_BarangId_Detail(BarangID)
    }
    Form_OnSubmit = E => {
        E.preventDefault()
        const ExportBarangList = this.state.ExportBarangList
        const { User } = this.props
        const authdata = {
            isKasir: User.isKasir,
            isAdmin: User.isAdmin,
            isSuperUser: User.isSuperUser,
        }

        this.props.Export_Barang(ExportBarangList, authdata)
    }
    render() {
        const {
            ExportBarangList,
        } = this.state
        const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth }
        const data = ExportBarangList
        return (
            <Fragment>
                {(data && data.length > 0) ?
                    <Fragment>
                        <Table id='tabel_export_barang'>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(0)}>No</TableCell>
                                    <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortINT(1)}>Barcode</TableCell>
                                    <TableCell style={{ width: '45%' }} align="center" onClick={() => this.ButtonShortSTR(2)}>Nama Barang</TableCell>
                                    <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(3)}>Jenis Barang</TableCell>
                                    <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(4)}>Stok Barang</TableCell>
                                    <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(5)}>Harga Jual&nbsp;(Rp)</TableCell>
                                    <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(6)}>Modal&nbsp;(Rp)</TableCell>
                                    <TableCell style={{ width: '5%' }} align='center'>Detail</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item, index) => (
                                    <TableRow hover key={index + 1}>
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell align="left">{item.Barcode}</TableCell>
                                        <TableCell align="left">{item.Name}</TableCell>
                                        <TableCell align="left">{item.Jenis}</TableCell>
                                        <TableCell align="right">{item.Stok}</TableCell>
                                        <TableCell align="right">{this.ConverNumberToMoneyFormat(item.HargaJual)}</TableCell>
                                        <TableCell align="right">{this.ConverNumberToMoneyFormat(item.HargaModal)}</TableCell>
                                        <TableCell align='center'>
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
                        <form onSubmit={this.Form_OnSubmit}>
                            <Button type='submit' style={st_textfield} size="large" variant='contained' color='primary' >Export</Button>
                        </form>
                    </Fragment>
                    :
                    <DataTidakDitemukan />
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    User: state.Auth.User,
    ExportBarangList: state.Barang.ExportBarangList,
})

export default connect(mapStateToProps, { get_BarangId_Detail, Export_Barang })(BarangExport)