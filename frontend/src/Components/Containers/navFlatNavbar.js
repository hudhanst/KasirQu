import React, { Fragment } from 'react'

import { AppBar, Toolbar, IconButton, Link, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core'

import { useTheme } from "@material-ui/core/styles"
import { MUI_st_navFlatNavbar_logo, MUI_st_navFlatNavbar_logo_IMG } from '../../MUI_theme'

import ToggleLightNight from './Toggle_LightNight'

import MenuIcon from '@material-ui/icons/Menu'
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone'
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone'
import StorageTwoToneIcon from '@material-ui/icons/StorageTwoTone'
import LiveHelpTwoToneIcon from '@material-ui/icons/LiveHelpTwoTone'
import AccountBoxTwoToneIcon from '@material-ui/icons/AccountBoxTwoTone'

const NavFlatNavbar = (props) => {
    const theme = useTheme()
    const [state, setState] = React.useState({
        isDrawerOpen: false,
    })
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, isDrawerOpen: open });
    }
    const drawerlist = (
        <div>
            <List style={theme.customTheme.navbar}>
                <Link href='/' underline='none' style={theme.customTheme.navbar}>
                    <ListItem button >
                        <ListItemIcon style={theme.customTheme.navbar} ><HomeTwoToneIcon /> </ListItemIcon>
                        <ListItemText primary='Home' />
                    </ListItem>
                </Link>
                <Divider />
                <Link href='/transaksi' underline='none' style={theme.customTheme.navbar}>
                    <ListItem button >
                        <ListItemIcon style={theme.customTheme.navbar}><ShoppingCartTwoToneIcon /> </ListItemIcon>
                        <ListItemText primary='Transaksi' />
                    </ListItem>
                </Link>
                <Divider />
                <Link href='/barang' underline='none' style={theme.customTheme.navbar}>
                    <ListItem button >
                        <ListItemIcon style={theme.customTheme.navbar}><StorageTwoToneIcon /> </ListItemIcon>
                        <ListItemText primary='Barang' />
                    </ListItem>
                </Link>
                <Divider />
                <Link href='/help' underline='none' style={theme.customTheme.navbar}>
                    <ListItem button >
                        <ListItemIcon style={theme.customTheme.navbar}><LiveHelpTwoToneIcon /> </ListItemIcon>
                        <ListItemText primary='Help' />
                    </ListItem>
                </Link>
                <Divider />
                <Link href='/account' underline='none' style={theme.customTheme.navbar}>
                    <ListItem button >
                        <ListItemIcon style={theme.customTheme.navbar}><AccountBoxTwoToneIcon /> </ListItemIcon>
                        <ListItemText primary='Account' />
                    </ListItem>
                </Link>
                <Divider />
            </List>
        </div>
    )
    const logo = process.env.PUBLIC_URL + '/IMG/logo.png'
    return (
        <div >
            <Fragment >
                <AppBar position="fixed" style={theme.customTheme.navbar}>
                    {/* <AppBar position="sticky"> */}
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Link style={MUI_st_navFlatNavbar_logo} href='/'>
                            <img src={logo} alt='logo kasirqu' style={MUI_st_navFlatNavbar_logo_IMG} />
                        </Link>
                        <ToggleLightNight isDarkMode={props.isDarkMode} />
                    </Toolbar>
                </AppBar>
                <Toolbar />
                {/* <Toolbar /> */}
            </Fragment>
            <Fragment >
                <Drawer
                    anchor='top'
                    open={state.isDrawerOpen}
                    onClose={toggleDrawer(false)}
                >
                    {state.isDrawerOpen ? drawerlist : null}
                </Drawer>
            </Fragment>
        </div>
    )
}

export default NavFlatNavbar