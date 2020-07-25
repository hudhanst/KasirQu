import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { LogIn } from '../../../Store/Actions/Auth.Actions'

import { Redirect } from 'react-router-dom'

import { Container, Typography, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText, Button } from '@material-ui/core'

import { withTheme } from '@material-ui/core/styles'
import { MUI_st_Login_Container, MUI_FullWidth, MUI_VerticalMargin } from '../../../MUI_theme'

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        IpAddress: '',
        isShowPassword: false,
        firsttimeuse_clickcounter: 0,
    }
    onChange = E => this.setState({ [E.target.name]: E.target.value })
    onSubmit = E => {
        E.preventDefault()
        // console.log(1)
        this.props.LogIn(this.state.username, this.state.password, this.state.IpAddress)
    }
    onClickShowPassword = () => {
        this.setState({ isShowPassword: !this.state.isShowPassword })
    }
    onClickFirstTimeUse = () => {
        if (this.state.firsttimeuse_clickcounter < 10) {
            this.setState({ firsttimeuse_clickcounter: (this.state.firsttimeuse_clickcounter + 1) })
        } else {
            window.location.href = '/firsttimeuse'
        }
    }
    render() {
        const theme = this.props.theme
        if ((this.props.isAuth && this.props.token)) {
            return <Redirect to="/" />
        }
        const { username, password, IpAddress } = this.state
        const logo = process.env.PUBLIC_URL + '/IMG/Logo.png'
        const st_container = { ...MUI_st_Login_Container, ...theme.customTheme.loginpage }
        const st_textfield = { ...MUI_FullWidth, ...MUI_VerticalMargin }
        const st_button = { ...MUI_FullWidth }
        // console.log(this.state)
        return (
            <Fragment >
                <Container maxWidth='sm' style={st_container} >
                    <Typography variant="h3" align='center' gutterBottom>
                        Login page
                    </Typography>
                    <Typography align='center'>
                        <img src={logo} alt='logo kasirqu' onClick={this.onClickFirstTimeUse} />
                    </Typography>
                    <form onSubmit={this.onSubmit}>
                        <TextField style={st_textfield} variant='outlined' type='text' onChange={this.onChange} label='User Name' name='username' value={username} />
                        <FormControl variant="outlined" style={st_textfield}>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={this.state.isShowPassword ? 'text' : 'password'}
                                value={password}
                                name='password'
                                onChange={this.onChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.onClickShowPassword}
                                            edge="end"
                                        >
                                            {this.state.isShowPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={70}
                            />
                        </FormControl>
                        <TextField style={st_textfield} variant='outlined' type='text' onChange={this.onChange} label='Ip Address' name='IpAddress' value={IpAddress}
                            inputProps={{
                                minLength: 7,
                                maxLength: 15,
                                /* eslint-disable */
                                pattern: "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
                            }}
                        />
                        <FormHelperText>fromat: xxx.xxx.xxx.xxx -&gt; xxx = 0-256</FormHelperText>
                        <FormHelperText>ipaddres bisa di cek di Run -&gt; "cmd" -&gt; "ipconfig" -&gt; IPv4 Address</FormHelperText>
                        <Button variant="outlined" style={st_button} color='primary' size="large" type='submit' >
                            Log In
                        </Button>
                    </form>
                </Container>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    isAuth: state.Auth.isAuth,
    token: state.Auth.token,
})

export default connect(mapStateToProps, { LogIn })(withTheme(Login))
