import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Transaksi_Belanja } from '../../../Store/Actions/Transaksi.Actions'

import { Short_Column_INT, Short_Column_STR } from '../Shorting'
import MoneyFormater from '../MoneyFormater'

import { Table, TableHead, TableRow, TableCell, TableBody, FormGroup, FormControlLabel, TextField, Checkbox, Button } from '@material-ui/core'

import { withTheme } from '@material-ui/core/styles'
import { MUI_FullWidth, MUI_VerticalMargin } from '../../../MUI_theme'

import { DataTidakDitemukan } from '../Page404'

class ReviewBelanja extends React.Component {
    state = {
        Belanja: this.props.Belanja.Belanja,
        Ket: '',
        Confirm: false,
    }
    Form_OnSubmit = E => {
        E.preventDefault()
        const { User } = this.props
        const Data = this.state.Belanja
        const Ket = this.state.Ket
        const authdata = {
            UserName: User.UserName,
            isKasir: User.isKasir,
            isAdmin: User.isAdmin,
            isSuperUser: User.isSuperUser,
        }
        this.props.Transaksi_Belanja(Data, Ket, authdata)
    }
    Form_OnChange = E => {
        this.setState({ [E.target.name]: E.target.value })
    }
    CheckBox_OnChange = E => {
        this.setState({ [E.target.name]: !this.state[E.target.name] })
    }
    ButtonShortSTR(ColumnNumb) {
        Short_Column_STR('tabel_review_belanja', ColumnNumb)
    }
    ButtonShortINT(ColumnNumb) {
        Short_Column_INT('tabel_review_belanja', ColumnNumb)
    }
    ConverNumberToMoneyFormat(OriginValue) {
        const MoneyFormate = MoneyFormater(OriginValue ? OriginValue : 0)
        return MoneyFormate
    }
    render() {
        const theme = this.props.theme
        const st_tablehead = { ...theme.customTheme.tablehead }
        const st_button = { ...MUI_FullWidth, ...MUI_VerticalMargin }
        const Data = this.state.Belanja
        const {
            Ket,
            Confirm,
        } = this.state
        return (
            <Fragment>
                {Data ? (
                    <Fragment>
                        <Table id='tabel_review_belanja'>
                            <TableHead style={st_tablehead}>
                                <TableRow>
                                    <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(0)}>No</TableCell>
                                    <TableCell style={{ width: '10%' }} align="left" onClick={() => this.ButtonShortINT(1)}>Barcode</TableCell>
                                    <TableCell style={{ width: '50%' }} align="left" onClick={() => this.ButtonShortSTR(2)}>Nama Barang</TableCell>
                                    <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(3)}>Jumlah</TableCell>
                                    <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(4)}>Harga Modal&nbsp;(Rp)</TableCell>
                                    <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(5)}>Harga Jual&nbsp;(Rp)</TableCell>
                                    <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(6)}>Total Modal&nbsp;(Rp)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Data.map((item, index) => (
                                    <TableRow hover key={index + 1} style={(item.HargaModal === 0 || item.HargaJual === 0) ? { backgroundColor: 'red' } :
                                        (item.HargaModal >= item.HargaJual) ? { backgroundColor: 'yellow' }
                                            : null}
                                    >
                                        <TableCell align="center" >{index + 1}</TableCell>
                                        <TableCell align="left" >{item.Barcode}</TableCell>
                                        <TableCell align="left" >{item.NamaBarang}</TableCell>
                                        <TableCell align="center" >{item.Jumlah}</TableCell>
                                        <TableCell align="right" >{this.ConverNumberToMoneyFormat(item.HargaModal)}</TableCell>
                                        <TableCell align="right" >{this.ConverNumberToMoneyFormat(item.HargaJual)}</TableCell>
                                        <TableCell align="right" >{this.ConverNumberToMoneyFormat(item.TotalModal)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <form onSubmit={this.Form_OnSubmit}>
                            <TextField style={st_button} variant='outlined' onChange={this.Form_OnChange} type='text' label='Keterangan' name='Ket' value={Ket} />
                            <FormGroup row>
                                <FormControlLabel
                                    control={<Checkbox color='primary' onChange={this.CheckBox_OnChange} name="Confirm" value={Confirm} />}
                                    label="Saya Sudah Yakin Tidak Ada yang Salah Pada Data diatas"
                                />
                            </FormGroup>
                            <Button type='submit' style={st_button} size="large" variant='contained' color='primary' disabled={(Confirm === false) ? true : false} >Masukkan Ke DataBase</Button>
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
    Belanja: state.Transaksi,
})

export default connect(mapStateToProps, { Transaksi_Belanja })(withTheme(ReviewBelanja))