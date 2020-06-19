import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { get_AccountDetail, Update_Account } from '../../../Store/Actions/Account.Actions'

import { TextField, Checkbox, FormGroup, FormControlLabel, Button } from '@material-ui/core'

import { withTheme } from '@material-ui/core/styles'
import { MUI_VerticalMargin, MUI_st_AccountDetail_TextField, MUI_FullWidth } from '../../../MUI_theme'

import { DataTidakDitemukan } from '../Page404'

class AccountUpdate extends React.Component {
    state = {
        UserName: '',
        Name: '',
        ChangePassword: false,
        Password: '',
        ConfirmPassword: '',
        isActive: false,
        isKasir: false,
        isAdmin: false,
        isSuperUser: false,
        Profilepicture: null,
    }
    componentDidMount() {
        const { idUpdateAccount } = this.props
        if (idUpdateAccount !== null) {
            this.props.get_AccountDetail(idUpdateAccount)
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.idUpdateAccount !== prevProps.idUpdateAccount) {
            const { idUpdateAccount } = this.props
            this.props.get_AccountDetail(idUpdateAccount)
        }
        if (this.props.AccountDetail !== prevProps.AccountDetail) {
            const { AccountDetail } = this.props
            if (AccountDetail) {
                this.setState({
                    UserName: AccountDetail.UserName,
                    Name: AccountDetail.Name,
                    isActive: AccountDetail.isActive,
                    isKasir: AccountDetail.isKasir,
                    isAdmin: AccountDetail.isAdmin,
                    isSuperUser: AccountDetail.isSuperUser,
                })
            }
        }
    }
    Form_OnChange = E => {
        this.setState({ [E.target.name]: E.target.value })
    }
    CheckBox_OnChange = E => {
        this.setState({ [E.target.name]: !this.state[E.target.name] })
    }
    File_OnChange = E => {
        this.setState({ [E.target.name]: E.target.files[0] })
    }
    Form_OnSubmit = E => {
        E.preventDefault()
        const { User, idUpdateAccount } = this.props
        const updatedata = {
            Name: this.state.Name,
            // ChangePassword: this.state.ChangePassword,
            Password: this.state.Password,
            // ConfirmPassword: this.state.ConfirmPassword, 
            isActive: this.state.isActive,
            isKasir: this.state.isKasir,
            isAdmin: this.state.isAdmin,
            isSuperUser: this.state.isSuperUser,
            Profilepicture: this.state.Profilepicture
        }
        const authdata = {
            isKasir: User.isKasir,
            isAdmin: User.isAdmin,
            isSuperUser: User.isSuperUser,
        }
        if ((this.state.ChangePassword === true) && ((this.state.Password === '' || this.state.Password === null) || (this.state.Password !== this.state.ConfirmPassword))) {
            E.preventDefault()
        } else {
            this.props.Update_Account(idUpdateAccount, updatedata, authdata)
        }
    }
    render() {
        // console.log('prop', this.props)
        const theme = this.props.theme
        const User = this.props.User
        const AccountDetail = this.props.AccountDetail

        const st_textfield = { ...MUI_VerticalMargin, ...MUI_st_AccountDetail_TextField }
        const st_switch = { ...MUI_FullWidth, ...MUI_VerticalMargin }
        const {
            UserName,
            Name,
            ChangePassword,
            Password,
            ConfirmPassword,
            isActive,
            isKasir,
            isAdmin,
            isSuperUser,
        } = this.state
        return (
            <Fragment>
                {AccountDetail ?
                    <Fragment>
                        <form onSubmit={this.Form_OnSubmit}>
                            <TextField style={{ ...st_textfield, ...theme.customTheme.readonlytextfield }} variant='outlined' disabled type='text' label='User Name' name='UserName' value={UserName} />
                            <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='text' label='Name' name='Name' value={Name} required />
                            <FormGroup row>
                                <FormControlLabel
                                    control={<Checkbox color='primary' onChange={this.CheckBox_OnChange} name="ChangePassword" value={ChangePassword} />}
                                    label="Ganti Password"
                                />
                            </FormGroup>
                            {ChangePassword ?
                                <Fragment>
                                    <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='password' label='Password' name='Password' value={Password} />
                                    <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='password' label='Confirm Password' name='ConfirmPassword' value={ConfirmPassword}
                                        error={((Password !== ConfirmPassword) && (ConfirmPassword !== '')) ? true : false}
                                        helperText={((Password !== ConfirmPassword) && (ConfirmPassword !== '')) ? 'password dan password confirm harus sama' : null}
                                    />
                                </Fragment>
                                : null
                            }
                            <label>Photo Profile:</label><br />
                            <input type='file' accept='image/*' onChange={this.File_OnChange} name='Profilepicture' /><br />
                            {(User.isSuperUser) ?
                                <Fragment>
                                    <hr />
                                    <label>Active:</label><br />
                                    <div className='switch'>
                                        <input type="checkbox" style={st_switch} onChange={this.CheckBox_OnChange} name='isActive' checked={isActive} /><span></span><br />
                                    </div><br />
                                    <label>Kasir:</label><br />
                                    <div className='switch'>
                                        <input type="checkbox" onChange={this.CheckBox_OnChange} name='isKasir' checked={isKasir} /><span></span><br />
                                    </div><br />
                                    <label>Admin:</label><br />
                                    <div className='switch'>
                                        <input type="checkbox" onChange={this.CheckBox_OnChange} name='isAdmin' checked={isAdmin} /><span></span><br />
                                    </div><br />
                                    <label>SuperUser:</label><br />
                                    <div className='switch'>
                                        <input type="checkbox" onChange={this.CheckBox_OnChange} name='isSuperUser' checked={isSuperUser} /><span></span><br />
                                    </div><br />
                                </Fragment>
                                : null
                            }
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
    idUpdateAccount: state.Account.idUpdateAccount,
    AccountDetail: state.Account.AccountDetail,
})

export default connect(mapStateToProps, { get_AccountDetail, Update_Account })(withTheme(AccountUpdate))