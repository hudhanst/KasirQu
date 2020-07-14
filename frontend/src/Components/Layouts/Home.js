import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import BreadCrumbs from '../Containers/BreadCrumbs'
import Menu from '../Containers/Menu'

import SettingsApplicationsTwoToneIcon from '@material-ui/icons/SettingsApplicationsTwoTone'

import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone'
import LocalMallTwoToneIcon from '@material-ui/icons/LocalMallTwoTone'
import ReceiptRoundedIcon from '@material-ui/icons/ReceiptRounded'

import StorageTwoToneIcon from '@material-ui/icons/StorageTwoTone'
import CategoryTwoToneIcon from '@material-ui/icons/CategoryTwoTone'
import PlaylistAddTwoToneIcon from '@material-ui/icons/PlaylistAddTwoTone'

import LiveHelpTwoToneIcon from '@material-ui/icons/LiveHelpTwoTone'
import AttachMoneyTwoToneIcon from '@material-ui/icons/AttachMoneyTwoTone'
import EuroSymbolTwoToneIcon from '@material-ui/icons/EuroSymbolTwoTone'
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
                        name: 'List Transaksi',
                        link: 'transaksi/transaksilist',
                        icon: <ReceiptRoundedIcon />,
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
                        link: 'barang/katagoribarang',
                        icon: <CategoryTwoToneIcon />,
                        type: 'Privacry',
                        // type: 'nonPrivacry',
                    },
                    {
                        name: 'Konfigurasi Barang',
                        link: 'barang/konfigurasibarang',
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
                        name: 'Laporan Penjualan',
                        link: 'help/incomereport',
                        icon: <AttachMoneyTwoToneIcon />,
                        type: 'Privacry',
                        // type: 'nonPrivacry',
                    },
                    {
                        name: 'Laporan Belanja',
                        link: 'help/outcomereport',
                        icon: <EuroSymbolTwoToneIcon />,
                        type: 'Privacry',
                        // type: 'nonPrivacry',
                    },
                    {
                        name: 'Laporan Grafik',
                        link: 'help/graph',
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
                        name: 'Detail Toko',
                        link: 'account/tokodetail',
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