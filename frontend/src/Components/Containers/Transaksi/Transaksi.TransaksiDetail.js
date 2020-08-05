import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { get_TransaksiDetail } from '../../../Store/Actions/Transaksi.Actions'

import { Short_Column_INT, Short_Column_STR, Short_Column_Money } from '../Shorting'
import { ConvertInttoMoney } from '../Formater'

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
    ButtonShortMoney(ColumnNumb) {
        Short_Column_Money('tabel_detail_transaksi', ColumnNumb)
    }
    ConverNumberToMoneyFormat(OriginValue) {
        const MoneyFormate = ConvertInttoMoney(OriginValue ? OriginValue : 0)
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
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Tanggal Transaksi' name='TanggalTransaksi' value={Data.TanggalTransaksi ? new Date(Data.TanggalTransaksi).toLocaleString() : ''} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Tipe Transaksi' name='Tipe' value={Data.Tipe ? Data.Tipe : ''} />
                        <hr />
                        {Data.DetailTransaksi ? (
                            <Table id='tabel_detail_transaksi'>
                                {Data.Tipe === 'Belanja' ? (
                                    <TableHead >
                                        <TableRow>
                                            <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(0)}>No</TableCell>
                                            <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(1)}>Barcode</TableCell>
                                            <TableCell style={{ width: '50%' }} align="center" onClick={() => this.ButtonShortSTR(2)}>Nama Barang</TableCell>
                                            <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(3)}>Jumlah</TableCell>
                                            <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortMoney(4)}>Harga Modal&nbsp;(Rp)</TableCell>
                                            <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortMoney(5)}>Harga Jual&nbsp;(Rp)</TableCell>
                                            <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortMoney(6)}>Total Modal&nbsp;(Rp)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                ) : (
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(0)}>No</TableCell>
                                                <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(1)}>Barcode</TableCell>
                                                <TableCell style={{ width: '45%' }} align="center" onClick={() => this.ButtonShortSTR(2)}>Nama Barang</TableCell>
                                                <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(3)}>Satuan</TableCell>
                                                <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(4)}>Jumlah</TableCell>
                                                <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortMoney(5)}>Harga Satuan&nbsp;(Rp)</TableCell>
                                                <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(6)}>Total Barang</TableCell>
                                                <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortMoney(7)}>HargaTotal&nbsp;(Rp)</TableCell>
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
                                                <TableCell align="right" >{item.Jumlah}</TableCell>
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
                                                    <TableCell align="right" >{item.Satuan}</TableCell>
                                                    <TableCell align="right" >{item.Jumlah}</TableCell>
                                                    <TableCell align="right" >{this.ConverNumberToMoneyFormat(item.HargaSatuan)}</TableCell>
                                                    <TableCell align="right" >{item.TotalBarang}</TableCell>
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
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Diskon' name='Diskon' value={Data.Diskon ? Data.Diskon : 0} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='PotonganHarga' name='PotonganHarga' value={Data.PotonganHarga ? Data.PotonganHarga : 0} />
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