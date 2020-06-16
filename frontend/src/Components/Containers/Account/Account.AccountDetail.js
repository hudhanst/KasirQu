import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { get_AccountDetail } from '../../../Store/Actions/Auth.Actions'

import { Avatar, TextField } from '@material-ui/core'

import { withTheme } from '@material-ui/core/styles'
import { MUI_st_AccountDetail_Avatar, MUI_st_AccountDetail_TextField, MUI_FullWidth, MUI_VerticalMargin } from '../../../MUI_theme'

import { DataTidakDitemukan } from '../Page404'

class AccountDetail extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.idDetailAccount !== prevProps.idDetailAccount) {
            console.log('prevProps')
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
        const User = this.props.User
        const AccountDetail = this.props.AccountDetail

        const st_textfield = { ...MUI_VerticalMargin, ...MUI_st_AccountDetail_TextField, ...theme.customTheme.readonlytextfield }
        const st_switch = { ...MUI_FullWidth, ...MUI_VerticalMargin }
        // console.log(User)
        // console.log(this.props)
        return (
            <Fragment>
                {AccountDetail ?
                    <Fragment>
                        <Avatar alt="Remy Sharp" src={AccountDetail.ProfilePicture ? `http://127.0.0.1:5000/${AccountDetail.ProfilePicture}` : null} style={MUI_st_AccountDetail_Avatar} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='User Name' name='UserName' value={AccountDetail.UserName} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Name' name='Name' value={AccountDetail.Name} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='password' label='Password' name='password' value={AccountDetail.Password} />
                        {(User.isSuperUser || User.isAdmin) ?
                            <Fragment>
                                <hr />
                                <label>Active:</label><br />
                                <div className='switch'>
                                    <input type="checkbox" style={st_switch} disabled name='isActive' checked={AccountDetail.isActive} /><span></span><br />
                                </div><br />
                                <label>Kasir:</label><br />
                                <div className='switch'>
                                    <input type="checkbox" disabled name='isKasir' checked={AccountDetail.isKasir} /><span></span><br />
                                </div><br />
                                <label>Admin:</label><br />
                                <div className='switch'>
                                    <input type="checkbox" disabled name='isAdmin' checked={AccountDetail.isAdmin} /><span></span><br />
                                </div><br />
                                <label>SuperUser:</label><br />
                                <div className='switch'>
                                    <input type="checkbox" disabled name='isSuperUser' checked={AccountDetail.isSuperUser} /><span></span><br />
                                </div><br />
                                <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='tanggal pembuatan akun' name='RegisterDate' value={AccountDetail.RegisterDate} />
                                <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Terakhir kali login' name='LastActive' value={AccountDetail.LastActive} />
                            </Fragment>
                            : null
                        }
                    </Fragment>
                    : <DataTidakDitemukan />
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    User: state.Auth.User,
    idDetailAccount: state.Auth.idDetailAccount,
    AccountDetail: state.Auth.AccountDetail,
})

export default connect(mapStateToProps, { get_AccountDetail })(withTheme(AccountDetail))