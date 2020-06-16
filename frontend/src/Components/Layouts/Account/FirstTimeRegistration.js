import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { First_Time_Register } from '../../../Store/Actions/Auth.Actions'

import { Redirect } from 'react-router-dom'

import { Container, Typography, TextField, Button } from '@material-ui/core'

import { withTheme } from '@material-ui/core/styles'
import { MUI_st_Login_Container, MUI_FullWidth, MUI_VerticalMargin } from '../../../MUI_theme'

class FirstTimeRegistration extends React.Component {
    state = {
        UserName: '',
        Name: '',
        Password: '',
        ConfirmPassword: '',
        Cupon: '',
        Profilepicture: null,
    }
    onChange = E => {
        this.setState({ [E.target.name]: E.target.value })
    }
    onSubmit = E => {
        E.preventDefault()
        if (((this.state.Password === this.state.ConfirmPassword) && (this.state.Password))) {
            this.props.First_Time_Register(this.state.UserName, this.state.Name, this.state.Password, this.state.Cupon, this.state.Profilepicture)
        }
    }
    File_OnChange = E => {
        this.setState({ [E.target.name]: E.target.files[0] })
    }
    onClickCancel = () => {
        window.location.href = '/login'
    }
    render() {
        const theme = this.props.theme
        if ((this.props.isAuth && this.props.token)) {
            return <Redirect to="/" />
        }
        const { UserName, Name, Password, ConfirmPassword, Cupon } = this.state
        const st_container = { ...MUI_st_Login_Container, ...theme.customTheme.loginpage }
        const st_textfield = { ...MUI_FullWidth, ...MUI_VerticalMargin }
        // console.log(this.state)
        return (
            <Fragment >
                <Container maxWidth='sm' style={st_container} >
                    <Typography variant="h3" align='center' gutterBottom>
                        Registrasi Akun Super
                    </Typography>
                    <Typography variant="subtitle1" align='center' gutterBottom>
                        Hanya bisa gunakan pertama kali
                    </Typography>
                    <form onSubmit={this.onSubmit}>
                        <TextField style={st_textfield} variant='outlined' type='text' onChange={this.onChange} label='User Name' name='UserName' value={UserName} />
                        <TextField style={st_textfield} variant='outlined' type='text' onChange={this.onChange} label='Name' name='Name' value={Name} />
                        <TextField style={st_textfield} variant='outlined' type='password' onChange={this.onChange} label='Password' name='Password' value={Password} />
                        <TextField style={st_textfield} variant='outlined' type='password' onChange={this.onChange} label='Confirm Password' name='ConfirmPassword' value={ConfirmPassword}
                            error={((Password !== ConfirmPassword) && (ConfirmPassword !== '')) ? true : false}
                            helperText={((Password !== ConfirmPassword) && (ConfirmPassword !== '')) ? 'password dan password confirm harus sama' : null}
                        />
                        <TextField style={st_textfield} variant='outlined' type='text' onChange={this.onChange} label='Kupon' name='Cupon' value={Cupon} />
                        <label>Photo Profile:</label><br />
                        <input type='file' accept='image/*' onChange={this.File_OnChange} name='Profilepicture' /><br />
                        <Button variant="outlined" style={st_textfield} color='primary' size="large" type='submit' >
                            Register
                        </Button>
                    </form>
                    <Button variant="outlined" style={st_textfield} color='secondary' size="large" onClick={this.onClickCancel} >
                        Cancel
                        </Button>
                </Container>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    isAuth: state.Auth.isAuth,
    token: state.Auth.token,
})

export default connect(mapStateToProps, { First_Time_Register })(withTheme(FirstTimeRegistration))
