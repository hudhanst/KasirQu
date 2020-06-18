import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { get_TokoDetail, Update_Toko } from '../../../Store/Actions/Account.Actions'

import { TextField, Button } from '@material-ui/core'

import { MUI_VerticalMargin, MUI_FullWidth } from '../../../MUI_theme'

import { DataTidakDitemukan } from '../Page404'

class TokoUpdate extends React.Component {
    state = {
        NamaToko: '',
        Alamat: '',
        Kontak: '',
        Logo: null,
    }
    componentDidMount() {
        this.props.get_TokoDetail()
    }
    componentDidUpdate(prevProps) {
        if (this.props.TokoDetail !== prevProps.TokoDetail) {
            const { TokoDetail } = this.props
            if (TokoDetail) {
                this.setState({
                    NamaToko: TokoDetail.NamaToko,
                    Alamat: TokoDetail.Alamat,
                    Kontak: TokoDetail.Kontak,
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
        const { User } = this.props
        const updatedata = {
            NamaToko: this.state.NamaToko,
            Alamat: this.state.Alamat,
            Kontak: this.state.Kontak,
            Logo: this.state.Logo,
        }
        const authdata = {
            isKasir: User.isKasir,
            isAdmin: User.isAdmin,
            isSuperUser: User.isSuperUser,
        }
        this.props.Update_Toko(updatedata, authdata)
    }
    render() {
        // console.log('prop', this.props)
        const TokoDetail = this.props.TokoDetail

        const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth }
        const {
            NamaToko,
            Alamat,
            Kontak,
        } = this.state
        return (
            <Fragment>
                {TokoDetail ?
                    <Fragment>
                        <form onSubmit={this.Form_OnSubmit}>
                            <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='text' label='Nama Toko' name='NamaToko' value={NamaToko} />
                            <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='text' label='Alamat' name='Alamat' value={Alamat} />
                            <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='text' label='Kontak' name='Kontak' value={Kontak} />

                            <label>Logo:</label><br />
                            <input type='file' accept='image/*' onChange={this.File_OnChange} name='Logo' /><br />

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
    TokoDetail: state.Account.TokoDetail,
})

export default connect(mapStateToProps, { get_TokoDetail, Update_Toko })(TokoUpdate)