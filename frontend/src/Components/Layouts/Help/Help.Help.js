import React, { Fragment } from 'react'

import { Typography, Link, List, ListItem, ListItemText, Button, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

import BreadCrumbs from '../../Containers/BreadCrumbs'

import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded'
import CancelRoundedIcon from '@material-ui/icons/CancelRounded'

export const TextAdjustButton = (props) => {
    const AdjustTextSize = (AdditionalSize) => {
        try {
            const txt = document.getElementById(props.AdjustId)
            const style = window.getComputedStyle(txt, null).getPropertyValue('font-size')
            const currentSize = parseFloat(style)
            txt.style.fontSize = ((currentSize + (AdditionalSize) >= 10) ? (currentSize + (AdditionalSize)) : currentSize) + 'px'
        } catch (err) {
        }
    }
    return (
        <Fragment>
            <Typography align='right' >
                <Button variant='contained' onClick={() => AdjustTextSize(10)} >+</Button>
                <Button variant='contained' onClick={() => AdjustTextSize(-10)}>-</Button>
            </Typography>
        </Fragment>
    )
}

export const CreateList = (props) => {
    const Id = props.Id
    const ListData = props.ListData
    const theme = useTheme()
    return (
        <Fragment>
            <List id={Id} >
                {ListData.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            disableTypography
                        >
                            <p style={{ color: theme.palette.text.secondary }} >
                                <b style={{ color: theme.palette.text.primary }} >
                                    {item.PrimaryText ? item.PrimaryText : ''}
                                </b>
                                <br />
                                {item.SecondaryText ? item.SecondaryText : ''}
                            </p>
                            {item.NonTextContent ? item.NonTextContent : ''}
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        </Fragment>
    )
}

////// AKUN
export const Help_TingkatanAkun = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'Tingkatan Akun', link: 'help/tingkatan_akun' }]
    const Id = 'TingkatanAkun'
    const ListData = [
        {
            PrimaryText: 'Apa itu tinggkatan akun?',
            SecondaryText: 'Tingkatan akun adalah pembagian akun berdasarkan beberapa jenis, dimana setiap jenis mempunyai kemampuan/batasan tertentu dalam melakukan suatu hal',
        },
        {
            PrimaryText: 'Bagaimana cara mengecek tingkatan akun saya?',
            SecondaryText: 'Tingkatan akun dapat ditemui QuickMenu-> Account atau Menu utama ->Account',
        },
        {
            PrimaryText: 'Apa saja Tingkatan Akun yang ada?',
            SecondaryText: 'Tingkatan akun dibagi menjadi 3 katagori: kasir, admin dan superuser',
        },
        {
            PrimaryText: 'Apa perbedaan Tingkatan Akun yang satu dengan yang lain?',
            SecondaryText: (
                <Fragment>
                    Untuk melihat detail perbedaan Tingkatan Akun dapat dilihat di <b><Link href='/help/perbedaan_tingkatan_akun'>tautan ini</Link></b>
                </Fragment>
            ),
        },
    ]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Typography align='center' variant='h3' >Tingkatan Akun</Typography>
            <hr />
            <TextAdjustButton AdjustId={Id} />
            <CreateList Id={Id} ListData={ListData} />
        </Fragment >
    )
}

export const Help_PerbedaanTingkatanAkun = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'Perbedaan Tingkatan Akun', link: 'help/perbedaan_tingkatan_akun' }]
    const Id = 'PerbedaanTingkatanAkun'
    const UserAbilityList = [
        {
            Bagian: 'Transaksi',
            Actions: [
                {
                    Action: 'Menambah Transaksi',
                    Kasir: true,
                    Admin: true,
                    SuperUser: true,
                },
                {
                    Action: 'Menambah Belanja',
                    Admin: true,
                    SuperUser: true,
                },
                {
                    Action: 'Melihat List Transaksi',
                    Admin: true,
                    SuperUser: true,
                },
                {
                    Action: 'Melakukan Import/Export',
                    SuperUser: true,
                }
            ],
        },
        {
            Bagian: 'Barang',
            Actions: [
                {
                    Action: 'Melihat List Barang',
                    Kasir: true,
                    Admin: true,
                    SuperUser: true,
                },
                {
                    Action: 'Melihat List Katagori Barang',
                    Admin: true,
                    SuperUser: true,
                },
                {
                    Action: 'Melihat Detail Katagori Barang',
                    Admin: true,
                    SuperUser: true,
                },
                {
                    Action: 'Menambah Katagori Barang',
                    Admin: true,
                    SuperUser: true,
                },
                {
                    Action: 'Update Detail Katagori Barang',
                    Admin: true,
                    SuperUser: true,
                },
                {
                    Action: 'Delete Katagori Barang',
                    Admin: true,
                    SuperUser: true,
                },
                {
                    Action: 'Melihat List Konfigurasi Barang',
                    Admin: true,
                    SuperUser: true,
                },
                {
                    Action: 'Melihat Detail Barang',
                    Admin: true,
                    SuperUser: true,
                },
                {
                    Action: 'Menambah Barang',
                    Admin: true,
                    SuperUser: true,
                },
                {
                    Action: 'Update Detail Barang',
                    Admin: true,
                    SuperUser: true,
                },
                {
                    Action: 'Delete Barang',
                    Admin: true,
                    SuperUser: true,
                },
                {
                    Action: 'Melakukan Import/Export Jenis Barang',
                    SuperUser: true,
                },
                {
                    Action: 'Melakukan Import/Export Barang',
                    SuperUser: true,
                }
            ]
        },
        {
            Bagian: 'Help',
            Actions: [
                {
                    Action: 'Melihat Bantuan',
                    Kasir: true,
                    Admin: true,
                    SuperUser: true,
                },
                {
                    Action: 'Melihat Laporan Penjualan',
                    Admin: true,
                    SuperUser: true,
                },
                {
                    Action: 'Melihat Laporan Belanja',
                    Admin: true,
                    SuperUser: true,
                },
                {
                    Action: 'Melihat Laporan Grafik',
                    Admin: true,
                    SuperUser: true,
                },
            ]
        },
        {
            Bagian: 'Account',
            Actions: [
                {
                    Action: 'Melihat Detail Account Pribadi',
                    Kasir: true,
                    Admin: true,
                    SuperUser: true,
                },
                {
                    Action: 'Mengupdate Detail Account Pribadi',
                    Kasir: true,
                    Admin: true,
                    SuperUser: true,
                },
                {
                    Action: 'Melihat List Account',
                    Admin: true,
                    SuperUser: true,
                },
                {
                    Action: 'Melihat Detail Account Yang Lain',
                    Admin: true,
                    SuperUser: true,
                },
                {
                    Action: 'Menambah Account',
                    Admin: true,
                    SuperUser: true,
                },
                {
                    Action: 'Mengupdate Keseluruhan Detail Account',
                    SuperUser: true,
                },
                {
                    Action: 'Menghapus Keseluruhan Detail Account',
                    SuperUser: true,
                },
                {
                    Action: 'Melihat Detail Toko',
                    Admin: true,
                    SuperUser: true,
                },
                {
                    Action: 'Mengupdate Detail Toko',
                    SuperUser: true,
                },
                {
                    Action: 'Melihat History',
                    SuperUser: true,
                },
                {
                    Action: 'MengExpoprt History',
                    SuperUser: true,
                },
            ]
        },
    ]
    const ListData = [
        {
            PrimaryText: 'Apa itu tinggkatan akun?',
            SecondaryText: (
                <Fragment>
                    Untuk mempelajari Mengenai Tngkatan akun dapat dilihat di <b><Link href='/help/tingkatan_akun'>tautan ini</Link></b>
                </Fragment>
            ),
        },
        {
            PrimaryText: 'Apa perbedaan Tingkatan Akun yang satu dengan yang lain?',
            NonTextContent: (
                <Fragment>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' style={{ width: '5%' }} >Bagian</TableCell>
                                <TableCell align='center' style={{ width: '95%' }} >Kemampuan</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {UserAbilityList.map((item, index) => (
                                <TableRow hover key={index}>
                                    <TableCell align='left'>{item.Bagian}</TableCell>
                                    <TableCell align='right'>
                                        {item.Actions.length > 0 ? (
                                            <Table >
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align='center' style={{ width: '5%' }} >Action</TableCell>
                                                        <TableCell align='center' style={{ width: '30%' }} >KASIR</TableCell>
                                                        <TableCell align='center' style={{ width: '30%' }} >ADMIN</TableCell>
                                                        <TableCell align='center' style={{ width: '30%' }} >SUPERUSER</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {item.Actions ? item.Actions.map((item_Actions, index_Actions) => (
                                                        <TableRow hover key={index_Actions}>
                                                            <TableCell align='left'>{item_Actions.Action}</TableCell>
                                                            <TableCell align='center'>{item_Actions.Kasir ? <CheckCircleOutlineRoundedIcon style={{ color: 'green' }} /> : <CancelRoundedIcon style={{ color: 'red' }} />}</TableCell>
                                                            <TableCell align='center'>{item_Actions.Admin ? <CheckCircleOutlineRoundedIcon style={{ color: 'green' }} /> : <CancelRoundedIcon style={{ color: 'red' }} />}</TableCell>
                                                            <TableCell align='center'>{item_Actions.SuperUser ? <CheckCircleOutlineRoundedIcon style={{ color: 'green' }} /> : <CancelRoundedIcon style={{ color: 'red' }} />}</TableCell>
                                                        </TableRow>
                                                    )) : ''}
                                                </TableBody>
                                            </Table>
                                        ) : ''}

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Fragment>
            ),
        },
    ]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Typography align='center' variant='h3' >Perbedaan Tingkatan Akun</Typography>
            <hr />
            <TextAdjustButton AdjustId={Id} />
            <CreateList Id={Id} ListData={ListData} />
        </Fragment >
    )
}

export const Help_TambahUser = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'Tambah User', link: 'help/tambah_user' }]
    const Id = 'TambahUser'
    const ListData = [
        {
            PrimaryText: 'Bagaimana Cara Menambah User/Account?',
            SecondaryText: 'Untuk Menambah Akun anda perlu mengakses Menu "List User" yang dapat ditemui Di Menu Utama, Pastikan anda menggunakan Akun dengan Tingkatan Akun "Admin" atau "SuperUser". Lalu pada bagian atas tampilan anda akan menemukan tombol "Add Account"',
        },
        {
            PrimaryText: 'Bagaimana Cara Mengisi Form yang Ada?',
            NonTextContent: (
                <Fragment>
                    <p>
                        <label>
                            <b>
                                - User Name : (Require)
                            </b>
                        </label><br />
                            UserName digunakan untuk Login, UserName Wajib Diisi dan tidak bisa sama dengan yang sudah ada. UserName tidak bisa diganti kedepannya
                    </p>
                    <p>
                        <label>
                            <b>
                                - Name : (Require)
                            </b>
                        </label><br />
                        Name digunakan untuk tampilan saja, Name Wajib Diisi dan tidak bisa sama dengan yang sudah ada
                    </p>
                    <p>
                        <label>
                            <b>
                                - Password : (Require)
                            </b>
                        </label><br />
                        Password digunakan untuk kata sandi anda ketika login, Password Wajib Diisi tidak ada ketentuan mengisinya tp disarankan minimal 4 karakter
                    </p>
                    <p>
                        <label>
                            <b>
                                - Confirm Password : (Require)
                            </b>
                        </label><br />
                        Confirm Password digunakan untuk verifikasi kata sandi saat pembuatan akun, pastikan Password dan Confirm Password sama
                    </p>
                    <p>
                        <label>
                            <b>
                                - Photo Profile : (Optional)
                            </b>
                        </label><br />
                        Photo Profile digunakan hanya untuk tampilan ketika membuak halaman profile, file yang bisa diupload berformat ".jpeg .png .jpg"
                    </p>
                    <br />
                    <label><b>Tingkatan Akun:</b></label><br />
                    Untuk memahami apa itu Tingkatan Akun anda bisa mencari bantuan di menu "Help" atau mengunjungi tautan <Link href='/help/tingkatan_akun'><b>berikut</b></Link>
                    <p>
                        <label>
                            <b>
                                - KASIR :
                            </b>
                        </label><br />
                        Jika Diceklis/hijau maka akun akan memiliki Tingkatan Akun KASIR
                    </p>
                    <p>
                        <label>
                            <b>
                                - ADMIN :
                            </b>
                        </label><br />
                        Jika Diceklis/hijau maka akun akan memiliki Tingkatan Akun ADMIN
                    </p>
                    <p>
                        <label>
                            <b>
                                - SUPERUSER :
                            </b>
                        </label><br />
                        Jika Diceklis/hijau maka akun akan memiliki Tingkatan Akun SUPERUSER <br />
                        ket: hanya bisa dilakukan oleh akun SUPERUSER lainnya, disarankan akun SUPERUSER tidak terlalu banyak
                    </p>
                </Fragment>
            )
        },

    ]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Typography align='center' variant='h3' >Tambah User</Typography>
            <hr />
            <TextAdjustButton AdjustId={Id} />
            <CreateList Id={Id} ListData={ListData} />
        </Fragment>
    )
}
export const Help_UpdateUser = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'Update User', link: 'help/update_user' }]
    const Id = 'UpdateUser'
    const ListData = [
        {
            PrimaryText: 'Bagaimana Cara Saya Mengupdate Detail Akun Saya?',
            SecondaryText: 'Untuk Mengupdate Detail Akun Anda Bisa Pergi Ke "Quick Menu"->"Account" atau "Menu Utama"->"Account" lalu memilih tombol "Update" Diatas Tombol "Log Out" ',
        },
        {
            PrimaryText: 'Bagaimana Cara Saya Mengupdate Tingkatan Akun Saya?',
            SecondaryText: 'Untuk Mengupdate Tingkatan Akun Anda Perlu Masuk Dengan Akun ADMIN atau SUPERUSER ',
        },
        {
            PrimaryText: 'Bagaimana Cara Saya Mengupdate Tingkatan Akun Akun Lain?',
            SecondaryText: 'Untuk Mengupdate Tingkatan Akun Akun Lain Anda Perlu Masuk Dengan Akun SUPERUSER Lalu "Menu Utama"->"User List"->Pilih Akun yang ingin di update, lalu klik "Edit" di row/baris yang sama dengan akun yang anda pilih',
        },
        {
            PrimaryText: 'Ketentuan Update:',
            NonTextContent: (
                <Fragment>
                    <p>
                        <label>
                            <b>
                                - User Name : (Tidak Bisa Diupdate)
                            </b>
                        </label><br />
                    </p>
                    <p>
                        <label>
                            <b>
                                - Name : (Require)
                            </b>
                        </label><br />
                        Nama bisa diganti dengan nama lain yang blm digunakan, dan tidak bisa dikosongkan
                    </p>
                    <p>
                        <label>
                            <b>
                                - Mengganti Password
                            </b>
                        </label><br />
                        Untuk mengganti password centang tombol "Ganti Password" lalu masukkan password dikolom "Password" dan "Confirm Password". Pastikan Password yang dimasukkan sama di kedua field
                    </p>
                    <p>
                        <label>
                            <b>
                                - Photo Profile :
                            </b>
                        </label><br />
                        Untuk mengganti Photo Profile anda tinggal mengklik tombol "Choose File" lalu memilih file, file yang bisa diupload berformat ".jpeg .png .jpg"
                    </p>
                    <br />
                    <label><b>Tingkatan Akun:</b></label><br />
                    Untuk mengatifkan Tingkatan Akun geser ke kanan/hijau, menonaktifkan kekiri/merah <br />
                    ket: jika "Active" Di non aktifkan akun terkait tidak bisa lagi dipakai sampai diaktifkan kembali (data tidak terhapus)
                </Fragment>
            )
        },
    ]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Typography align='center' variant='h3' >Update User</Typography>
            <hr />
            <TextAdjustButton AdjustId={Id} />
            <CreateList Id={Id} ListData={ListData} />
        </Fragment>
    )
}
export const Help_DeleteUser = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'Delete User', link: 'help/delete_user' }]
    const Id = 'DeleteUser'
    const ListData = [
        {
            PrimaryText: 'Bisakah Saya Menghapus Akun Saya?',
            SecondaryText: 'Untuk Menghapus Akun Pribadi Bisa Meminta Bantuan SUPERUSER, karna selain SUPERUSER tidak bisa menghapus akun',
        },
        {
            PrimaryText: 'Bagaimana Cara Menghapus Akun?',
            SecondaryText: 'Untuk Menghapus Akun Anda Perlu Masuk Dengan Akun SUPERUSER, Lalu "Menu Utama"->"User List" di barisan akun yang anda pilih klik tombol "Delete" dan konfirmasi dengan menekan tombol "Delete" dibagian bawah Modals',
        },
        {
            PrimaryText: 'Apakah Menghapus Akun Berresiko?',
            SecondaryText: 'Sejauh ini tidak ada resiko penghapusan akun selain akun yang berkaitan tidak bisa digunakan lagi',
        },
        {
            PrimaryText: 'Bagaimana Jika Hanya ada satu akun SUPERUSER dan saya menghapusnya?',
            SecondaryText: 'Semua Aksi yang membutuhkan SUPERUSER tidak bisa dilakukan, termasuk membuat akun SUPERUSER lainnya, jadi hati hati dalam hal ini',
        },
    ]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Typography align='center' variant='h3' >Delete User</Typography>
            <hr />
            <TextAdjustButton AdjustId={Id} />
            <CreateList Id={Id} ListData={ListData} />
        </Fragment>
    )
}
export const Help_UpdateToko = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'Update Toko', link: 'help/update_toko' }]
    const Id = 'UpdateToko'
    const ListData = [
        {
            PrimaryText: 'Bagaimana Cara MengUpdate Detail Toko?',
            SecondaryText: 'Anda harus masuk dengan akun SUPERUSER lalu "Menu Utama"->"Detail Toko" klik tombol "Update" pada bagian bawah page',
        },
        {
            PrimaryText: 'Apakah Ada Ketentuan Khusus Dalam Mengisi/Update Form?',
            SecondaryText: 'Tidak ada, Pastikan Semua form terisi, dan form "Logp" diisi dengan file gambar (.jpg .jpeg .png dll)',
        },
    ]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Typography align='center' variant='h3' >Update Toko</Typography>
            <hr />
            <TextAdjustButton AdjustId={Id} />
            <CreateList Id={Id} ListData={ListData} />
        </Fragment>
    )
}
export const Help_History = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'History', link: 'help/history' }]
    const Id = 'History'
    const ListData = [
        {
            PrimaryText: 'Apa itu History?',
            SecondaryText: 'History adalah catatan semua aktifitas penting yang terjadi di aplikasi ini',
        },
        {
            PrimaryText: 'Apa Saja yang Termasuk  History?',
            SecondaryText: 'Semua aktifitas penting: Tambah, Update, Delete, Transaksi, Belanja dll',
        },
        {
            PrimaryText: 'Bagaimana Mengakses History?',
            SecondaryText: 'Untuk Mengakses History anda harus masuk dengan akun SUPERUSER lalu "Menu Utama"->"History"',
        },
        {
            PrimaryText: 'Mengapa Halaman History Saya Menampilkan "Data Tidak Ditemukan"?',
            SecondaryText: 'Halaman History secara default menampilkan catatan perhari, jadi jika anda melihat seperti itu maka pada hari tersebut tidak ada catatan',
        },
        {
            PrimaryText: 'Bagaimana Jika Saya Ingin Mencari History Yang Lampau?',
            SecondaryText: 'Pada bagian dibawah tulisan "History" ada lambang panah klik dan anda bisa memilih (konfigurasi) History apa yang anda cari',
        },
        {
            PrimaryText: 'PERINGATAN',
            SecondaryText: 'Jika data terlalu banyak proses mungkin akan memakan waktu yang lumayan lama, dan jika anda mencoba menshorting dengan data yang sangat banyak ada kemungkinan aplikasi freez untuk sementara karna sangking banyaknya data',
        },
    ]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Typography align='center' variant='h3' >History</Typography>
            <hr />
            <TextAdjustButton AdjustId={Id} />
            <CreateList Id={Id} ListData={ListData} />
        </Fragment>
    )
}

////// HELP
export const Help_IncomeReport = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'Income Report', link: 'help/incomereport_help' }]
    const Id = 'Help_IncomeReport'
    const ListData = [
        {
            PrimaryText: 'Apa itu Income Report?',
            SecondaryText: 'Income Report adalah sistem laporan bulanan (bulan ini) yang menampilkan data statistik mengenai uang masuk ke aplikasi. Income Report terbagi menjadi dua "Keuangan" dan "Barang"',
        },
        {
            PrimaryText: 'Bagaimana Cara Membuka Income Report?',
            SecondaryText: 'Anda harus Masuk Dengan Akun ADMIN atau SUPERUSER lalu "Menu Utama"->"Laporan Penjualan"',
        },
        {
            PrimaryText: 'Apa itu Keuangan Penjualan Bulanan?',
            SecondaryText: 'Menampilkan Laporan Pendapatan Keuangan Bulana yang berisi Total Keuangan, Total Potongan dan Total Diskon Per Hari',
        },
        {
            PrimaryText: 'Apa itu Penjualan Barang Bulanan?',
            SecondaryText: 'Menampilkan Laporan Penjualan Barang Bulana yang berisi Total Penjualan Barang dalam bentuk satuan Per Hari',
        },
    ]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Typography align='center' variant='h3'>Income Report</Typography>
            <hr />
            <TextAdjustButton AdjustId={Id} />
            <CreateList Id={Id} ListData={ListData} />
        </Fragment>
    )
}
export const Help_OutcomeReport = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'Outcome Report', link: 'help/outcomereport_help' }]
    const Id = 'Help_OutcomeReport'
    const ListData = [
        {
            PrimaryText: 'Apa itu Outcome Report?',
            SecondaryText: 'Outcome Report adalah sistem laporan bulanan (bulan ini) yang menampilkan data statistik mengenai uang Keluar. Outcome Report terbagi menjadi dua "Keuangan" dan "Barang"',
        },
        {
            PrimaryText: 'Bagaimana Cara Membuka Outcome Report?',
            SecondaryText: 'Anda harus Masuk Dengan Akun ADMIN atau SUPERUSER lalu "Menu Utama"->"Laporan Belanja"',
        },
        {
            PrimaryText: 'Apa itu Pengeluaran Modal Bulanan?',
            SecondaryText: 'Menampilkan Laporan Pembelanjaan Modal Bulana yang berisi Total Modal Per Hari',
        },
        {
            PrimaryText: 'Apa itu Pembelian Barang Bulanan?',
            SecondaryText: 'Menampilkan Laporan Pembelanjaan Barang Bulana yang berisi Total Penjualan Barang dalam bentuk satuan Per Hari',
        },
    ]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Typography align='center' variant='h3'>Outcome Report</Typography>
            <hr />
            <TextAdjustButton AdjustId={Id} />
            <CreateList Id={Id} ListData={ListData} />
        </Fragment>
    )
}
export const Help_Graph = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'Graph', link: 'help/graph_help' }]
    const Id = 'Help_Graph'
    const ListData = [
        {
            PrimaryText: 'Apa itu Graph?',
            SecondaryText: 'Graph adalah laporan statistik mengenai berbagai macam hal yang terkait dengan aplikasi. secara default ditampilkan secara bulanan(bulan ini. kecuali aset)',
        },
        {
            PrimaryText: 'Bagaimana Cara MengAkses Graph?',
            SecondaryText: 'Anda Harus Masuk dengan Akun ADMIN atau SUPERUSER lalu "Menu Utama"->"Laporan Grafik"',
        },
        {
            PrimaryText: 'Bagaimana Jika Saya Ingin Mencari Data yang Lain/Spesifik?',
            SecondaryText: 'Disetiap Halaman Pada Graph kami sudah menyiapkan pencarian dengan cara mengkik tombol panah kebawah, lalu anda bisa melakukan pencarian/filteran sesuak anda',
        },
        {
            PrimaryText: 'Apa itu Cek Aset?',
            SecondaryText: 'Halaman yang menampilkan statistik Aset yang anda miliki',
        },
        {
            PrimaryText: 'Apa itu Cek Uang Masuk?',
            SecondaryText: 'Halaman yang menampilkan statistik Pendapatan anda melalui penjualan',
        },
        {
            PrimaryText: 'Apa itu Cek Uang Keluar?',
            SecondaryText: 'Halaman yang menampilkan statistik Pengeluaran anda melalui pembelian/belanja modal',
        },
        {
            PrimaryText: 'Apa itu Cek Uang Lose?',
            SecondaryText: 'Halaman yang menampilkan statistik Pendapatan anda yang terpotong karna pemberian diskon/potongan harga pada transaksi',
        },
        {
            PrimaryText: 'Apa itu Intensitas Transaksi?',
            SecondaryText: 'Halaman yang menampilkan statistik Jumlah banyak Transksi yang terjadi',
        },
        {
            PrimaryText: 'Apa itu Intensitas Barang Transaksi?',
            SecondaryText: 'Halaman yang menampilkan statistik Jumlah banyak Barang pada Transksi',
        },
    ]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Typography align='center' variant='h3'>Graph</Typography>
            <hr />
            <TextAdjustButton AdjustId={Id} />
            <CreateList Id={Id} ListData={ListData} />
        </Fragment>
    )
}
////// BARANG
export const Help_BarangList = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'Barang List', link: 'help/barang_list' }]
    const Id = 'Help_BarangList'
    const ListData = [
        {
            PrimaryText: 'Bagaimana Cara Mengecek List Barang?',
            SecondaryText: (
                <Fragment>
                    Untuk mengecek barang anda bisa membuka "Quick Menu"-&gt;"Barang" atau "Menu Utama"-&gt;"List Barang" <br /><br />
                    Jika anda masuk Menggunakan ADMIN atau SUPERUSER anda juga bisa membuka di "Menu Utama"-&gt;"Konfigurasi Barang" Untuk tampilan yang lebih lengkap
                </Fragment>
            ),
        },

    ]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Typography align='center' variant='h3'>Barang List</Typography>
            <hr />
            <TextAdjustButton AdjustId={Id} />
            <CreateList Id={Id} ListData={ListData} />
        </Fragment>
    )
}
export const Help_Barang = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'Barang', link: 'help/barang' }]
    const Id = 'Help_Barang'
    const ListData = [
        {
            PrimaryText: 'Bagaimana Cara Mengakses Tambah, Update, Hapus Barang?',
            SecondaryText: 'Untuk melakukan hal tersebut pertama anda membutuhkan akun ADMIN atau SUPERUSER, lalu "Menu Utama"->"Konfigurasi Barang"',
        },
        {
            PrimaryText: 'Menambah Barang',
            NonTextContent: (
                <Fragment>
                    <p>
                        <label>
                            <b>
                                - Barcode : (Require)
                            </b>
                        </label><br />
                            Barcode adalah kode unik setiap produck, biasanya berisi kumpulan angka. Barcode wajib diisi, tidak bisa sama dan tidak bisa diubah kedepannya
                    </p>
                    <p>
                        <label>
                            <b>
                                - Name Barang : (Require)
                            </b>
                        </label><br />
                        Nama barang menjelaskan produk misal: "susu ultra 250ml" dsb. Nama Barang wajib diisi dan tidak bisa sama dengan yang lain
                    </p>
                    <p>
                        <label>
                            <b>
                                - Jenis Barang : (Require)
                            </b>
                        </label><br />
                        Jenis Barang merupakan bentuk pengelompokan dari barang tersebut. Jenis Barang wajib diisi dan opsi Jenis Barang Diambil dari list Jenis Barang. <br />
                         jadi jika Jenis Barang yang ingin anda masukkan tidak ada silakan tambah terlebih dahulu Jenis Barangnya
                    </p>
                    <p>
                        <label>
                            <b>
                                - "Apakah Bisa Melakukan Transasksi Satuan Desimal?"
                            </b>
                        </label><br />
                        Jika Dislide kekanan/hijau (secara default tidak) maka transaksi yang berkaitan dengan barang bisa dilakukan secara desimal.<br />
                       jika anda menghijaukan slider tersebut maka anda akan bisa menulis "0.5" atau "1.5" atau lainnya pada halaman transaksi, berguna untuk contoh kasus pembelian gula 0.5 kg x 3
                    </p>
                    <p>
                        <label>
                            <b>
                                - Keterangan : (Optional)
                            </b>
                        </label><br />
                        Menambah informasi mengenai Barang terkait, dapat dilihat ketika membuka Detail Barang
                    </p>
                    <p>
                        <label>
                            <b>
                                - Photo Profile : (Optional)
                            </b>
                        </label><br />
                        Photo Barang digunakan hanya untuk tampilan ketika membuak Detail Barang, file yang bisa diupload berformat ".jpeg .png .jpg"
                    </p>
                </Fragment>
            )
        },
        {
            PrimaryText: 'Update Barang',
            SecondaryText: 'Proses dan ketentuan mengupdate Barang hampir sama dengan Menambah Barang, hanya saja Barcode Tidak Bisa Diganti',
        },
        {
            PrimaryText: 'Delete Barang',
            SecondaryText: 'Pada baris yang sama dengan Barang Yang ingin anda hapus klik tombol "Delete" dan konfirmasi dengan Mengklik tombol "Delete"',
        },
        {
            PrimaryText: 'Apakah Ada Masalah Jika Saya Menghapus Beberapa Barang?',
            SecondaryText: 'Ada Kemungkinan "IncomeReport"/"Graph" karna data barang dianggap tidak ada, namun pada pengetesan tidak ada masalah',
        },
    ]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Typography align='center' variant='h3'>Barang</Typography>
            <hr />
            <TextAdjustButton AdjustId={Id} />
            <CreateList Id={Id} ListData={ListData} />
        </Fragment>
    )
}
export const Help_SatuanJualBarang = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'Satuan Jual Barang', link: 'help/satuan_jual_barang' }]
    const Id = 'Help_SatuanJualBarang'
    const ListData = [
        {
            PrimaryText: 'Bagaimana Cara Menambah Satuan Jual?',
            SecondaryText: 'Anda Harus Masuk Sebgai ADMIN atau SUPERUSER untuk melakukan ini, Masuk ke "Konfigurasi Barang" lalu pilih "edit" dihalamn baru akan muncuk tombol "+" berwarna biru, lalu akan muncul satuan baru kosong, edit satuan baru kosong tersebut dengan mengklik tombol berbentuk pensil lalu masukkan nama satuan jual, minimal satuan dan harga jual per satuan',
        },
        {
            PrimaryText: 'Bagaimana Cara Mengedit Satuan Jual?',
            SecondaryText: 'Klik Tombol Pencil Pada baris satuan jual yang ingin anda ubah',
        },
        {
            PrimaryText: 'Bagaimana Cara Menghapus Satuan Jual?',
            SecondaryText: 'Klik Tombol tempat sampah Pada baris satuan jual yang ingin anda hapus',
        },
        {
            PrimaryText: 'Bisakah Saya Mengubah Satuan Jual Satuan?',
            SecondaryText: 'Tidak, Satuan Jual Satuan Secara otomatis mengikuti Harga jual satuan dan tidak bisa diubah',
        },
    ]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Typography align='center' variant='h3'>Satuan Jual Barang</Typography>
            <hr />
            <TextAdjustButton AdjustId={Id} />
            <CreateList Id={Id} ListData={ListData} />
        </Fragment>
    )
}
export const Help_JenisBarang = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'Jenis Barang', link: 'help/jenisbarang' }]
    const Id = 'Help_JenisBarang'
    const ListData = [
        {
            PrimaryText: 'Bagaimana Cara Mengakses Tambah, Update, Hapus Jenis Barang?',
            SecondaryText: 'Untuk melakukan hal tersebut pertama anda membutuhkan akun ADMIN atau SUPERUSER, lalu "Menu Utama"->"Katagori Barang"',
        },
        {
            PrimaryText: 'Menambah Jenis Barang',
            NonTextContent: (
                <Fragment>
                    <p>
                        <label>
                            <b>
                                - Nama Jenis Barang : (Require)
                            </b>
                        </label><br />
                            Nama Jenis Barang wajib diisi, tidak boleh sama dengan yang sudah ada dan tidak bisa diganti kedepannya
                    </p>
                    <p>
                        <label>
                            <b>
                                - Kepemilikan : (Require)
                            </b>
                        </label><br />
                        Kepemilikan ini menggambarkan barang ini kepunyaan siapa, opsi yang dikasi berupa "pribadi" = kepunyaan sendiri atau "non-pribadi" =  bukan kepunayaan sendiri atau titipan atau lainnya, berguna untuk membantu mengecek pendapatan dan lain sebagainya di menu incomereport/graph. wajib diisi dengan salah satu opsi terkait
                    </p>
                    <p>
                        <label>
                            <b>
                                - Keterangan : (Optional)
                            </b>
                        </label><br />
                        Menambah informasi mengenai Jenis Barang jika dibutuhkan, dapat dilihat ketika membuka Detail Jenis Barang
                    </p>
                </Fragment>
            )
        },
        {
            PrimaryText: 'Update Jenis Barang',
            SecondaryText: 'Proses dan ketentuan mengupdate Barang hampir sama dengan Menambah Jenis Barang, hanya saja Nama Jenis Barang Tidak Bisa Diganti',
        },
        {
            PrimaryText: 'Delete Jenis Barang',
            SecondaryText: 'Pada baris yang sama dengan Barang Yang ingin anda hapus klik tombol "Delete" dan konfirmasi dengan Mengklik tombol "Delete"',
        },
        {
            PrimaryText: 'Apakah Ada Masalah Jika Saya Menghapus Beberapa Jenis Barang?',
            SecondaryText: 'Ya, jika ada Barang Yang masih memilih Jenis Barang sebagai Jenisnya maka Barang tersebut otomatis akan terhapus, selebih dari itu tidak ada (selama pengetesan)',
        },
    ]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Typography align='center' variant='h3'>Jenis Barang</Typography>
            <hr />
            <TextAdjustButton AdjustId={Id} />
            <CreateList Id={Id} ListData={ListData} />
        </Fragment>
    )
}

////// TRANSAKSI
export const Help_Transaksi = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'Transaksi', link: 'help/transaksi' }]
    const Id = 'Help_Transaksi'
    const ListData = [
        {
            PrimaryText: 'Bagaimana Menambah Barang ke list?',
            SecondaryText: 'pada Kolom Diatas Tombol "Tambah" anda bisa menulis nama barang atau barcode barang atau bahkan menscan barcode, setelah itu klik tombol "Tambah", maka barang akan tertambah pada list belanja',
        },
        {
            PrimaryText: 'Bagaimana Cara Megubah Jumlah Belanja?',
            SecondaryText: 'Klik gambar pensil lalu pilih jenis satuan yang dibeli lalu masukkan jumlah pembelanjaan di kolom jumlah',
        },
        {
            PrimaryText: 'Bagaimana Jika ada barang/barcode yang sama tp beda pembelian satuan?',
            SecondaryText: 'anda tinggal menbah barang ke list barang',
        },
        {
            PrimaryText: 'Kenapa Ketika Saya Mengedit Barang List "Total" Tidak Akurat?',
            SecondaryText: 'karna sistem mengagap anda memasukkan barang baru, namun itu tidak masalah karna ketika anda menyudahi atau membatalkan edit sistem akan menghitung ulang, dan tidak berpengaruh ke hasil akhir',
        },
        {
            PrimaryText: 'Jika Sudah Selesai Memilih Barang Bagaimana?',
            SecondaryText: 'Jika sudah selesai klik tombol "Review Pembayaran" lalu masukkan uang pembayaran sehingga lebih besar dari jumlah tagihan lalu klik tombol "Bayar"',
        },
        {
            PrimaryText: 'Bagaimana Diskon/Potongan Harga Bekerja?',
            SecondaryText: 'Diskon diisi dengan range persentase (1-100) dan potongan harga diisi dengan range kurang dari total tagihan. Diskon dilakukan terlebih dahulu dari pada Potongan Harga. ',
        },
        {
            PrimaryText: 'PERINGATAN',
            SecondaryText: 'Total Tagihan Tidak Bisa 0, Yang Artinya Diskon tidak bisa 100% Potongan Harga Tidak bisa sama dengan jumlah tagihan dan tidak bisa melakukan transaksi dengan harga jual 0',
        },
    ]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Typography align='center' variant='h3'>Transaksi</Typography>
            <hr />
            <TextAdjustButton AdjustId={Id} />
            <CreateList Id={Id} ListData={ListData} />
        </Fragment>
    )
}
export const Help_Belanja = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'Belanja', link: 'help/belanja' }]
    const Id = 'Help_Belanja'
    const ListData = [
        {
            PrimaryText: 'Bagaimana Cara Belanja?',
            SecondaryText: 'Belanja hanya bisa dilakukan oleh akun ADMIN atau SUPERUSER, lalu masukke "Menu Utama"-> "Belanja"',
        },
        {
            PrimaryText: 'Bagaimana Cara Menbah Barang di List Belanja?',
            SecondaryText: 'Pastikan barang sudah terdaftar, lalu masukkan barcode atau pilih nama barang di form di atas tombol "Tambah", setelah itu klik Tombol "Tambah"',
        },
        {
            PrimaryText: 'Cara Edit Barang Belanjaan?',
            SecondaryText: 'Klik tombol berbentuk pensil pada baris yang sama, masukkan jumlah barang belanjaan barang, harga modal dan harga jual yang anda inginkan. setelah semua terisi klik tombol "Review Barang Belanja"',
        },
        {
            PrimaryText: 'Mengapa Saya Mendapati Warna Merah Di Review?',
            SecondaryText: 'Berarti barang terkait harga modal atau harga jualnya 0',
        },
        {
            PrimaryText: 'Mengapa Saya Mendapati Warna Kuning Di Review?',
            SecondaryText: 'Berarti barang terkait harga modal lebih besar dari harga jualnya',
        },
        {
            PrimaryText: 'Apakah Saya Perlu Mengupdate Detail Barang Lagi Setelah Melakukan Belanja?',
            SecondaryText: 'Jika bermaksud mengupdate detail barang harga satuan atau satuan jual satuan maka jawabannya tidak perlu. Namun jika maksud anda menyesuaikan harga satuan jual lainnya pada barang terkait jawabnnya ya perlu',
        },
    ]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Typography align='center' variant='h3'>Belanja</Typography>
            <hr />
            <TextAdjustButton AdjustId={Id} />
            <CreateList Id={Id} ListData={ListData} />
        </Fragment>
    )
}
export const Help_Stok = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'Stok', link: 'help/stok' }]
    const Id = 'Help_Stok'
    const ListData = [
        {
            PrimaryText: 'Bagaimana Cara Menambah Stok Barang Setelah Menambah Data Barang?',
            SecondaryText: 'Penambahan Bisa dilakukan dengan cara mengakses halaman belanja dan menjabarkan jumlah barang harga modal dan harga jualnya, sehingga barang tetap terdata di report',
        },
        {
            PrimaryText: 'Apakah Ada Cara Lain Untuk Menambah Stok Selain Melalui Menu Belanja?',
            SecondaryText: 'Ada, Namun Sangat tidak disarankan karna akan merusak statistik reprot dan graph. Yaitu dengan mengupdate barang di menu "Konfigurasi Barang" namun anda membutuhkan akun SUPERUSER untuk melakukan ini',
        },
    ]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Typography align='center' variant='h3'>Stok</Typography>
            <hr />
            <TextAdjustButton AdjustId={Id} />
            <CreateList Id={Id} ListData={ListData} />
        </Fragment>
    )
}
export const Help_TransaksiDetail = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'Transaksi Detail', link: 'help/transaksi_detail' }]
    const Id = 'Help_TransaksiDetail'
    const ListData = [
        {
            PrimaryText: 'Bagaimana Cara Mengecek Transaksi yang Sudah Ada?',
            SecondaryText: 'Anda harus masuk sebagai ADMIN atau SUPERUSER lalu ke "Menu Utama"->"Transaksi List"',
        },
        {
            PrimaryText: 'Mengapa Terdapat Tulisan "Data Tidak Ditemukan"?',
            SecondaryText: 'Karena secara default hanya menmpilkan transaksi hari ini, jika anda ingin mencari transaksi lainnya anda bisa melakukkanya dengan secara spesifik mencarinya dengan cara mengklik tombol panah kebawah lalu akan muncul jendela pencarian, masukkan spesifikasi yang diinginkan lalu klik tombol "Cari"',
        },
    ]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Typography align='center' variant='h3'>Transaksi Detail</Typography>
            <hr />
            <TextAdjustButton AdjustId={Id} />
            <CreateList Id={Id} ListData={ListData} />
        </Fragment>
    )
}
////// GENERAL||NAVIGASI
export const Help_ImportExport = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'Import/Export', link: 'help/import-export' }]
    const Id = 'Help_ImportExport'
    const ListData = [
        {
            PrimaryText: 'Bagaimana Cara Mengexport Data Barang, Jenis Barang, atau Transaksi?',
            SecondaryText: 'Anda harus masuk dengan akun SUPERUSER lalu "Menut Utama"->lalu "Import/Export Barang" untuk barang, "Import/Export Katagori Barang" untuk jenis barang dan "Import/Export Transaksi" untuk Transaksi. pada halaman Export klik tombol panah kebawah dibawah tulisan export dan pilih spesifikasi data barang yang anda inginkan, lalu klik "Cari" ketika data muncul dan yakin ingin mengexport data klik tombol "Export"',
        },
        {
            PrimaryText: 'Untuk Apa Saya Mengexport Data?',
            SecondaryText: 'Data di export untuk backup jika sewaktu waktu data hilang atau report toko',
        },
        {
            PrimaryText: 'Bagaimana Cara Menimport Data Barang, Jenis Barang, atau Transaksi?',
            SecondaryText: 'Anda harus masuk dengan akun SUPERUSER lalu "Menut Utama"->lalu "Import/Export Barang" untuk barang, "Import/Export Katagori Barang" untuk jenis barang dan "Import/Export Transaksi" untuk Transaksi. pada halaman Import darg file excel atau klik tombol awan dan plih file excelnya lalu klik "cek" lalu akan muncul halaman "Review" jika sudah yakin centang pernyataan "saya sudah yakin tidak ada yang salah pada data diatas" lalu klik tombol "cek"',
        },
        {
            PrimaryText: 'Mengapa Proses Import Cenderung Lebih Susah?',
            SecondaryText: 'Karna anda mencoba memasukkan data banyak kedalam program, verifikasi yang awalnya dilakukan oleh sistem secara otomatis menjadi manual oleh anda. dan agar tidak terjadi malfunction pada program',
        },
        {
            PrimaryText: 'Apakah Hanya Ini Panduan Importnya?',
            SecondaryText: (
                <Fragment>
                    Untuk Lebih detial bisa ke halaman terkait, lebih lengkap. di tautan berikut ini
                    <Link href='/barang/konfigurasibarang/importexport' ><b> Barang </b></Link>,
                    <Link href='/barang/katagoribarang/importexport' ><b> Jenis Barang </b></Link>,
                    <Link href='/transaksi/importexport' ><b> Transaksi </b></Link>.
                </Fragment>)
        },
    ]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Typography align='center' variant='h3'>Import/Export</Typography>
            <hr />
            <TextAdjustButton AdjustId={Id} />
            <CreateList Id={Id} ListData={ListData} />
        </Fragment>
    )
}
export const Help_LightDark = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'Light/Dark', link: 'help/light-dark' }]
    const Id = 'Help_LightDark'
    const ListData = [
        {
            PrimaryText: 'Apa itu Light/Dark?',
            SecondaryText: 'Light/Dark adalah fungsi untuk mengganti tampilan dari terang menjadi gelap atau sebaliknya',
        },
        {
            PrimaryText: 'Dimana Saya Bisa Mengakses Light/Dark?',
            SecondaryText: 'Light/Dark Dapat diakses di bagian kiri bawah pada tampilan lebar, dan atas kanan pada tampilan kecil. Berganti tampilan cukup dengan mengklik pada slider',
        },
    ]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Typography align='center' variant='h3'>Light/Dark</Typography>
            <hr />
            <TextAdjustButton AdjustId={Id} />
            <CreateList Id={Id} ListData={ListData} />
        </Fragment>
    )
}
export const Help_PanduanPenggunaan = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'Panduan Penggunaan', link: 'help/penggunaan_help' }]
    const Id = 'Help_PanduanPenggunaan'
    const ListData = [
        {
            PrimaryText: 'Bagaimana Cara Mengakses Menu?',
            SecondaryText: 'Menu terbagi dua Menu Utama dan Menu cepat. Menu utama dapat diakses dengan cara mengklik pada logo di menu cepat. Menu cepat akan selalu ada dibagian kiri atau atas layar (tergantung ukuran layar anda) ',
        },
        {
            PrimaryText: 'Bisakah Saya Menshorting Data Dari Terbesar ke Terkecil atau Sebaliknya?',
            SecondaryText: 'Dihampir semua tabel bisa anda hanya perlu mengklik header dari tabel maka otomatis data tershortir, tapi hati hati jika data terlalu banyak ada kemungkinan proses memakan waktu dan kemungkinan freez sebentar',
        },
        {
            PrimaryText: 'Apa Gunanya Gambar Rumah Di Bagian Kanan Atas?',
            SecondaryText: 'Itu adalah bantuan menu dimana dia membantu bernavigasi jika diklik',
        },
        {
            PrimaryText: 'Mengapa Ketika Saya Mencari Data Dengan Lambang Kaca Pembesar di bagian awalnya data tidak ditemukan',
            SecondaryText: 'Kolom pencari bekerja mencari dari data yang sudah ada jadi jika data blm ada silakan anda melakukan pemanggilan data secara spesifik dengan mengklik tanda panah kebawah(jika ada)',
        },
        {
            PrimaryText: 'Apa itu Pencarian Spesifik',
            SecondaryText: 'Jika anda menemukan tanda panah kebawah artinya anda dapat melakukan pencarian data secara spesifik, biasanya ada pada halaman data list',
        },
        {
            PrimaryText: 'Data Yang Ditampilkan Pada Diagram Terlalu Banyak Saya Tidak Bisa Membacanya',
            SecondaryText: 'Jika Demikian anda bisa mencari spesifik data sehingga data yang ditampilkan lebih spesifik atau dengan menghilangkan sementara data dengan cara mengklik legend data pada diagram',
        },
    ]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Typography align='center' variant='h3'>Panduan Penggunaan</Typography>
            <hr />
            <TextAdjustButton AdjustId={Id} />
            <CreateList Id={Id} ListData={ListData} />
        </Fragment>
    )
}
export const Help_PanduanTampilan = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'Panduan Tampilan', link: 'help/tampilan_help' }]
    const Id = 'Help_PanduanTampilan'
    const ListData = [
        {
            PrimaryText: 'Bagaimana Jika Tampilan Putih Saja?',
            SecondaryText: 'Anda bisa merealod page dengan cara klik kanan pada mouse lalu pilih "Realod"',
        },
    ]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Typography align='center' variant='h3'>Panduan Tampilan</Typography>
            <hr />
            <TextAdjustButton AdjustId={Id} />
            <CreateList Id={Id} ListData={ListData} />
        </Fragment>
    )
}
export const Help_PanduanMenu = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'Panduan Menu', link: 'help/menu_help' }]
    const Id = 'Help_PanduanMenu'
    const ListData = [
        {
            PrimaryText: 'Bagaimana Cara Mengakses Beberapa Fitur Yang Saya Inginkan?',
            SecondaryText: (
                <Fragment>
                    Untuk Mengakses Semua Menu Anda Bisa Mengklik Logo, yang akan membawa anda ke Menu Utama disana anda bisa memilih fitur yang anda ingin akses sesuai user yang anda gunakan <br />
                    atau pada bagian kanan (jika mode lebar) atau atas (mode kecil) anda bisa mengakses menu cepat untuk mengecek fitur fitur yang biasa digunakan
                </Fragment>),
        },
        {
            PrimaryText: 'Apa Itu Mode Lebar/Kecil?',
            SecondaryText: 'Mode Lebar/kecil adalah tampilan letak Navigasi menu berada, jika layar anda dibawah 1080px maka otomatis mengaktifkan mode kecil supaya Menu tidak menutupi layar',
        },
        {
            PrimaryText: 'Mengapa ada Beberapa Menu yang Tidak Tampak Disaya?',
            SecondaryText: (
                <Fragment>
                    Menu Diatur Berdasarkan Tingkatan Akun, jadi jika ada beberapa menu yang tidak tampil mungkin anda menggunakan Tingkatan Akun anda menseting seperti itu, untuk melihat lebih jauh anda bisa membaca di tautan <Link href='/help/tingkatan_akun' ><b>ini</b></Link>
                </Fragment>),
        },
    ]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Typography align='center' variant='h3'>Panduan Menu</Typography>
            <hr />
            <TextAdjustButton AdjustId={Id} />
            <CreateList Id={Id} ListData={ListData} />
        </Fragment>
    )
}
export const Help_FirstTimeUse = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'First Time Use', link: 'help/first_time_use' }]
    const Id = 'Help_FirstTimeUse'
    const ListData = [
        {
            PrimaryText: 'Adakah Software yang Perlu Diinstal Sebelum Penggunaaan?',
            SecondaryText: (
                <Fragment>
                    Jika anda menjalankan aplikasi pertama kli diserver maka ya perlu ada software yang diinstal<br />
                    yaitu database program, karna database tidak terbawa di softwate ini, silahkan download di halaman berikut <Link href='https://www.mongodb.com/try/download/community' target="_blank" rel="noreferrer"><b>ini</b></Link>
                </Fragment> )
        },
        {
            PrimaryText: 'Panduan Penggunaan Pertama Kali',
            SecondaryText: 'Untuk penggunaan pertama kali anda perlu melakukan registrasi akun terlebih dahulu. pertama jalankan aplikasi lalu pada halaman login klik gambar/logo sebanyak 10 kali atau lebih lalu anda akan dibawa ke halama seting aplikasi (hanya bisa satu kli registrasi)',
        },
        {
            PrimaryText: 'Apakah Bisa Melakukan Seting Penggunaan Pertama di Client?',
            SecondaryText: 'Tidak, Seting penggunaan pertama haurs dilakukan di server',
        },
        {
            PrimaryText: 'Registrasi Akun Super',
            NonTextContent: (
                <Fragment>
                    <p>
                        <label>
                            <b>
                                - UserName : (Require)
                            </b>
                        </label><br />
                        UserName digunakan untuk login kedepannya, Username Wajib diisi dan tidak bisa diganti kedepannya
                    </p>
                    <p>
                        <label>
                            <b>
                                - Name : (Require)
                            </b>
                        </label><br />
                        Name Digunakan Untuk tampilan nama dari akun terkait, wajib diisi
                    </p>
                    <p>
                        <label>
                            <b>
                                - Password dan Confirm Passowrd : (Require)
                            </b>
                        </label><br />
                        Digunakan Untuk kata santi akun anda ketika login nantinya, wajib diisi dan field password dan confirm password harus berisi sama. disarankan minimal 4 karakter
                    </p>
                    <p>
                        <label>
                            <b>
                                - Kupon : (Require)
                            </b>
                        </label><br />
                        Kupon adalah sandi misterius yang hanya diketahui oleh pembuat aplikasi, silakan tanya pembuat aplikasi
                    </p>
                    <p>
                        <label>
                            <b>
                                - Photo Profil : (Optional)
                            </b>
                        </label><br />
                        foto yang akan ditampilkan ketika membuka user detail, tidak wajib diisi opsional
                    </p>
                </Fragment>
            )
        },
        {
            PrimaryText: 'Registrasi Data Toko',
            NonTextContent: (
                <Fragment>
                    <p>
                        <label>
                            <b>
                                - Nama Toko : (Require)
                            </b>
                        </label><br />
                        diisi dengan nama toko yang anda inginkan, digunakan untuk identitas toko anda, bisa diganti nantinya
                    </p>
                    <p>
                        <label>
                            <b>
                                - alamat : (Require)
                            </b>
                        </label><br />
                        diisi dengan alamat toko yang anda, digunakan untuk identitas toko anda, bisa diganti nantinya
                    </p>
                    <p>
                        <label>
                            <b>
                                - Kontak : (Optional)
                            </b>
                        </label><br />
                        diisi dengan kontak toko yang anda, digunakan untuk identitas toko anda, bisa diganti/isi nantinya
                    </p>
                    <p>
                        <label>
                            <b>
                                - logo : (Optional)
                            </b>
                        </label><br />
                        logo yang menggambarkan toko anda, tidak wajib diisi opsional, bisa diisi kemudian hari
                    </p>
                </Fragment>
            )
        },
        {
            PrimaryText: 'Ketertangan Tambahan',
            SecondaryText: (
                <Fragment>
                    - Akun yang dibuat sudah pasti memiliki semua Tipe Akun <br />
                    - Disarankan Setelah proses selesai segera membuat akun SUPERUSER lainnya agar tidak terjadi masalah ketika akun ini bermasalah <br />
                    - Jika terjadi maslah pada registrasi silakan hubungi pihak pembuat untuk reset database
                </Fragment>
            ),
        },
    ]
    return (
        <Fragment>
            <Paper >
                <BreadCrumbs breadcrumbs={breadcrumbs} />
                <Typography align='center' variant='h3'>First Time Use</Typography>
                <hr />
                <TextAdjustButton AdjustId={Id} />
                <CreateList Id={Id} ListData={ListData} />
            </Paper>
        </Fragment>
    )
}
export const Help_Login = () => {
    const breadcrumbs = [{ name: 'Help', link: 'help' }, { name: 'Login', link: 'help/login' }]
    const Id = 'Help_Login'
    const ListData = [
        {
            PrimaryText: 'Apa Saja Yang Dibutuhkan Untuk Login?',
            SecondaryText: 'Username dan Password, pastikan keduanya benar. jika ada maslah/lupa silakan hubungi SUPERUSER untuk mereset password',
        },
        {
            PrimaryText: 'Bagaimana Jika Saya Login Dikomputer Bukan Server?',
            SecondaryText: 'Jika demikian maka selain Username dan Password anda harus mengisi field tambahan berupa Alamat Web atau IP Address dengan portnya (jikadibutuhkan, biasanya tidak). Silakan pilih menggunakan alamat web atau ip bergantung server tujuan. Kolom tambahan dapat diakses dengan mencklis "Saya Mengakses dari Client"',
        },
        {
            PrimaryText: 'Bagaimana Jika Saya Lupa Username atau Password saya?',
            SecondaryText: 'Silakan hubungi SUPERUSER untuk bertanya username anda atau mereset password anda',
        },
    ]
    return (
        <Fragment>
            <Paper>
                <BreadCrumbs breadcrumbs={breadcrumbs} />
                <Typography align='center' variant='h3'>Login</Typography>
                <hr />
                <TextAdjustButton AdjustId={Id} />
                <CreateList Id={Id} ListData={ListData} />
            </Paper>
        </Fragment>
    )
}