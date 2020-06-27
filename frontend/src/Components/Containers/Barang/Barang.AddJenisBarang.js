import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Add_JenisBarang } from '../../../Store/Actions/JenisBarang.Actions'

import { TextField, FormControl, InputLabel, Select, Button } from '@material-ui/core'

import { MUI_VerticalMargin, MUI_FullWidth } from '../../../MUI_theme'


////// TODO ADD FORM NAMEING CEK 


class AddJenisBarang extends React.Component {
    state = {
        NamaJenisBarang: '',
        Kepemilikan: '',
        Ket: '',
    }
    Form_OnChange = E => {
        this.setState({ [E.target.name]: E.target.value })
    }
    Form_OnSubmit = E => {
        E.preventDefault()
        const { User } = this.props
        const data = {
            NamaJenisBarang: this.state.NamaJenisBarang,
            Kepemilikan: this.state.Kepemilikan,
            Ket: this.state.Ket,
        }
        const authdata = {
            isKasir: User.isKasir,
            isAdmin: User.isAdmin,
            isSuperUser: User.isSuperUser,
        }
        this.props.Add_JenisBarang(data, authdata)
    }
    render() {
        const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth }
        const {
            NamaJenisBarang,
            Kepemilikan,
            Ket,
        } = this.state
        const choices = ['pribadi', 'nonpribadi']
        return (
            <Fragment>
                <form onSubmit={this.Form_OnSubmit}>
                    <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='text' label='Nama Jenis Barang' name='NamaJenisBarang' value={NamaJenisBarang} required />
                    {/* <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='text' label='Kepemilikan' name='Kepemilikan' value={Kepemilikan} required /> */}
                    <FormControl style={st_textfield} variant="filled" required >
                        <InputLabel shrink >Kepemilikan</InputLabel>
                        <Select native onChange={this.Form_OnChange} label="Kepemilikan" name='Kepemilikan' value={Kepemilikan} labelWidth={100} >
                            <option value="" disabled> -- select an option -- </option>
                            {choices.map((item, index) =>
                                <option key={index} value={item}>{item}</option>
                            )}
                        </Select>
                    </FormControl>
                    <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='text' label='Keterangan' name='Ket' value={Ket} />
                    <hr />
                    <Button type='submit' style={st_textfield} size="large" variant='contained' color='primary' >Tambah Jenis Barang</Button>
                </form>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    User: state.Auth.User,
})

export default connect(mapStateToProps, { Add_JenisBarang })(AddJenisBarang)