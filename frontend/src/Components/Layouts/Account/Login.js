import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { LogIn } from '../../../Store/Actions/Auth.Actions'

import { Redirect } from 'react-router-dom'

import { Container, Typography, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormGroup, FormControlLabel, Checkbox, FormHelperText, Button, Link } from '@material-ui/core'

import { withTheme } from '@material-ui/core/styles'
import { MUI_st_Login_Container, MUI_FullWidth, MUI_VerticalMargin } from '../../../MUI_theme'
import logo from '../../../IMG/logo.png'

import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        isShowPassword: false,
        firsttimeuse_clickcounter: 0,
        isClient: false,
        IpAddress: '',
        Port: '',
        WebSite: ''
    }
    onChange = E => this.setState({ [E.target.name]: E.target.value })
    onSubmit = E => {
        E.preventDefault()
        // console.log(1)
        this.props.LogIn(this.state.username, this.state.password, this.state.IpAddress, this.state.Port, this.state.WebSite)
    }
    onClickShowPassword = () => {
        this.setState({ isShowPassword: !this.state.isShowPassword })
    }
    CheckBox_OnChange = E => {
        this.setState({ [E.target.name]: !this.state[E.target.name] })
    }
    onClickFirstTimeUse = () => {
        console.log('counter', this.state.firsttimeuse_clickcounter)
        if (this.state.firsttimeuse_clickcounter < 10) {
            this.setState({ firsttimeuse_clickcounter: (this.state.firsttimeuse_clickcounter + 1) })
        } else {
            window.location.href = '#/firsttimeuse'
        }
    }
    render() {
        const theme = this.props.theme
        if ((this.props.isAuth && this.props.token)) {
            return <Redirect to="/" />
        }
        const {
            username,
            password,
            isClient,
            IpAddress,
            Port,
            WebSite,
        } = this.state
        // const logo = process.env.PUBLIC_URL + '/IMG/Logo.png'
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
                        <Typography align='right' style={{ padding: '10px', margin: '10px' }} color='textPrimary' >
                            <Link href='#/help/login' color="textPrimary"  >Bantuan Login?</Link>
                            <Link href='#/help/first_time_use' color="textPrimary" style={{ padding: '10px' }} >Penggunaan Pertama?</Link>
                        </Typography>
                        <TextField style={st_textfield} variant='outlined' type='text' onChange={this.onChange} label='User Name' name='username' value={username} required />
                        <FormControl variant="outlined" style={st_textfield} required>
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

                        <FormGroup row>
                            <FormControlLabel
                                control={<Checkbox color='primary' onChange={this.CheckBox_OnChange} name="isClient" value={isClient} />}
                                label="Saya Mengakses dari Client"
                            />
                        </FormGroup>

                        {isClient ? (
                            <Fragment>
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
                                <TextField style={st_textfield} variant='outlined' type='text' inputMode='numeric' onChange={this.onChange} label='Port' name='Port' value={Port} />
                                <FormHelperText>Berikut contoh port http://127.0.0.1:<b style={{ color: 'blue' }}>3000</b>/login biasanya diantara ":" dan "/" setlah alamt web</FormHelperText>
                                <FormHelperText>Port diseting di 5000, form ini disediakan untuk jaga jaga saja jika terjadi masalah pada port, biasanya anda tidak perlu mengisi port</FormHelperText>
                                <TextField style={st_textfield} variant='outlined' type='text' onChange={this.onChange} label='Alamat Web' name='WebSite' value={WebSite} />
                                <FormHelperText>format penulisan hanya alamtnya saja, misal https://www.google.com/ yang dimasukkan hanya google.com </FormHelperText>
                            </Fragment>
                        ) : null}

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
