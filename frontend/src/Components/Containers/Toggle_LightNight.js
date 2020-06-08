import React from 'react'

import Store from '../../Store/Store'

import { useTheme } from "@material-ui/core/styles"

import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

export const ToggleLightNight = (props) => {
    const theme = useTheme()
    const [isDarkMode, setChecked] = React.useState((props.isDarkMode === true || props.isDarkMode === 'true') ? true : false)
    const toggleDarkMode = (isDarkMode, dispatch) => {
        setChecked((prev) => !prev)
        Store.dispatch({
            type: "DARKMODE_CONFIG",
            payload: !isDarkMode
        })
    }
    return (
        <FormControl component="fieldset">
            <FormControlLabel
                value="bottom"
                control={<Switch checked={isDarkMode} onChange={() => toggleDarkMode(isDarkMode)} style={theme.customTheme.navbartext} />}
                label="Light/Dark"
                labelPlacement="bottom"
            />
        </FormControl>
    )
}

export default ToggleLightNight