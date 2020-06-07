import { createMuiTheme, createStyles } from '@material-ui/core'

////// INITIALSTATE
export const initialMUIState = {
    color: {
        // brown and grey
        // https://colorhunt.co/palette/136145
        // dark and green
        // https://colorhunt.co/palette/130443
        // blue light
        // https://colorhunt.co/palette/189745
        // pink
        // https://colorhunt.co/palette/189874
        orange: '#cf7500',
        blue: '#1976d2',
        navGrey: '#2A2E35',

        // bgcolor_lg: '#f2f1e7',
        bgcolor_lg: '#eeeeee',
        // bgcolor_lg: '#faeee7',
        // bgcolor_lg: '#e7f5f2',
        // bgcolor_lg: '#f0eec9',

        // bgcolor_dr: '#5c4d4d',
        // bgcolor_dr: '#393e46',
        // bgcolor_dr: '#2A2E35',
        bgcolor_dr: '#222831',
        navBackground_lg: '#5c4d4d',
        navBackground_dr: '#000000',
        navColor_lg: '#32e0c4',
        navColor_dr: '#a7d129',
    },
    units: {
        minWidth_first: 980,
        hight_full: '100vh'
    },
}
////// END-INITIALSTATE

////// THEME
////// THEME-MUI_theme_light
export const MUI_theme_light = createMuiTheme({
    palette: {
        type: "light",
        // primary: {
        //     main: initialMUIState.color.blue,
        // },
        // secondary: {
        //     main: initialMUIState.color.orange,
        // },
        background: {
            default: initialMUIState.color.bgcolor_lg
        }
    },
    customTheme: {
        navbar: {
            background: initialMUIState.color.navBackground_lg,
            color: initialMUIState.color.navColor_lg,
        }
    }
})

////// THEME-MUI_theme_dark
export const MUI_theme_dark = createMuiTheme({
    palette: {
        type: "dark",
        // primary: {
        //     main: initialMUIState.color.orange,
        // },
        // secondary: {
        //     main: initialMUIState.color.blue,
        // },
        background: {
            default: initialMUIState.color.bgcolor_dr,
        },
    },
    customTheme: {
        navbar: {
            background: initialMUIState.color.navBackground_dr,
            color: initialMUIState.color.navColor_dr,
        }
    }
})
////// END-THEME

////// TEST
export const test = createStyles({
    root: {
        marginTop: 0,
        top: 0,
    }
})
////// END-TEST

////// STYLE
////// STYLE-GLOBAL
export const MUI_st__Paper = ({
    // border: '1px solid red',
    height: '100vh',
    // backgroundColor: primary,
    // marginTop:0,
    // top:0,
})

export const MUI_st__Container_SideNav = ({
    // border: '1px solid red',
    marginLeft: '10%',
    marginRight: '0',
    width: '90%',
})
export const MUI_st__Container_FlatNav = ({
    // border: '1px solid red',
})
////// END-STYLE-GLOBAL

////// STYLE
////// STYLE-NAV
////// STYLE-NAV-SIDENAV
export const MUI_st_navSideNavbar__ = ({
    // border: '1px solid red',
    height: '100vh',
    minHeight: '100vh',
    maxHeight: '100vh',
    width: '6%',
    // minWidth: '40px',
    top: 0,
    left: 0,
    marginRight: '10px',
    paddingTop: '3%',
    // background: initialMUIState.color.navBackground_dr,
    overflowX: 'visible',
    position: 'fixed',
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 99,
    boxShadow: '4px 0 10px -3px #010101',
    transition: 'left .3s ease',
})

export const MUI_st_navSideNavbar_Link = ({
    // border: '1px solid red',
    height: '15vh',
    maxHeight: '15vh',
    minHeight: '15vh',
    width: '90%',
    maxWidth: '90%',
    // minWidth: 0,
    // padding:0,
    // marginLeft: 0,
})

export const MUI_st_navSideNavbar_BottomNavigation = ({
    // border: '1px solid blue',
    height: '100%',
    maxHeight: '100%',
    minHeight: '100%',
    width: '100%',
    maxWidth: '100%',
    minWidth: 0,
    padding: 0,
    marginLeft: 0,
    // backgroundColor: initialMUIState.color.navBackground_dr,
    // alignItems: 'center',
})

// export const MUI_st_navSideNavbar_Icon = ({
//     color: initialMUIState.color.navColor_dr,
// })

// export const MUI_st_navSideNavbar_BottomNavigationAction = ({
//     color: initialMUIState.color.navColor_dr,
// })
////// STYLE-NAV-FLATNAV
export const MUI_st_navFlatNavbar_logo = ({
    height: '9vh',
    padding: '5px',
    marginLeft: '40%',
    marginRight: '43%'
})
export const MUI_st_navFlatNavbar_logo_IMG = ({
    height: '12vh',
    borderRadius: '0px 0px 20px 20px'
})
////// END-STYLE-NAV-FLATNAV
////// END-STYLE-NAV-SIDENAV
////// END-STYLE-NAV
////// END-STYLE