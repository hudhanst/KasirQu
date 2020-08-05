import React, { Fragment } from 'react'

import { Typography, Paper, List, ListItem, Link, Divider } from '@material-ui/core'

import { ListSearching } from '../../Containers/Searching'

import BreadCrumbs from '../../Containers/BreadCrumbs'
import { DataTidakDitemukan } from '../../Containers/Page404'

const Help = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }]
    const ListItems = [
        ////// User
        {
            ListLink: 'help/tingkatan_akun',
            TypographyText: 'Apa itu Tingkatan Akun?',
        },
        {
            ListLink: 'help/perbedaan_tingkatan_akun',
            TypographyText: 'Apa Saja Perbedaan Antara Tingkatan Akun?',
        },
        {
            ListLink: 'help/tambah_user',
            TypographyText: 'Bagaimana Cara Menambah User?',
        },
        {
            ListLink: 'help/update_user',
            TypographyText: 'Bagaimana Cara Mengedit User Detail?',
        },
        {
            ListLink: 'help/delete_user',
            TypographyText: 'Bagaimana Cara Menghapus User Detail?',
        },
        {
            ListLink: 'help/update_toko',
            TypographyText: 'Bagaimana Cara Mengecek atau Mengupdate Toko Detail?',
        },
        {
            ListLink: 'help/history',
            TypographyText: 'Bagaimana Cara Mengecek atau MengExport History?',
        },
        ////// Help
        {
            ListLink: 'help/incomereport_help',
            TypographyText: 'Bagaimana Cara Mengecek Pendapatan Bulanan?',
        },
        {
            ListLink: 'help/outcomereport_help',
            TypographyText: 'Bagaimana Cara Mengecek Pengeluaran Bulanan?',
        },
        {
            ListLink: 'help/graph_help',
            TypographyText: 'Bagaimana Cara Mengecek Aset, Uang Masuk, Uang Keluar, Uang Lose, Intensitas Transaksi, Intensitas Barang Transaksi?',
        },
        ////// Barang
        {
            ListLink: 'help/barang_list',
            TypographyText: 'Bagaimana Cara Mengecek List Barang?',
        },
        {
            ListLink: 'help/barang',
            TypographyText: 'Bagaimana Cara Menambah, Mengedit, Menghapus Barang?',
        },
        {
            ListLink: 'help/satuan_jual_barang',
            TypographyText: 'Bagaimana Cara Menambah, Mengedit, Menghapus Satuan Jual Pada Barang?',
        },
        {
            ListLink: 'help/jenisbarang',
            TypographyText: 'Bagaimana Cara Menambah, Mengedit, Menghapus Jenis Barang?',
        },
        ////// Transaksi
        {
            ListLink: 'help/transaksi',
            TypographyText: 'Bagaimana Cara Bertransaksi?',
        },
        {
            ListLink: 'help/belanja',
            TypographyText: 'Bagaimana Cara Belanja?',
        },
        {
            ListLink: 'help/stok',
            TypographyText: 'Bagaimana Cara Menambah Stok Barang?',
        },
        {
            ListLink: 'help/transaksi_detail',
            TypographyText: 'Bagaimana Cara Melihat Detail Transaksi?',
        },
        ////// General
        {
            ListLink: 'help/import-export',
            TypographyText: 'Panduan Singkat Mengenai Import Export Barang, Jenis Barang dan Transaksi ?',
        },
        {
            ListLink: 'help/light-dark',
            TypographyText: 'Apa itu Light/Dark?',
        },
        {
            ListLink: 'help/penggunaan_help',
            TypographyText: 'Panduan Singkat Penggunaan',
        },
        {
            ListLink: 'help/tampilan_help',
            TypographyText: 'Panduan Singkat Tampilan',
        },
        {
            ListLink: 'help/tampilan_help',
            TypographyText: 'Bagaimana Jika Layar Putih Saja dan Tidak Terjadi Apa-apa?',
        },
        {
            ListLink: 'help/menu_help',
            TypographyText: 'Bagaimana Cara Bermanuver, Menu Bekerja?',
        },
        {
            ListLink: 'help/first_time_use',
            TypographyText: 'Bagaimana Cara Mengkonfigurasi Untuk Pertama Kali?',
        },
        {
            ListLink: 'help/login',
            TypographyText: 'Bagaimana Cara Masuk?',
        },
    ]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Typography align='center' variant='h2' >
                Help
            </Typography>
            <Typography align='center' variant='h2' >
                <ListSearching
                    width='l'
                    ulname='help_list'
                    label='Masukkan Topik Terkait'
                />
            </Typography>
            {ListItems && ListItems.length > 0 ? (
                <Paper style={{ marginRight: '8%', marginLeft: '5%', marginTop: '1%', padding: '10px' }} >
                    <List id='help_list'>
                        {ListItems.map((item, index) => (
                            <Fragment key={index}>
                                <ListItem >
                                    <Link href={item.ListLink ? `/${item.ListLink}` : '/page404'} >
                                        <Typography style={item.TypographyStyle ? item.TypographyStyle : null} variant={item.TypographyVariant ? item.TypographyVariant : 'h6'} >
                                            {item.TypographyText ? item.TypographyText : ''}
                                        </Typography>
                                    </Link>
                                </ListItem>
                                <Divider />
                            </Fragment>
                        ))}
                    </List>
                </Paper>
            ) : <DataTidakDitemukan />}
        </Fragment>
    )
}

export default Help