import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { get_BarangDetail } from '../../../Store/Actions/Barang.Actions'

import { Short_Column_INT, Short_Column_STR, Short_Column_Money } from '../Shorting'
import { ConvertInttoMoney } from '../Formater'

import { TextField, Typography, Table, TableHead, TableBody, TableRow, TableCell, } from '@material-ui/core'

import { withTheme } from '@material-ui/core/styles'
import { MUI_FullWidth, MUI_VerticalMargin, MUI_st_AccountDetail_Avatar } from '../../../MUI_theme'

import { DataTidakDitemukan } from '../Page404'
// import MoneyFormater from '../MoneyFormater'

class BarangDetail extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.idDetailBarang !== prevProps.idDetailBarang) {
            console.log('prevProps')
            const { idDetailBarang } = this.props
            this.props.get_BarangDetail(idDetailBarang)
        }
    }
    componentDidMount() {
        const { idDetailBarang } = this.props
        if (idDetailBarang !== null) {
            this.props.get_BarangDetail(idDetailBarang)
        }
    }
    ButtonShortSTR(ColumnNumb) {
        Short_Column_STR('tabel_barang_detail', ColumnNumb)
    }
    ButtonShortINT(ColumnNumb) {
        Short_Column_INT('tabel_barang_detail', ColumnNumb)
    }
    ButtonShortMoney(ColumnNumb) {
        Short_Column_Money('tabel_barang_detail', ColumnNumb)
    }
    ConverNumberToMoneyFormat(OriginValue) {
        const MoneyFormate = ConvertInttoMoney(OriginValue ? OriginValue : 0)
        return MoneyFormate
    }
    render() {
        const theme = this.props.theme
        const BarangDetail = this.props.BarangDetail
        const DefaultUrl = this.props.WebSite ? `http://${this.props.WebSite}` : `http://${this.props.IpAddres ? this.props.IpAddres : '127.0.0.1'}:${this.props.Port ? this.props.Port : '5000'}`

        const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth, ...theme.customTheme.readonlytextfield }
        return (
            <Fragment>
                {BarangDetail ?
                    <Fragment>
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='id' name='_id' value={BarangDetail._id} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Barcode' name='Barcode' value={BarangDetail.Barcode} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Nama' name='Name' value={BarangDetail.Name} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Jenis' name='Jenis' value={BarangDetail.Jenis} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Stok' name='Stok' value={BarangDetail.Stok} />
                        <label>Apakah Bisa Melakukan Transaksi Satuan Desimal?</label><br />
                        <div className='switch'>
                            <input type="checkbox" disabled name='isDecimal' checked={BarangDetail.isDecimal} /><span></span><br />
                        </div><br />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Modal' name='HargaModal' value={BarangDetail.HargaModal} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Harga Jual' name='HargaJual' value={BarangDetail.HargaJual} />
                        {BarangDetail.SatuanJual.length >= 1 ?
                            <Fragment>
                                <hr />
                                <Table id='tabel_barang_detail'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(0)}>No</TableCell>
                                            <TableCell style={{ width: '70%' }} align="center" onClick={() => this.ButtonShortSTR(1)}>Nama Satuan</TableCell>
                                            <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(2)}>Jumlah Beli Minimum</TableCell>
                                            <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortMoney(3)}>Harga Jual Satuan&nbsp;(Rp)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {BarangDetail.SatuanJual.map((item, index) => (
                                            <TableRow hover={true} key={index}>
                                                <TableCell align="center">{index + 1}</TableCell>
                                                <TableCell align="left">{item.NamaSatuan} </TableCell>
                                                <TableCell align="center">{item.MinBarang} </TableCell>
                                                <TableCell align="right">{this.ConverNumberToMoneyFormat(item.HargaJual)} </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <hr />
                            </Fragment>
                            : null}
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Keterangan' name='Ket' value={BarangDetail.Ket ? BarangDetail.Ket : ''} />
                        <label>Foto Barang:</label>
                        <Typography align={"center"}>
                            <img src={BarangDetail.BarangPic ? `${DefaultUrl}/${BarangDetail.BarangPic}` : null} style={{ ...MUI_st_AccountDetail_Avatar, border: '2px solid black' }} alt={`logo barang ${BarangDetail.Name}`} />
                        </Typography>
                    </Fragment>
                    : <DataTidakDitemukan />
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    User: state.Auth.User,
    idDetailBarang: state.Barang.idDetailBarang,
    BarangDetail: state.Barang.BarangDetail,
    IpAddres: state.Auth.IpAddres,
    Port: state.Auth.Port,
    WebSite: state.Auth.WebSite,
})

export default connect(mapStateToProps, { get_BarangDetail })(withTheme(BarangDetail))