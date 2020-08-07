import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { get_AccountDetail } from '../../../Store/Actions/Account.Actions'

import { Avatar, TextField } from '@material-ui/core'

import { withTheme } from '@material-ui/core/styles'
import { MUI_st_AccountDetail_Avatar, MUI_FullWidth, MUI_VerticalMargin } from '../../../MUI_theme'

import { DataTidakDitemukan } from '../Page404'

class AccountDetail extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.idDetailAccount !== prevProps.idDetailAccount) {
            const { idDetailAccount } = this.props
            this.props.get_AccountDetail(idDetailAccount)
        }
    }
    componentDidMount() {
        const { idDetailAccount } = this.props
        // console.log('mountt', this.props)
        // console.log('mountt', idDetailAccount)
        if (idDetailAccount !== null) {
            this.props.get_AccountDetail(idDetailAccount)
        }
    }
    render() {
        const theme = this.props.theme
        const AccountDetail = this.props.AccountDetail
        const DefaultUrl = this.props.WebSite ? `http://${this.props.WebSite}` : `http://${this.props.IpAddres ? this.props.IpAddres : '127.0.0.1'}:${this.props.Port ? this.props.Port : '5000'}`

        const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth, ...theme.customTheme.readonlytextfield }
        const st_switch = { ...MUI_FullWidth, ...MUI_VerticalMargin }
        // console.log(User)
        // console.log(this.props)
        return (
            <Fragment>
                {AccountDetail ?
                    <Fragment>
                        <Avatar alt="Remy Sharp" src={AccountDetail.ProfilePicture ? `${DefaultUrl}/${AccountDetail.ProfilePicture}` : null} style={MUI_st_AccountDetail_Avatar} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='User Name' name='UserName' value={AccountDetail.UserName ? AccountDetail.UserName : ''} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Name' name='Name' value={AccountDetail.Name ? AccountDetail.Name : ''} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='password' label='Password' name='password' value={AccountDetail.Password ? AccountDetail.Password : ''} />
                        <hr />
                        <label>Active:</label><br />
                        <div className='switch' style={{ ...MUI_VerticalMargin }}>
                            <input type="checkbox" style={st_switch} disabled name='isActive' checked={AccountDetail.isActive ? AccountDetail.isActive : false} /><span></span><br />
                        </div><br />
                        <label>Kasir:</label><br />
                        <div className='switch' style={{ ...MUI_VerticalMargin }}>
                            <input type="checkbox" disabled name='isKasir' checked={AccountDetail.isKasir ? AccountDetail.isKasir : false} /><span></span><br />
                        </div><br />
                        <label>Admin:</label><br />
                        <div className='switch' style={{ ...MUI_VerticalMargin }}>
                            <input type="checkbox" disabled name='isAdmin' checked={AccountDetail.isAdmin ? AccountDetail.isAdmin : false} /><span></span><br />
                        </div><br />
                        <label>SuperUser:</label><br />
                        <div className='switch' style={{ ...MUI_VerticalMargin }}>
                            <input type="checkbox" disabled name='isSuperUser' checked={AccountDetail.isSuperUser ? AccountDetail.isSuperUser : false} /><span></span><br />
                        </div><br />
                        {/* <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='tanggal pembuatan akun' name='RegisterDate' value={AccountDetail.RegisterDate ? new Date(AccountDetail.RegisterDate).toLocaleString('id-ID', { hour12: false }) : ''} /> */}
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='tanggal pembuatan akun' name='RegisterDate' value={AccountDetail.RegisterDate ? new Date(AccountDetail.RegisterDate).toLocaleString() : ''} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Terakhir kali login' name='LastActive' value={AccountDetail.LastActive ? new Date(AccountDetail.LastActive).toLocaleString() : ''} />
                    </Fragment>
                    : <DataTidakDitemukan />
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    User: state.Auth.User,
    idDetailAccount: state.Account.idDetailAccount,
    AccountDetail: state.Account.AccountDetail,
    IpAddres: state.Auth.IpAddres,
    Port: state.Auth.Port,
    WebSite: state.Auth.WebSite,
})

export default connect(mapStateToProps, { get_AccountDetail })(withTheme(AccountDetail))