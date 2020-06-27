import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { get_JenisBarangDetail, Update_JenisBarang } from '../../../Store/Actions/JenisBarang.Actions'

import { TextField, FormControl, InputLabel, Select, Button } from '@material-ui/core'

import { withTheme } from '@material-ui/core/styles'
import { MUI_VerticalMargin, MUI_FullWidth } from '../../../MUI_theme'

import { DataTidakDitemukan } from '../Page404'


////// TODO ADD FORM NAMEING CEK 


class JenisBarangUpdate extends React.Component {
    state = {
        NamaJenisBarang: '',
        Kepemilikan: '',
        Ket: '',
    }
    componentDidMount() {
        const { idUpdateJenisBarang } = this.props
        if (idUpdateJenisBarang !== null) {
            this.props.get_JenisBarangDetail(idUpdateJenisBarang)
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.idUpdateJenisBarang !== prevProps.idUpdateJenisBarang) {
            const { idUpdateJenisBarang } = this.props
            this.props.get_JenisBarangDetail(idUpdateJenisBarang)
        }
        if (this.props.JenisBarangDetail !== prevProps.JenisBarangDetail) {
            const { JenisBarangDetail } = this.props
            if (JenisBarangDetail) {
                this.setState({
                    NamaJenisBarang: JenisBarangDetail.NamaJenisBarang,
                    Kepemilikan: JenisBarangDetail.Kepemilikan,
                    Ket: JenisBarangDetail.Ket,
                })
            }
        }
    }
    Form_OnChange = E => {
        this.setState({ [E.target.name]: E.target.value })
    }
    Form_OnSubmit = E => {
        E.preventDefault()
        const { User, idUpdateJenisBarang } = this.props
        const updatedata = {
            // NamaJenisBarang: this.state.NamaJenisBarang,
            Kepemilikan: this.state.Kepemilikan,
            Ket: this.state.Ket,
        }
        const authdata = {
            isKasir: User.isKasir,
            isAdmin: User.isAdmin,
            isSuperUser: User.isSuperUser,
        }
        this.props.Update_JenisBarang(idUpdateJenisBarang, updatedata, authdata)
    }
    render() {
        const JenisBarangDetail = this.props.JenisBarangDetail
        const theme = this.props.theme

        const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth }
        const {
            NamaJenisBarang,
            Kepemilikan,
            Ket,
        } = this.state
        const choices = ['pribadi', 'nonpribadi']
        return (
            <Fragment>
                {JenisBarangDetail ?
                    <Fragment>
                        <form onSubmit={this.Form_OnSubmit}>
                            <TextField style={{ ...st_textfield, ...theme.customTheme.readonlytextfield }} variant='outlined' disabled type='text' label='NamaJenisBarang' name='NamaJenisBarang' value={NamaJenisBarang} required />
                            <FormControl style={st_textfield} variant="filled" required >
                                <InputLabel shrink >Kepemilikan</InputLabel>
                                <Select native onChange={this.Form_OnChange} label="Kepemilikan" name='Kepemilikan' value={Kepemilikan} labelWidth={100} >
                                    <option value="" disabled> -- select an option -- </option>
                                    {choices.map((item, index) =>
                                        <option key={index} value={item}>{item}</option>
                                    )}
                                </Select>
                            </FormControl>
                            <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='text' label='Ket' name='Ket' value={Ket} />
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
    idUpdateJenisBarang: state.JenisBarang.idUpdateJenisBarang,
    JenisBarangDetail: state.JenisBarang.JenisBarangDetail,
})

export default connect(mapStateToProps, { get_JenisBarangDetail, Update_JenisBarang })(withTheme(JenisBarangUpdate))