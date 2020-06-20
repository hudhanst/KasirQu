import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { get_BarangDetail } from '../../../Store/Actions/Barang.Actions'

import { TextField, Typography } from '@material-ui/core'

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
    // ConverNumberToMoneyFormat(OriginValue) {
    //     const MoneyFormate = MoneyFormater(OriginValue ? OriginValue : 0)
    //     return MoneyFormate
    // }
    render() {
        const theme = this.props.theme
        const BarangDetail = this.props.BarangDetail

        const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth, ...theme.customTheme.readonlytextfield }
        return (
            <Fragment>
                {BarangDetail ?
                    <Fragment>
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Barcode' name='Barcode' value={BarangDetail.Barcode} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Nama' name='Name' value={BarangDetail.Name} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Jenis' name='Jenis' value={BarangDetail.Jenis} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Stok' name='Stok' value={BarangDetail.Stok} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Modal' name='HargaModal' value={BarangDetail.HargaModal} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Harga Jual' name='HargaJual' value={BarangDetail.HargaJual} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Keterangan' name='Ket' value={BarangDetail.Ket} />
                        <label>Foto Barang:</label>
                        <Typography align={"center"}>
                            <img src={BarangDetail.BarangPic ? `http://127.0.0.1:5000/${BarangDetail.BarangPic}` : null} style={{ ...MUI_st_AccountDetail_Avatar, border: '2px solid black' }} alt={`logo barang ${BarangDetail.Name}`} />
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
})

export default connect(mapStateToProps, { get_BarangDetail })(withTheme(BarangDetail))