
import React from 'react'

import { List, Link, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core'
import { useTheme } from "@material-ui/core/styles"

import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone'
import StorageTwoToneIcon from '@material-ui/icons/StorageTwoTone'
import LiveHelpTwoToneIcon from '@material-ui/icons/LiveHelpTwoTone'
import AccountBoxTwoToneIcon from '@material-ui/icons/AccountBoxTwoTone'

const NavSideNavbar = (props) => {
    const theme = useTheme()
    const logo = process.env.PUBLIC_URL + '/IMG/logo.png'
    const stcheck = ({
        // border: '1px solid red',
        height: '100vh',
        minHeight: '100vh',
        maxHeight: '100vh',
        width: '6%',
        minWidth: '40px',
        top: 0,
        left: 0,
        // marginRight: '10px',
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
    const combaineee = { ...stcheck, ...theme.customTheme.navbar }
    const stcheck1 = ({
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
    const combaineee1 = { ...stcheck1, ...theme.customTheme.navbar }
    const stcheck2 = ({
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
    const combaineee2 = { ...stcheck2, ...theme.customTheme.navbar }
    return (
        // <List style={theme.customTheme.navbar} >
        <List style={combaineee} >
            <Link href='/' underline='none' style={combaineee1}>
                <ListItem button >
                    <ListItemIcon style={combaineee2} ><ShoppingCartTwoToneIcon /> </ListItemIcon>
                    {/* <ListItemText primary='Home' /> */}
                </ListItem>
            </Link>
            <Divider />
            <Link href='/' underline='none' style={combaineee1}>
                <ListItem button >
                    <ListItemIcon style={combaineee2} ><ShoppingCartTwoToneIcon /> </ListItemIcon>
                    {/* <ListItemText primary='Home' /> */}
                </ListItem>
            </Link>
            <Divider />
            <Link href='/' underline='none' style={combaineee1}>
                <ListItem button >
                    <ListItemIcon style={combaineee2} ><ShoppingCartTwoToneIcon /> </ListItemIcon>
                    {/* <ListItemText primary='Home' /> */}
                </ListItem>
            </Link>
            <Divider />
            <Link href='/' underline='none' style={combaineee1}>
                <ListItem button >
                    <ListItemIcon style={combaineee2} ><ShoppingCartTwoToneIcon /> </ListItemIcon>
                    {/* <ListItemText primary='Home' /> */}
                </ListItem>
            </Link>
            <Divider />
            
        </List>
    )
}

export default NavSideNavbar