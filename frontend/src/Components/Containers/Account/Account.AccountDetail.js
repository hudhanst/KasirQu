import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Avatar, TextField, Button } from '@material-ui/core'

import { withTheme } from '@material-ui/core/styles'
import { MUI_st_AccountDetail_Avatar, MUI_st_AccountDetail_TextField, MUI_FullWidth, MUI_VerticalMargin } from '../../../MUI_theme'

class AccountDetail extends React.Component {
    onClickLogOut = () => {
        window.location.href = '/logout'
    }
    render() {
        const theme = this.props.theme
        const User = this.props.User

        // const image = process.env.PUBLIC_URL + '/IMG/logo.png'
        const image = null
        const st_textfield = { ...MUI_st_AccountDetail_TextField, ...theme.customTheme.readonlytextfield }
        const st_button = { ...MUI_FullWidth, ...MUI_VerticalMargin }
        // console.log(User)
        return (
            <Fragment>
                <Avatar alt="Remy Sharp" src={image ? image : null} style={MUI_st_AccountDetail_Avatar} />
                <form>
                    <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='User Name' name='UserName' value='hellow world!!!' />
                    <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Name' name='Name' value='hellow world!!!' />
                    <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='password' label='Password' name='password' value='hellow world!!!' />
                </form>
                <hr />
                {User ?
                    (
                        <Fragment>
                            <hr />
                        </Fragment>
                    ) : null
                }
                <Button variant="outlined" style={st_button} color='primary' size="large" type='submit' >
                    Update
                </Button>
                <Button variant="outlined" style={st_button} color='secondary' size="large" type='submit' onClick={this.onClickLogOut} >
                    Log Out
                </Button>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    User: state.Auth.User,
})

export default connect(mapStateToProps, {})(withTheme(AccountDetail))