import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Change_Transaksi_Item_Jumlah, Clear_A_Barang_From_Transaksi, Clear_Barang_In_Transaksi } from '../../../Store/Actions/Transaksi.Actions'

import { Short_Column_INT, Short_Column_STR } from '../Shorting'
import MoneyFormater from '../MoneyFormater'

import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, TextField } from '@material-ui/core'
import { withTheme } from '@material-ui/core/styles'

import EditIcon from "@material-ui/icons/EditOutlined"
import DoneIcon from "@material-ui/icons/DoneAllTwoTone"
import RevertIcon from "@material-ui/icons/NotInterestedOutlined"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

class TransaksiTransaksi extends React.Component {
    state = {
        Transaksi: this.props.Transaksi.Transaksi,
        TotalHarga: [],
        isEditingOn: false,
        EditingValue: '',
    }
    componentDidUpdate(prevProps) {
        if (this.props.Transaksi !== prevProps.Transaksi) {
            this.setState({ TotalHarga: [] })
        }
    }

    EditRow(Index) {
        if (this.state.isEditingOn === false) {
            let transaksis = [...this.state.Transaksi]
            let transaksi = { ...transaksis[Index] }
            transaksi.isEditAble = true
            transaksis[Index] = transaksi
            this.setState({ Transaksi: transaksis })
            this.setState({ EditingValue: transaksi.Jumlah })
            this.setState({ isEditingOn: true })
        }
    }
    onEditChange = e => this.setState({ EditingValue: e.target.value })
    EditingDone(index, hargasatuan) {
        const jumlah = this.state.EditingValue
        this.props.Change_Transaksi_Item_Jumlah(index, jumlah, hargasatuan)
        this.setState({ Transaksi: this.props.Transaksi.Transaksi })
        this.setState({ EditingValue: '' })
        this.setState({ isEditingOn: false })
    }
    Editingcancel() {
        this.setState({ Transaksi: this.props.Transaksi.Transaksi })
        this.setState({ EditingValue: '' })
        this.setState({ isEditingOn: false })
    }
    CancelBarang(Barcode) {
        this.props.Clear_A_Barang_From_Transaksi(Barcode)
    }
    CancelAllBarang() {
        this.props.Clear_Barang_In_Transaksi()
    }
    ButtonShortSTR(ColumnNumb) {
        Short_Column_STR('tabel_transaksi', ColumnNumb)
    }
    ButtonShortINT(ColumnNumb) {
        Short_Column_INT('tabel_transaksi', ColumnNumb)
    }
    ConverNumberToMoneyFormat(OriginValue = 0) {
        const MoneyFormate = MoneyFormater(OriginValue)
        return MoneyFormate
    }
    SUMHargaTotal(HargaTotal) {
        this.state.TotalHarga.push(HargaTotal)
    }
    render() {
        // console.log(this.props)
        // console.log(this.state)
        const theme = this.props.theme
        const st_tablehead = {
            ...theme.customTheme.tablehead,
        }
        const TransaksiData = this.state.Transaksi
        return (
            <Fragment>
                <Table id='tabel_transaksi'>
                    <TableHead style={st_tablehead}>
                        <TableRow>
                            <TableCell style={{ width: '10%' }} align="center"  >Edit</TableCell>
                            <TableCell style={{ width: '5%' }} align="center" onClick={() => this.CancelAllBarang()} >Cancel</TableCell>
                            <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(2)}>No</TableCell>
                            <TableCell style={{ width: '10%' }} align="left" onClick={() => this.ButtonShortINT(3)}>Barcode</TableCell>
                            <TableCell style={{ width: '30%' }} align="left" onClick={() => this.ButtonShortSTR(4)}>Nama Barang</TableCell>
                            <TableCell style={{ width: '10%' }} align="left" onClick={() => this.ButtonShortINT(5)}>Jumlah</TableCell>
                            <TableCell style={{ width: '15%' }} align="right" onClick={() => this.ButtonShortSTR(6)}>Harga Satuan&nbsp;(Rp)</TableCell>
                            <TableCell style={{ width: '15%' }} align="right" onClick={() => this.ButtonShortSTR(7)}>Harga Total&nbsp;(Rp)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {TransaksiData.map((item, index) => (
                            <TableRow key={index + 1}
                                hover={true}
                            // style={index % 2 === 1 ? st_tablehead : null}
                            >
                                <TableCell align="center" >
                                    {item.isEditAble ?
                                        <Fragment>
                                            <IconButton onClick={() => this.EditingDone(index, item.HargaSatuan)}>
                                                <DoneIcon />
                                            </IconButton>
                                            <IconButton onClick={() => this.Editingcancel()}>
                                                <RevertIcon />
                                            </IconButton>
                                        </Fragment>
                                        :
                                        <Fragment>
                                            <IconButton onClick={() => this.EditRow(index)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Fragment>
                                    }
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => this.CancelBarang(index)}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="left">{item.Barcode}</TableCell>
                                <TableCell align="left">{item.NamaBarang}</TableCell>
                                <TableCell align="left">
                                    {item.isEditAble ?
                                        <TextField
                                            onChange={this.onEditChange}
                                            value={this.state.EditingValue}
                                        >
                                        </TextField>
                                        : item.Jumlah
                                    }
                                </TableCell>
                                <TableCell align="right">{this.ConverNumberToMoneyFormat(item.HargaSatuan)}</TableCell>
                                <TableCell align="right">{this.ConverNumberToMoneyFormat(item.HargaTotal)}</TableCell>
                                {this.SUMHargaTotal(item.HargaTotal)}
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
                {TransaksiData.length ?
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell align="left">total:</TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right">{this.ConverNumberToMoneyFormat(this.state.TotalHarga.reduce((a, b) => a + b, 0))}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    : null
                }
                {/* <button onClick={() => console.log(this.props)} style={{ width: '100%' }}>props</button> */}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    User: state.Auth.User,
    Transaksi: state.Transaksi,
})

export default connect(mapStateToProps, { Change_Transaksi_Item_Jumlah, Clear_A_Barang_From_Transaksi, Clear_Barang_In_Transaksi })(withTheme(TransaksiTransaksi))