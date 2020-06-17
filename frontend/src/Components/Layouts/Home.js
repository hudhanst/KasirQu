import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import BreadCrumbs from '../Containers/BreadCrumbs'
import Menu from '../Containers/Menu'

import SettingsApplicationsTwoToneIcon from '@material-ui/icons/SettingsApplicationsTwoTone'

import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone'
import LocalMallTwoToneIcon from '@material-ui/icons/LocalMallTwoTone'

import StorageTwoToneIcon from '@material-ui/icons/StorageTwoTone'
import CategoryTwoToneIcon from '@material-ui/icons/CategoryTwoTone'
import PlaylistAddTwoToneIcon from '@material-ui/icons/PlaylistAddTwoTone'

import LiveHelpTwoToneIcon from '@material-ui/icons/LiveHelpTwoTone'
import AttachMoneyTwoToneIcon from '@material-ui/icons/AttachMoneyTwoTone'
import TrendingUpTwoToneIcon from '@material-ui/icons/TrendingUpTwoTone'

import AccountBoxTwoToneIcon from '@material-ui/icons/AccountBoxTwoTone'
import RecentActorsTwoToneIcon from '@material-ui/icons/RecentActorsTwoTone'
import StoreTwoToneIcon from '@material-ui/icons/StoreTwoTone'

class Home extends React.Component {
    render() {
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
                        name: 'Belanja',
                        link: 'transaksi/belanja',
                        icon: <LocalMallTwoToneIcon />,
                        type: 'Privacry',
                        // type: 'nonPrivacry',
                    },
                    {
                        name: 'Import/Export Transaksi',
                        link: 'transaksi/importexport',
                        icon: <SettingsApplicationsTwoToneIcon />,
                        type: 'SuperPrivacry',
                        // type: 'nonPrivacry',
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
                        name: 'List Barang',
                        link: 'barang',
                        icon: <StorageTwoToneIcon />,
                        type: 'nonPrivacry',
                    },
                    {
                        name: 'Kategori Barang',
                        link: 'barang/barangcategory',
                        icon: <CategoryTwoToneIcon />,
                        type: 'Privacry',
                        // type: 'nonPrivacry',
                    },
                    {
                        name: 'Konfigurasi Barang',
                        link: 'barang/barangcategory',
                        icon: <PlaylistAddTwoToneIcon />,
                        type: 'Privacry',
                        // type: 'nonPrivacry',
                    },
                    {
                        name: 'Import/Export Barang',
                        link: 'transaksi/importexport',
                        icon: <SettingsApplicationsTwoToneIcon />,
                        type: 'SuperPrivacry',
                        // type: 'nonPrivacry',
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
                    {
                        name: 'Laporan Penjualan Bulanan',
                        link: 'help/penjualanbulanan',
                        icon: <AttachMoneyTwoToneIcon />,
                        type: 'Privacry',
                        // type: 'nonPrivacry',
                    },
                    {
                        name: 'Grafik Report',
                        link: 'help/grafikreport',
                        icon: <TrendingUpTwoToneIcon />,
                        type: 'Privacry',
                        // type: 'nonPrivacry',
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
                    {
                        name: 'List User',
                        link: 'account/userlist',
                        icon: <RecentActorsTwoToneIcon />,
                        type: 'Privacry',
                        // type: 'nonPrivacry',
                    },
                    {
                        name: 'Tentang Toko',
                        link: 'account/tentang',
                        icon: <StoreTwoToneIcon />,
                        type: 'SuperPrivacry',
                        // type: 'nonPrivacry',
                    },
                ]
            },

        ]

        const User = this.props.User
        return (
            <Fragment>
                <BreadCrumbs breadcrumbs={breadcrumbs} />
                {
                    menuitems.map((menuitem, index) => (
                        <Menu key={index} menu={menuitem} User={User} />
                    ))
                }
            </Fragment >
        )
    }
}

const mapStateToProps = state => ({
    User: state.Auth.User,
})

export default connect(mapStateToProps, {})(Home)