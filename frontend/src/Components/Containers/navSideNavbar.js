import React from 'react'

import { Link, BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { useTheme } from "@material-ui/core/styles"
import { MUI_st_navSideNavbar__, MUI_st_navSideNavbar_Link, MUI_st_navSideNavbar_BottomNavigation } from '../../MUI_theme'
import logo from '../../IMG/logo.png'

import ToggleLightNight from './Toggle_LightNight'

import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone'
import StorageTwoToneIcon from '@material-ui/icons/StorageTwoTone'
import LiveHelpTwoToneIcon from '@material-ui/icons/LiveHelpTwoTone'
import AccountBoxTwoToneIcon from '@material-ui/icons/AccountBoxTwoTone'

const NavSideNavbar = (props) => {
    const theme = useTheme()
    // const logo = process.env.PUBLIC_URL + '/IMG/logo.png'
    const st_nav = { ...MUI_st_navSideNavbar__, ...theme.customTheme.navbar, }
    const st_btnnav = { ...MUI_st_navSideNavbar_BottomNavigation, ...theme.customTheme.navbar, }
    return (
        // <nav className='NavSideNavbar'>
        <nav style={st_nav}>
            <Link href='#/' style={MUI_st_navSideNavbar_Link} underline='none' color='primary'>
                <BottomNavigation showLabels style={st_btnnav}>
                    <BottomNavigationAction icon={<img src={logo} alt='logo kasirqu' className='Navbar-Logo' />} style={theme.customTheme.navbartext} >
                    </BottomNavigationAction >
                </BottomNavigation>
            </Link>
            <Link href='#/transaksi' style={MUI_st_navSideNavbar_Link} underline='none'>
                <BottomNavigation showLabels style={st_btnnav}>
                    <BottomNavigationAction label="Transaksi" icon={<ShoppingCartTwoToneIcon style={theme.customTheme.navbar} />} style={theme.customTheme.navbartext} >
                    </BottomNavigationAction >
                </BottomNavigation>
            </Link>
            <Link href='#/barang' style={MUI_st_navSideNavbar_Link} underline='none'>
                <BottomNavigation showLabels style={st_btnnav}>
                    <BottomNavigationAction label="Barang" icon={<StorageTwoToneIcon style={theme.customTheme.navbar} />} style={theme.customTheme.navbartext} >
                    </BottomNavigationAction >
                </BottomNavigation>
            </Link>
            <Link href='#/help' style={MUI_st_navSideNavbar_Link} underline='none'>
                <BottomNavigation showLabels style={st_btnnav}>
                    <BottomNavigationAction label="Help" icon={<LiveHelpTwoToneIcon style={theme.customTheme.navbar} />} style={theme.customTheme.navbartext} >
                    </BottomNavigationAction >
                </BottomNavigation>
            </Link>
            <Link href='#/account' style={MUI_st_navSideNavbar_Link} underline='none'>
                <BottomNavigation showLabels style={st_btnnav}>
                    <BottomNavigationAction label="Account" icon={<AccountBoxTwoToneIcon style={theme.customTheme.navbar} />} style={theme.customTheme.navbartext} >
                    </BottomNavigationAction >
                </BottomNavigation>
            </Link>
            <ToggleLightNight isDarkMode={props.isDarkMode} />
        </nav>
    )
}

export default NavSideNavbar