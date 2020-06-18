import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { First_Time_Use } from '../../Store/Actions/Auth.Actions'

import { Redirect } from 'react-router-dom'

import { Container, TextField } from '@material-ui/core'

import { withTheme } from '@material-ui/core/styles'
import { MUI_st_Login_Container, MUI_FullWidth, MUI_VerticalMargin, MUI_HorizontalsmButtonMargin } from '../../MUI_theme'

import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'


class FirsTimeUse extends React.Component {
    state = {
        UserName: '',
        Name: '',
        Password: '',
        ConfirmPassword: '',
        Cupon: '',
        Profilepicture: null,
        NamaToko: '',
        Alamat: '',
        Kontak: '',
        Logo: null,
        activeStep: 0,
    }
    onChange = E => {
        this.setState({ [E.target.name]: E.target.value })
    }
    onSubmit = E => {
        E.preventDefault()
        if (((this.state.Password === this.state.ConfirmPassword) && (this.state.Password))) {
            const User = {
                UserName: this.state.UserName,
                Name: this.state.Name,
                Password: this.state.Password,
                cupon: this.state.Cupon,
                Profilepicture: this.state.Profilepicture,
            }
            const Toko = {
                NamaToko: this.state.NamaToko,
                Alamat: this.state.Alamat,
                Kontak: this.state.Kontak,
                Logo: this.state.Logo,
            }
            this.props.First_Time_Use(User, Toko)
        }
    }
    File_OnChange = E => {
        this.setState({ [E.target.name]: E.target.files[0] })
    }
    onClickCancel = () => {
        window.location.href = '/login'
    }
    handleNext = () => {
        this.setState({ activeStep: this.state.activeStep + 1 })
    }
    handleBack = () => {
        this.setState({ activeStep: this.state.activeStep - 1 })
    }
    handleReset = () => {
        this.setState({
            UserName: '',
            Name: '',
            Password: '',
            ConfirmPassword: '',
            Cupon: '',
            Profilepicture: null,
            NamaToko: '',
            Alamat: '',
            Kontak: '',
            Logo: null,
            activeStep: 0,
        })
    }
    render() {
        if ((this.props.isAuth && this.props.token)) {
            return <Redirect to="/" />
        }
        const theme = this.props.theme
        const st_container = { ...MUI_st_Login_Container, ...theme.customTheme.loginpage }
        const st_textfield = { ...MUI_FullWidth, ...MUI_VerticalMargin }
        const steps = ['Registrasi Super User', 'Registrasi Data Toko']
        const {
            UserName,
            Name,
            Password,
            ConfirmPassword,
            Cupon,
            NamaToko,
            Alamat,
            Kontak,
        } = this.state
        const getStepContent = (stepIndex) => {
            switch (stepIndex) {
                case 0:
                    return (
                        <Fragment>
                            <Typography variant="h3" align='center' gutterBottom>
                                Registrasi Akun Super
                            </Typography>
                            <Typography variant="subtitle1" align='center' gutterBottom>
                                Hanya bisa digunakan pertama kali
                            </Typography>
                            <TextField style={st_textfield} variant='outlined' type='text' onChange={this.onChange} label='User Name' name='UserName' value={UserName} required />
                            <TextField style={st_textfield} variant='outlined' type='text' onChange={this.onChange} label='Name' name='Name' value={Name} required />
                            <TextField style={st_textfield} variant='outlined' type='password' onChange={this.onChange} label='Password' name='Password' value={Password} required />
                            <TextField style={st_textfield} variant='outlined' type='password' onChange={this.onChange} label='Confirm Password' name='ConfirmPassword' value={ConfirmPassword}
                                error={((Password !== ConfirmPassword) && (ConfirmPassword !== '')) ? true : false}
                                helperText={((Password !== ConfirmPassword) && (ConfirmPassword !== '')) ? 'password dan password confirm harus sama' : null}
                            />
                            <TextField style={st_textfield} variant='outlined' type='text' onChange={this.onChange} label='Kupon' name='Cupon' value={Cupon} required />
                            <label>Photo Profile:</label><br />
                            <input type='file' accept='image/*' onChange={this.File_OnChange} name='Profilepicture' /><br />
                        </Fragment>
                    )
                case 1:
                    return (
                        <Fragment>
                            <Typography variant="h3" align='center' gutterBottom>
                                Registrasi Data Toko
                            </Typography>
                            <Typography variant="subtitle1" align='center' gutterBottom>
                                Hanya bisa digunakan pertama kali
                            </Typography>
                            <TextField style={st_textfield} variant='outlined' type='text' onChange={this.onChange} label='Nama Toko' name='NamaToko' value={NamaToko} required />
                            <TextField style={st_textfield} variant='outlined' type='text' onChange={this.onChange} label='Alamat' name='Alamat' value={Alamat} required />
                            <TextField style={st_textfield} variant='outlined' type='text' onChange={this.onChange} label='Kontak' name='Kontak' value={Kontak} />
                            <label>Logo:</label><br />
                            <input type='file' accept='image/*' onChange={this.File_OnChange} name='Logo' /><br />
                        </Fragment>
                    )
                default:
                    return 'Unknown stepIndex'
            }
        }
        return (
            <Fragment>
                <Container maxWidth='sm' style={st_container} >
                    <Stepper activeStep={this.state.activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        {this.state.activeStep === steps.length ? (
                            <Fragment>
                                <form onSubmit={this.onSubmit}>
                                    <Typography align='center' >Kirim Form Registrasi</Typography>
                                    <Typography align='center' >
                                        <Button variant='outlined' color="secondary" style={MUI_HorizontalsmButtonMargin} onClick={this.handleReset}>Reset</Button>
                                        <Button variant="outlined" color='secondary' style={MUI_HorizontalsmButtonMargin} onClick={this.handleBack}>
                                                Back
                                            </Button>
                                        <Button type='submit' variant="contained" color="primary" style={MUI_HorizontalsmButtonMargin}>
                                            Registrasi
                                    </Button>
                                    </Typography>
                                </form>
                            </Fragment>
                        ) : (
                                <Fragment>
                                    {getStepContent(this.state.activeStep)}<br />
                                    {this.state.activeStep === 0 ? (
                                        <Button variant="outlined" color='secondary' style={MUI_HorizontalsmButtonMargin} onClick={this.onClickCancel} >
                                            Cancel
                                        </Button>
                                    ) : (
                                            <Button variant="outlined" color='secondary' style={MUI_HorizontalsmButtonMargin} onClick={this.handleBack}>
                                                Back
                                            </Button>
                                        )}
                                    {this.state.activeStep === steps.length - 1 ? (
                                        <Button variant="contained" color="primary" style={MUI_HorizontalsmButtonMargin} onClick={this.handleNext}
                                            disabled={((!UserName) || (!Name) || (!Password) || (Password !== ConfirmPassword) || (!Cupon) || (!NamaToko) || (!Alamat)) ? true : false}
                                        >
                                            Finish
                                        </Button>
                                    ) : (
                                            <Button variant="contained" color="primary" style={MUI_HorizontalsmButtonMargin} onClick={this.handleNext}>
                                                Next
                                            </Button>
                                        )}
                                </Fragment>
                            )}
                    </div>
                </Container>
            </Fragment >
        )
    }
}

const mapStateToProps = state => ({
    isAuth: state.Auth.isAuth,
    token: state.Auth.token,
})

export default connect(mapStateToProps, { First_Time_Use })(withTheme(FirsTimeUse))
