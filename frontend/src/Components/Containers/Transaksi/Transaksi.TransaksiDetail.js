import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { get_TransaksiDetail } from '../../../Store/Actions/Transaksi.Actions'

import { Short_Column_INT, Short_Column_STR } from '../Shorting'
import MoneyFormater from '../MoneyFormater'

import { TextField, Table, TableHead, TableBody, TableRow, TableCell, Typography } from '@material-ui/core'

import { withTheme } from '@material-ui/core/styles'
import { MUI_st_AccountDetail_TextField, MUI_VerticalMargin } from '../../../MUI_theme'

import { DataTidakDitemukan } from '../Page404'

class ListTransaksi extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.idDetailTransaksi !== prevProps.idDetailTransaksi) {
            const { idDetailTransaksi } = this.props
            this.props.get_TransaksiDetail(idDetailTransaksi)
        }
    }
    componentDidMount() {
        const { idDetailTransaksi } = this.props
        if (idDetailTransaksi !== null) {
            this.props.get_TransaksiDetail(idDetailTransaksi)
        }
    }
    ButtonShortSTR(ColumnNumb) {
        Short_Column_STR('tabel_detail_transaksi', ColumnNumb)
    }
    ButtonShortINT(ColumnNumb) {
        Short_Column_INT('tabel_detail_transaksi', ColumnNumb)
    }
    ConverNumberToMoneyFormat(OriginValue) {
        const MoneyFormate = MoneyFormater(OriginValue ? OriginValue : 0)
        return MoneyFormate
    }
    render() {
        const theme = this.props.theme
        const Data = this.props.TransaksiDetail

        const st_textfield = { ...MUI_VerticalMargin, ...MUI_st_AccountDetail_TextField, ...theme.customTheme.readonlytextfield }
        return (
            <Fragment>
                {Data ?
                    <Fragment>
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='ID' name='_id' value={Data._id ? Data._id : ''} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Nama Kasir' name='NamaKasir' value={Data.NamaKasir ? Data.NamaKasir : ''} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Tanggal Transaksi' name='TanggalTransaksi' value={Data.TanggalTransaksi ? Data.TanggalTransaksi : ''} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Tipe Transaksi' name='Tipe' value={Data.Tipe ? Data.Tipe : ''} />
                        {/* <Typography>{Data.DetailTransaksi}</Typography> */}
                        <hr />
                        {Data.DetailTransaksi ? (
                            <Table id='tabel_detail_transaksi'>
                                {Data.Tipe === 'Belanja' ? (
                                    <TableHead >
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
                                ) : (
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(0)}>No</TableCell>
                                                <TableCell style={{ width: '10%' }} align="left" onClick={() => this.ButtonShortINT(1)}>Barcode</TableCell>
                                                <TableCell style={{ width: '50%' }} align="left" onClick={() => this.ButtonShortSTR(2)}>Nama Barang</TableCell>
                                                <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(3)}>Jumlah</TableCell>
                                                <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(4)}>Harga Satuan&nbsp;(Rp)</TableCell>
                                                <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(5)}>HargaTotal&nbsp;(Rp)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                    )}
                                {Data.Tipe === 'Belanja' ? (
                                    <TableBody>
                                        {Data.DetailTransaksi.map((item, index) => (
                                            <TableRow
                                                hover
                                                key={index + 1}
                                                style={(item.HargaModal === 0 || item.HargaJual === 0) ? { backgroundColor: 'red' } :
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
                                )
                                    : (
                                        <TableBody>
                                            {Data.DetailTransaksi.map((item, index) => (
                                                <TableRow hover key={index + 1} >
                                                    <TableCell align="center" >{index + 1}</TableCell>
                                                    <TableCell align="left" >{item.Barcode}</TableCell>
                                                    <TableCell align="left" >{item.NamaBarang}</TableCell>
                                                    <TableCell align="center" >{item.Jumlah}</TableCell>
                                                    <TableCell align="right" >{this.ConverNumberToMoneyFormat(item.HargaSatuan)}</TableCell>
                                                    <TableCell align="right" >{this.ConverNumberToMoneyFormat(item.HargaTotal)}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    )}
                            </Table>
                        )
                            : null
                        }
                        <hr />
                        {Data.Tipe === 'Transaksi' ? (
                            <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Diskon' name='Diskon' value={Data.Diskon ? Data.Diskon : ''} />
                        ) : null}
                        {Data.Tipe === 'Transaksi' ? (
                            <Fragment>
                                <label>Jumlah Pendapatan:</label>
                                <Typography align='center' variant='h2'>Total: +Rp{this.ConverNumberToMoneyFormat(Data.TotalPembayaran ? Data.TotalPembayaran : 0)}</Typography>
                            </Fragment>
                        ) : (
                                <Fragment>
                                    <label>Jumlah Pengeluaran:</label>
                                    <Typography align='center' variant='h2'>Total: -Rp{this.ConverNumberToMoneyFormat(Data.TotalPembayaran ? Data.TotalPembayaran : 0)}</Typography>
                                </Fragment>
                            )}
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Ket' name='Ket' value={Data.Ket ? Data.Ket : ''} />
                    </Fragment>
                    : <DataTidakDitemukan />
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    idDetailTransaksi: state.Transaksi.idDetailTransaksi,
    TransaksiDetail: state.Transaksi.TransaksiDetail,
})

export default connect(mapStateToProps, { get_TransaksiDetail })(withTheme(ListTransaksi))