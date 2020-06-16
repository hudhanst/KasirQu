import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Add_Account } from '../../../Store/Actions/Auth.Actions'

import { TextField, Button } from '@material-ui/core'

import { MUI_VerticalMargin, MUI_FullWidth } from '../../../MUI_theme'

class AddAccount extends React.Component {
    state = {
        UserName: '',
        Name: '',
        Password: '',
        ConfirmPassword: '',
        isKasir: false,
        isAdmin: false,
        isSuperUser: false,
        Profilepicture: null,
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
        const { User } = this.props
        const addaccountdata = {
            UserName: this.state.UserName,
            Name: this.state.Name,
            Password: this.state.Password,
            isKasir: this.state.isKasir,
            isAdmin: this.state.isAdmin,
            isSuperUser: this.state.isSuperUser,
            Profilepicture: this.state.Profilepicture,
        }
        const authdata = {
            isKasir: User.isKasir,
            isAdmin: User.isAdmin,
            isSuperUser: User.isSuperUser,
        }
        if (this.state.Password === this.state.ConfirmPassword) {
            this.props.Add_Account(addaccountdata, authdata)
        }
    }
    render() {
        const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth }
        const User = this.props.User
        const {
            UserName,
            Name,
            Password,
            ConfirmPassword,
            isKasir,
            isAdmin,
            isSuperUser,
        } = this.state
        return (
            <Fragment>
                <form onSubmit={this.Form_OnSubmit}>
                    <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='text' label='User Name' name='UserName' value={UserName} />
                    <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='text' label='Name' name='Name' value={Name} />
                    <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='password' label='Password' name='Password' value={Password} />
                    <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='password' label='Confirm Password' name='ConfirmPassword' value={ConfirmPassword}
                        error={((Password !== ConfirmPassword) && (ConfirmPassword !== '')) ? true : false}
                        helperText={((Password !== ConfirmPassword) && (ConfirmPassword !== '')) ? 'password dan password confirm harus sama' : null}
                    />
                    <label>Photo Profile:</label><br />
                    <input type='file' accept='image/*' onChange={this.File_OnChange} name='Profilepicture' /><br />
                    <hr />
                    <label>Kasir:</label><br />
                    <div className='switch'>
                        <input type="checkbox" onChange={this.CheckBox_OnChange} name='isKasir' checked={isKasir} /><span></span><br />
                    </div><br />
                    <label>Admin:</label><br />
                    <div className='switch'>
                        <input type="checkbox" onChange={this.CheckBox_OnChange} name='isAdmin' checked={isAdmin} /><span></span><br />
                    </div><br />
                    {(User.isSuperUser) ?
                        <Fragment>
                            <label>SuperUser:</label><br />
                            <div className='switch'>
                                <input type="checkbox" onChange={this.CheckBox_OnChange} name='isSuperUser' checked={isSuperUser} /><span></span><br />
                            </div><br />
                        </Fragment>
                        : null
                    }
                    <hr />
                    <Button type='submit' style={st_textfield} size="large" variant='contained' color='primary' >Add Account</Button>
                </form>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    User: state.Auth.User,
})

export default connect(mapStateToProps, { Add_Account })(AddAccount)