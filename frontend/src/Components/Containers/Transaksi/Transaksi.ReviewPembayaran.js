import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Transaksi_Transaksi } from '../../../Store/Actions/Transaksi.Actions'

import { Short_Column_INT, Short_Column_STR } from '../Shorting'
import MoneyFormater from '../MoneyFormater'

import { Table, TableHead, TableRow, TableCell, TableBody, TextField, Button, Typography, FormHelperText } from '@material-ui/core'

import { withTheme } from '@material-ui/core/styles'
import { MUI_FullWidth, MUI_VerticalMargin } from '../../../MUI_theme'

import { DataTidakDitemukan } from '../Page404'

class ReviewPembayaran extends React.Component {
    state = {
        Transaksi: this.props.Transaksi.Transaksi,
        Diskon: 0,
        PotonganHarga: 0,
        Ket: '',
        UangBayar: '',
    }
    Form_OnSubmit = E => {
        E.preventDefault()
        const { User } = this.props
        const Data = this.state.Transaksi
        const Ket = this.state.Ket
        const Diskon = this.state.Diskon
        const PotonganHarga = this.state.PotonganHarga
        const authdata = {
            UserName: User.UserName,
            isKasir: User.isKasir,
            isAdmin: User.isAdmin,
            isSuperUser: User.isSuperUser,
        }
        this.props.Transaksi_Transaksi(Data, Diskon, PotonganHarga, Ket, authdata)
    }
    Form_OnChange = E => {
        this.setState({ [E.target.name]: E.target.value })
    }
    CheckBox_OnChange = E => {
        this.setState({ [E.target.name]: !this.state[E.target.name] })
    }
    ButtonShortSTR(ColumnNumb) {
        Short_Column_STR('tabel_review_pembayaran', ColumnNumb)
    }
    ButtonShortINT(ColumnNumb) {
        Short_Column_INT('tabel_review_pembayaran', ColumnNumb)
    }
    ConverNumberToMoneyFormat(OriginValue) {
        const MoneyFormate = MoneyFormater(OriginValue ? OriginValue : 0)
        return MoneyFormate
    }
    render() {
        const theme = this.props.theme
        const st_tablehead = { ...theme.customTheme.tablehead }
        const st_button = { ...MUI_FullWidth, ...MUI_VerticalMargin }
        const Data = this.state.Transaksi
        const {
            Diskon,
            PotonganHarga,
            Ket,
            UangBayar,
        } = this.state
        const TotalPembayaran = Data.reduce((prev, cur) => {
            return prev + cur.HargaTotal
        }, 0)
        let TotalTagihan = TotalPembayaran ? TotalPembayaran : 0
        if ((Diskon >= 1) && (Diskon <= 100)) {
            TotalTagihan = TotalTagihan - ((TotalTagihan * Diskon) / 100)
            if ((PotonganHarga >= 0) && (PotonganHarga <= TotalTagihan)) {
                TotalTagihan = TotalTagihan - PotonganHarga
            }
        } else {
            if ((PotonganHarga >= 0) && (PotonganHarga <= TotalTagihan)) {
                TotalTagihan = TotalTagihan - PotonganHarga
            }
        }
        return (
            <Fragment>
                {Data ? (
                    <Fragment>
                        <Table id='tabel_review_pembayaran'>
                            <TableHead style={st_tablehead}>
                                <TableRow>
                                    <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(0)}>No</TableCell>
                                    <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortINT(1)}>Barcode</TableCell>
                                    <TableCell style={{ width: '45%' }} align="center" onClick={() => this.ButtonShortSTR(2)}>Nama Barang</TableCell>
                                    <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(3)}>Satuan</TableCell>
                                    <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(4)}>Jumlah</TableCell>
                                    <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(5)}>Harga Satuan&nbsp;(Rp)</TableCell>
                                    <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(6)}>Total Barang</TableCell>
                                    <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(7)}>Harga Total&nbsp;(Rp)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Data.map((item, index) => (
                                    <TableRow hover key={index + 1}
                                    // style={(item.HargaModal === 0 || item.HargaJual === 0) ? { backgroundColor: 'red' } :
                                    //     (item.HargaModal >= item.HargaJual) ? { backgroundColor: 'yellow' }
                                    //         : null}
                                    >
                                        <TableCell align="center" >{index + 1}</TableCell>
                                        <TableCell align="left" >{item.Barcode}</TableCell>
                                        <TableCell align="left" >{item.NamaBarang}</TableCell>
                                        <TableCell align="center" >{item.Satuan}</TableCell>
                                        <TableCell align="right" >{item.Jumlah}</TableCell>
                                        <TableCell align="right" >{this.ConverNumberToMoneyFormat(item.HargaSatuan)}</TableCell>
                                        <TableCell align="right" >{item.TotalBarang}</TableCell>
                                        <TableCell align="right" >{this.ConverNumberToMoneyFormat(item.HargaTotal)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="left">total:</TableCell>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="right">{this.ConverNumberToMoneyFormat(TotalPembayaran)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <form onSubmit={this.Form_OnSubmit}>
                            <TextField style={st_button} variant='outlined' onChange={this.Form_OnChange} type='text' label='Keterangan' name='Ket' value={Ket} />
                            <TextField style={st_button} variant='outlined' onChange={this.Form_OnChange} type='number' label='Diskon' name='Diskon' value={Diskon} />
                            <FormHelperText>1%-100%</FormHelperText>
                            <TextField style={st_button} variant='outlined' onChange={this.Form_OnChange} type='number' label='Potongan Harga' name='PotonganHarga' value={PotonganHarga} />
                            <FormHelperText>dalam bentuk Rp</FormHelperText>
                            <FormHelperText>Tidak bisa lebih besar dari Jumlah Tagihan</FormHelperText>
                            <FormHelperText>PotonganHarga dilakukan setelah diskon</FormHelperText>
                            <hr />
                            <label>Jumlah Tagihan:</label>
                            <Typography align='center' variant='h2'>Total: Rp {this.ConverNumberToMoneyFormat(TotalTagihan)}</Typography>
                            <TextField style={st_button} variant='outlined' color='primary' onChange={this.Form_OnChange} type='number' label='Uang Bayar' name='UangBayar' value={UangBayar} />
                            <label>kembalian:</label>
                            <Typography align='center' variant='h3'>Rp {this.ConverNumberToMoneyFormat(UangBayar ? UangBayar - TotalTagihan : 0)}</Typography>
                            <Button type='submit' style={st_button} size="large" variant='contained' color='primary'
                                disabled={(
                                    (UangBayar >= TotalTagihan) &&
                                    ((Diskon >= 0) && (Diskon <= 100)) &&
                                    ((PotonganHarga >= 0) && (PotonganHarga <= (((Diskon >= 0) && (Diskon <= 100)) ? (TotalPembayaran - ((TotalPembayaran * Diskon) / 100)) : TotalPembayaran)))
                                ) ? false : true}
                            >
                                Bayar
                                </Button>
                        </form>
                    </Fragment>
                ) : <DataTidakDitemukan />
                }
            </Fragment >
        )
    }
}

const mapStateToProps = (state) => ({
    User: state.Auth.User,
    Transaksi: state.Transaksi,
})

export default connect(mapStateToProps, { Transaksi_Transaksi })(withTheme(ReviewPembayaran))