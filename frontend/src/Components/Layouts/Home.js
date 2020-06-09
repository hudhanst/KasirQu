import React, { Fragment } from 'react'

import BreadCrumbs from '../Containers/BreadCrumbs'
import Menu from '../Containers/Menu'

import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone'
import StorageTwoToneIcon from '@material-ui/icons/StorageTwoTone'
import LiveHelpTwoToneIcon from '@material-ui/icons/LiveHelpTwoTone'
import AccountBoxTwoToneIcon from '@material-ui/icons/AccountBoxTwoTone'

const Home = () => {
    const breadcrumbs = []
    const menuitems = [
        {
            menuheader: {
                name: 'Transaksi',
                icon: <ShoppingCartTwoToneIcon />
            },
            menuitems: [
                {
                    name: 'Transaksi',
                    link: 'transaksi',
                    icon: <ShoppingCartTwoToneIcon />,
                    type: 'nonPrivacry',
                },
                {
                    name: 'Coba',
                    link: 'coba',
                    type: 'Privacry',
                },
                {
                    name: 'Coba1',
                    link: 'coba1',
                    type: 'SuperPrivacry',
                },
            ]
        },
        {
            menuheader: {
                name: 'Barang',
                icon: <StorageTwoToneIcon />
            },
            menuitems: [
                {
                    name: 'Barang',
                    link: 'barang',
                    icon: <StorageTwoToneIcon />,
                    type: 'nonPrivacry',
                },
            ]
        },
        {
            menuheader: {
                name: 'Help',
                icon: <LiveHelpTwoToneIcon />
            },
            menuitems: [
                {
                    name: 'Help',
                    link: 'help',
                    icon: <LiveHelpTwoToneIcon />,
                    type: 'nonPrivacry',
                },
            ]
        },
        {
            menuheader: {
                name: 'Account',
                icon: <AccountBoxTwoToneIcon />
            },
            menuitems: [
                {
                    name: 'Account',
                    link: 'account',
                    icon: <AccountBoxTwoToneIcon />,
                    type: 'nonPrivacry',
                },
            ]
        },
        
    ]

    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            {menuitems.map((menuitem, index) => (
                <Menu key={index} menu={menuitem} />
            ))}
        </Fragment>
    )
}

export default Home