import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { get_TokoDetail } from '../../../Store/Actions/Account.Actions'

import { Avatar, TextField } from '@material-ui/core'

import { withTheme } from '@material-ui/core/styles'
import { MUI_st_AccountDetail_Avatar, MUI_st_AccountDetail_TextField, MUI_VerticalMargin } from '../../../MUI_theme'

import { DataTidakDitemukan } from '../Page404'

class AccountDetail extends React.Component {
    componentDidMount() {
        this.props.get_TokoDetail()
    }
    render() {
        const theme = this.props.theme
        const TokoDetail = this.props.TokoDetail
        const DefaultUrl = this.props.WebSite ? `http://${this.props.WebSite}` : `http://${this.props.IpAddres ? this.props.IpAddres : '127.0.0.1'}:${this.props.Port ? this.props.Port : '5000'}`

        const st_textfield = { ...MUI_VerticalMargin, ...MUI_st_AccountDetail_TextField, ...theme.customTheme.readonlytextfield }
        return (
            <Fragment>
                {TokoDetail ?
                    <Fragment>
                        <Avatar alt="Remy Sharp" src={TokoDetail.Logo ? `${DefaultUrl}/${TokoDetail.Logo}` : null} style={MUI_st_AccountDetail_Avatar} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Nama Toko' name='NamaToko' value={TokoDetail.NamaToko ? TokoDetail.NamaToko : ''} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Alamat' name='Alamat' value={TokoDetail.Alamat ? TokoDetail.Alamat : ''} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Kontak' name='Kontak' value={TokoDetail.Kontak ? TokoDetail.Kontak : ''} />
                    </Fragment>
                    : <DataTidakDitemukan />
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    TokoDetail: state.Account.TokoDetail,
    IpAddres: state.Auth.IpAddres,
    Port: state.Auth.Port,
    WebSite: state.Auth.WebSite,
})

export default connect(mapStateToProps, { get_TokoDetail })(withTheme(AccountDetail))