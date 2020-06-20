import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { get_BarangDetail, Update_Barang } from '../../../Store/Actions/Barang.Actions'
import { Load_JenisBarang_List } from '../../../Store/Actions/JenisBarang.Actions'

import { TextField, FormControl, InputLabel, Select, FormHelperText, Button } from '@material-ui/core'

import { withTheme } from '@material-ui/core/styles'
import { MUI_VerticalMargin, MUI_FullWidth } from '../../../MUI_theme'

import WarningRoundedIcon from '@material-ui/icons/WarningRounded'

import { DataTidakDitemukan } from '../Page404'


////// TODO ADD FORM NAMEING CEK 


class BarangUpdate extends React.Component {
    state = {
        Barcode: '',
        Name: '',
        Jenis: '',
        Stok: '',
        HargaModal: '',
        HargaJual: '',
        Ket: '',
        BarangPic: null,
    }
    componentDidMount() {
        const { idUpdateBarang } = this.props
        if (idUpdateBarang !== null) {
            this.props.get_BarangDetail(idUpdateBarang)
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.idUpdateBarang !== prevProps.idUpdateBarang) {
            const { idUpdateBarang } = this.props
            this.props.get_BarangDetail(idUpdateBarang)
            this.props.Load_JenisBarang_List()
        }
        if (this.props.BarangDetail !== prevProps.BarangDetail) {
            const { BarangDetail } = this.props
            this.props.Load_JenisBarang_List()
            if (BarangDetail) {
                this.setState({
                    Barcode: BarangDetail.Barcode,
                    Name: BarangDetail.Name,
                    Jenis: BarangDetail.Jenis,
                    Stok: BarangDetail.Stok,
                    HargaModal: BarangDetail.HargaModal,
                    HargaJual: BarangDetail.HargaJual,
                    Ket: BarangDetail.Ket,
                })
            }
        }
    }
    Form_OnChange = E => {
        this.setState({ [E.target.name]: E.target.value })
    }
    File_OnChange = E => {
        this.setState({ [E.target.name]: E.target.files[0] })
    }
    Form_OnSubmit = E => {
        E.preventDefault()
        const { User, idUpdateBarang } = this.props
        const updatedata = {
            Barcode: this.state.Barcode,
            Name: this.state.Name,
            Jenis: this.state.Jenis,
            Stok: this.state.Stok,
            HargaModal: this.state.HargaModal,
            HargaJual: this.state.HargaJual,
            Ket: this.state.Ket,
            BarangPic: this.state.BarangPic,
        }
        const authdata = {
            isKasir: User.isKasir,
            isAdmin: User.isAdmin,
            isSuperUser: User.isSuperUser,
        }
        if ((this.state.ChangePassword === true) && ((this.state.Password === '' || this.state.Password === null) || (this.state.Password !== this.state.ConfirmPassword))) {
            E.preventDefault()
        } else {
            this.props.Update_Barang(idUpdateBarang, updatedata, authdata)
        }
    }
    render() {
        // console.log('prop', this.props)
        const theme = this.props.theme
        const User = this.props.User
        const BarangDetail = this.props.BarangDetail
        const options = this.props.JenisBarangList

        const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth }
        const {
            Barcode,
            Name,
            Jenis,
            Stok,
            HargaModal,
            HargaJual,
            Ket,
        } = this.state
        return (
            <Fragment>
                {BarangDetail ?
                    <Fragment>
                        <form onSubmit={this.Form_OnSubmit}>
                            <TextField style={{ ...st_textfield, ...theme.customTheme.readonlytextfield }} variant='outlined' disabled type='text' label='Barcode' name='Barcode' value={Barcode} required />
                            <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='text' label='Name' name='Name' value={Name} required />
                            <FormControl style={st_textfield} variant="filled" required >
                                <InputLabel shrink >Jenis</InputLabel>
                                <Select native onChange={this.Form_OnChange} label="Jenis" name='Jenis' value={Jenis} labelWidth={100} >
                                    <option value="" disabled> -- select an option -- </option>
                                    {options.map((option, index) =>
                                        <option key={index} value={option.NamaJenisBarang}>{option.NamaJenisBarang}</option>
                                    )}
                                </Select>
                            </FormControl>
                            {User.isSuperUser ? (
                                <Fragment>
                                    <TextField style={{ ...st_textfield, ...theme.customTheme.readonlytextfield }} onChange={this.Form_OnChange} variant='outlined' disabled={User.isSuperUser ? false : true} type='number' label='Stok' name='Stok' value={Stok} />
                                    <FormHelperText style={{ color: 'orange' }}> <WarningRoundedIcon fontSize="small" />Sangat Tidak Disarankan, Silakan Update Melalu Menu <a href='/transaksi/belanja'>Belanja</a>. karena tidak akan terdata di report bulanan</FormHelperText>
                                    <TextField style={{ ...st_textfield, ...theme.customTheme.readonlytextfield }} onChange={this.Form_OnChange} variant='outlined' disabled={User.isSuperUser ? false : true} type='number' label='HargaModal' name='HargaModal' value={HargaModal} />
                                    <FormHelperText style={{ color: 'orange' }}> <WarningRoundedIcon fontSize="small" />Sangat Tidak Disarankan, Silakan Update Melalu Menu <a href='/transaksi/belanja'>Belanja</a>. karena tidak akan terdata di report bulanan</FormHelperText>
                                    <TextField style={{ ...st_textfield, ...theme.customTheme.readonlytextfield }} onChange={this.Form_OnChange} variant='outlined' disabled={User.isSuperUser ? false : true} type='number' label='HargaJual' name='HargaJual' value={HargaJual} />
                                    <FormHelperText style={{ color: 'orange' }}> <WarningRoundedIcon fontSize="small" />Sangat Tidak Disarankan, Silakan Update Melalu Menu <a href='/transaksi/belanja'>Belanja</a>. karena tidak akan terdata di report bulanan</FormHelperText>
                                </Fragment>)
                                : null
                            }

                            <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='text' label='Keterangan' name='Ket' value={Ket} />
                            <label>Barang Profile:</label><br />
                            <input type='file' accept='image/*' onChange={this.File_OnChange} name='BarangPic' /><br />
                            <hr />
                            <Button type='submit' style={st_textfield} size="large" variant='contained' color='primary' >Update</Button>
                        </form>
                    </Fragment>
                    : <DataTidakDitemukan />
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    User: state.Auth.User,
    idUpdateBarang: state.Barang.idUpdateBarang,
    BarangDetail: state.Barang.BarangDetail,
    JenisBarangList: state.JenisBarang.JenisBarangList,
})

export default connect(mapStateToProps, { get_BarangDetail, Load_JenisBarang_List, Update_Barang })(withTheme(BarangUpdate))