import React, { Fragment } from 'react'

import { Button } from '@material-ui/core'

import { MUI_FullWidth, MUI_VerticalMargin } from '../../MUI_theme'

const LogOutButton = () => {
    const onClickLogOut = () => {
        window.location.href = '/logout'
    }
    const st_button = { ...MUI_FullWidth, ...MUI_VerticalMargin }
    return (
        <Fragment>
            <Button variant="outlined" style={st_button} color='secondary' size="large" type='submit' onClick={onClickLogOut} >
                Log Out
                </Button>
        </Fragment>
    )
}

export default LogOutButton