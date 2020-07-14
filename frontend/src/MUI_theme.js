import {
    createMuiTheme,
    createStyles,
} from '@material-ui/core'

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
        // bgcolor_dr: '#222222',
        hovercolor_lg: 'rgba(0, 0, 0, 0.04)',
        hovercolor_dr: 'rgba(255, 255, 255, 0.08)',
        // 
        navBackground_lg: '#5c4d4d',
        navBackground_dr: '#000000',
        navColor_lg: '#32e0c4',
        navColor_dr: '#a7d129',
        rotextfield_lg: '#E0E0E0',
        rotextfield_dr: '#030912',
        // rotextfield_dr : '#030303',
    },
    units: {
        minWidth_first: 980,
        hight_full: '100vh'
    },
}
////// END-INITIALSTATE

////// THEME
////// THEME-UNAUTH
export const MUI_theme_unauth_light = createMuiTheme({
    palette: {
        type: "light",
        primary: {
            main: initialMUIState.color.navColor_lg,
        },
        // text: {
        //     primary: initialMUIState.color.navColor_lg
        // },
        background: {
            default: initialMUIState.color.navBackground_lg
        }
    },
    customTheme: {
        loginpage: {
            background: initialMUIState.color.bgcolor_lg,
            // color: initialMUIState.color.navColor_lg,
        }
    }
})
export const MUI_theme_unauth_dark = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: initialMUIState.color.navColor_dr,
        },
        // text: {
        //     primary: initialMUIState.color.navColor_dr
        // },
        background: {
            default: initialMUIState.color.navBackground_dr,
        }
    },
    customTheme: {
        loginpage: {
            background: initialMUIState.color.bgcolor_dr,
        },
    }
})
////// END-THEME-UNAUTH
////// THEME-AUTH
////// THEME-MUI_theme_auth_light
export const MUI_theme_auth_light = createMuiTheme({
    palette: {
        type: "light",
        // primary: {
        //     main: initialMUIState.color.blue,
        // },
        // secondary: {
        //     main: initialMUIState.color.orange,
        // },
        action: {
            hover: initialMUIState.color.hovercolor_lg,
            // hover:'red',
        },
        background: {
            default: initialMUIState.color.bgcolor_lg
        }
    },
    customTheme: {
        navbar: {
            background: initialMUIState.color.navBackground_lg,
            color: initialMUIState.color.navColor_lg,
        },
        navbartext: {
            color: initialMUIState.color.navColor_lg,
        },
        readonlytextfield: {
            backgroundColor: initialMUIState.color.rotextfield_lg,
        },
        menupaper: {
            background: initialMUIState.color.navBackground_lg,
            color: initialMUIState.color.navColor_lg,
        },
        tablehead: {
            background: initialMUIState.color.rotextfield_lg,
        }
    }
})

////// THEME-MUI_theme_auth_dark
export const MUI_theme_auth_dark = createMuiTheme({
    palette: {
        type: "dark",
        // primary: {
        //     main: initialMUIState.color.orange,
        // },
        // secondary: {
        //     main: initialMUIState.color.blue,
        // },
        action: {
            hover: initialMUIState.color.hovercolor_dr,
        },
        background: {
            default: initialMUIState.color.bgcolor_dr,
        },
    },
    customTheme: {
        navbar: {
            background: initialMUIState.color.navBackground_dr,
            color: initialMUIState.color.navColor_dr,
        },
        navbartext: {
            color: initialMUIState.color.navColor_dr,
        },
        readonlytextfield: {
            backgroundColor: initialMUIState.color.rotextfield_dr,
        },
        menupaper: {
            background: initialMUIState.color.navBackground_dr,
            color: initialMUIState.color.navColor_dr,
        },
        tablehead: {
            background: initialMUIState.color.rotextfield_dr,
        }
    }
})
////// END-THEME-AUTH
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
export const MUI_FullWidth = ({
    width: '100%',
})
export const MUI_HalfWidth = ({
    width: '40%',
})
export const MUI_VerticalMargin = ({
    marginTop: '10px',
    marginBottom: '10px',

})
export const MUI_HorizontalMargin = ({
    marginLeft: '10px',
    marginRight: '10px',
})
export const MUI_HorizontalHalfMargin = ({
    marginLeft: '5%',
    marginRight: '5%',
})
export const MUI_HorizontalsmButtonMargin = ({
    marginLeft: '5px',
    marginRight: '5px',
})
export const MUI_Shadown = ({
    boxShadow: '2px 0 10px -3px #010101',
})
////// END-STYLE-GLOBAL

////// STYLE
////// STYLE-LOGINPAGE
export const MUI_st_Login_Container = ({
    // border:'1px solid red',
    marginTop: '5%',
    borderRadius: '30px',
    boxShadow: '2px 0 10px -3px #010101',
    paddingTop: '20px',
    paddingBottom: '40px',
    // minHeight:'100vh',
})
////// END-STYLE-LOGINPAGE
////// STYLE-NAV
export const MUI_st__Container_SideNav = ({
    // border: '1px solid red',
    marginLeft: '10%',
    marginRight: '0',
    width: '90%',
    // minHeight:'100vh',
    padding: '1%',
})
export const MUI_st__Container_FlatNav = ({
    // border: '1px solid red',
    padding: '1%',
})
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
////// END-STYLE-NAV-SIDENAV
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
////// END-STYLE-NAV

////// STYLE-MENU
export const MUI_st_Menu_Paper = ({
    height: '180px',
    width: '180px',
    alignItems: 'center',
    textAlign: 'center',
    padding: '10%',
    paddingTop: '35%',
    borderRadius: '30px',
    boxShadow: '2px 0 10px -3px #010101',
})
////// END-STYLE-MENU

////// STYLE-ACCOUNT
export const MUI_st_Account_Container = ({
    // border:'1px solid red',
    marginTop: '5%',
    borderRadius: '30px',
    boxShadow: '2px 0 10px -3px #010101',
    paddingTop: '20px',
    paddingBottom: '40px',
})
////// STYLE-ACCOUNT-ACCOUNTDETAIL
export const MUI_st_AccountDetail_Avatar = ({
    // border: '1px solid red',
    width: '25vh',
    height: '25vh',
    // marginTop: '-10px',
    marginRight: 'auto',
    marginBottom: '20px',
    marginLeft: 'auto',
    display: 'block',
    position: 'relative',
    zIndex: 10
})
export const MUI_st_AccountDetail_TextField = ({
    width: '100%',
    marginBottom: '20px',
    boxShadow: '2px 0 10px -7px #010101',
})
////// END-STYLE-ACCOUNT-ACCOUNTDETAIL
////// END-STYLE-ACCOUNT
////// END-STYLE