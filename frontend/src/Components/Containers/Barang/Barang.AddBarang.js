import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Load_JenisBarang_List } from '../../../Store/Actions/JenisBarang.Actions'
import { Add_Barang } from '../../../Store/Actions/Barang.Actions'

import { TextField, FormControl, InputLabel, Select, Button } from '@material-ui/core'

import { MUI_VerticalMargin, MUI_FullWidth } from '../../../MUI_theme'


////// TODO ADD FORM BARCODE CEK 
////// TODO ADD FORM NAMEING CEK 


class AddBarang extends React.Component {
    state = {
        Barcode: '',
        Name: '',
        Jenis: '',
        Ket: '',
        BarangPic: null,
    }
    componentDidMount() {
        this.props.Load_JenisBarang_List()
    }
    Form_OnChange = E => {
        this.setState({ [E.target.name]: E.target.value })
    }
    File_OnChange = E => {
        this.setState({ [E.target.name]: E.target.files[0] })
    }
    Form_OnSubmit = E => {
        E.preventDefault()
        const { User } = this.props
        const data = {
            Barcode: this.state.Barcode,
            Name: this.state.Name,
            Jenis: this.state.Jenis,
            Ket: this.state.Ket,
            BarangPic: this.state.BarangPic,
        }
        const authdata = {
            isKasir: User.isKasir,
            isAdmin: User.isAdmin,
            isSuperUser: User.isSuperUser,
        }
        this.props.Add_Barang(data, authdata)
    }
    render() {
        const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth }
        const options = this.props.JenisBarangList
        const {
            Barcode,
            Name,
            Jenis,
            Ket,
        } = this.state
        return (
            <Fragment>
                <form onSubmit={this.Form_OnSubmit}>
                    <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='text' label='Barcode' name='Barcode' value={Barcode} required />
                    <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='text' label='Nama' name='Name' value={Name} required /><br />
                    <FormControl style={st_textfield} variant="filled" required >
                        <InputLabel shrink >Jenis</InputLabel>
                        <Select native onChange={this.Form_OnChange} label="Jenis" name='Jenis' value={Jenis} labelWidth={100} >
                            <option value="" disabled> -- select an option -- </option>
                            {options.map((option, index) =>
                                <option key={index} value={option.NamaJenisBarang}>{option.NamaJenisBarang}</option>
                            )}
                        </Select>
                    </FormControl>
                    <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='text' label='Keterangan' name='Ket' value={Ket} />
                    <label>Photo Barang:</label><br />
                    <input type='file' accept='image/*' onChange={this.File_OnChange} name='BarangPic' /><br />
                    <hr />
                    <Button type='submit' style={st_textfield} size="large" variant='contained' color='primary' >Tambah Barang</Button>
                </form>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    User: state.Auth.User,
    JenisBarangList: state.JenisBarang.JenisBarangList,
})

export default connect(mapStateToProps, { Load_JenisBarang_List, Add_Barang })(AddBarang)