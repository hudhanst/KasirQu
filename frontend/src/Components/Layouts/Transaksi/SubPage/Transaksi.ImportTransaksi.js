import React, { Fragment } from 'react'

import { Typography, Link, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

import TransaksiImport from '../../../Containers/Transaksi/Transaksi.TransaksiImport'
import FAQ from '../../../Containers/FAQ'

const ImportTransaksi = () => {
    const ListFAQ = [
        {
            AccordionSummaryTypography: 'File Apa Saja yang Bisa Digunakan?',
            AccordionDetailsTypography: 'Semua file excel/spreadsheet',
        },
        {
            AccordionSummaryTypography: 'Mengapa "Data Tidak Ditemukan" pada Review?',
            AccordionDetailsTypography: (
                <Fragment>
                    Karna data yang anda masukkan tidak memiliki header dengan ketentuan yang benar minimal header berisi: <br />
                     - NamaKasir (Penulisan Harus Sama) <br />
                      - Tipe (Penulisan Harus Sama) <br />
                       - DetailTransaksi (Penulisan Harus Sama)<br />
                       - TotalPembayaran (Penulisan Harus Sama)
                </Fragment>)
        },
        {
            AccordionSummaryTypography: 'Bagai Mana Cara Membuat Excel yang Benar Untuk Import Data?',
            AccordionDetails: (
                <Fragment>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    NamaKasir
                                </TableCell>
                                <TableCell>
                                    TanggalTransaksi
                                </TableCell>
                                <TableCell>
                                    Tipe
                                </TableCell>
                                <TableCell>
                                    DetailTransaksi
                                </TableCell>
                                <TableCell>
                                    Diskon
                                </TableCell>
                                <TableCell>
                                    PotonganHarga
                                </TableCell>
                                <TableCell>
                                    TotalPembayaran
                                </TableCell>
                                <TableCell>
                                    Ket
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    User1
                                </TableCell>
                                <TableCell>
                                    2020-06-21T14:23:11.545Z
                                </TableCell>
                                <TableCell>
                                    Belanja
                                </TableCell>
                                <TableCell>
                                    {`[{"Id":"5eef6aad0931b80500170833","Barcode":"111","NamaBarang":"akan dihapus","Jumlah":1,"HargaModal":"10","HargaJual":"10","TotalModal":10}]`}
                                </TableCell>
                                <TableCell>
                                    0
                                </TableCell>
                                <TableCell>
                                    0
                                </TableCell>
                                <TableCell>
                                    10
                                </TableCell>
                                <TableCell>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    User2
                                </TableCell>
                                <TableCell>
                                    2020,8,23:1:1
                                </TableCell>
                                <TableCell>
                                    Belanja
                                </TableCell>
                                <TableCell>
                                    {`[{"Id":"5f15a7d6eb2d52262c8aed53","Barcode":"11","NamaBarang":"11","Jumlah":"100","HargaModal":"5000","HargaJual":"7000","TotalModal":500000},{"Id":"5f15a7d6eb2d52262c8aed54","Barcode":"21","NamaBarang":"21","Jumlah":"65","HargaModal":"18000","HargaJual":"20000","TotalModal":1170000},{"Id":"5f15a7d6eb2d52262c8aed55","Barcode":"31","NamaBarang":"31","Jumlah":"125","HargaModal":"3000","HargaJual":"6000","TotalModal":375000}]`}
                                </TableCell>
                                <TableCell>
                                    0
                                </TableCell>
                                <TableCell>
                                    0
                                </TableCell>
                                <TableCell>
                                    2045000
                                </TableCell>
                                <TableCell>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    User1
                                </TableCell>
                                <TableCell>
                                    "2020-07-25T01:28:11.600Z"
                                </TableCell>
                                <TableCell>
                                    Transaksi
                                </TableCell>
                                <TableCell>
                                    {`[{"Id":"5f15a7d6eb2d52262c8aed54","Barcode":"21","NamaBarang":"21","Satuan":"rencengan","Jumlah":"2","HargaSatuan":7000,"TotalBarang":16,"HargaTotal":112000},{"Id":"5efc462b6db17a3cd84ae35b","Barcode":"4970129727521","NamaBarang":"spidol snowman","Satuan":"dus","Jumlah":"5","HargaSatuan":"11000","TotalBarang":60,"HargaTotal":660000}]`}
                                </TableCell>
                                <TableCell>
                                    0
                                </TableCell>
                                <TableCell>
                                    0
                                </TableCell>
                                <TableCell>
                                    772000
                                </TableCell>
                                <TableCell>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    User1
                                </TableCell>
                                <TableCell>
                                    2020,7,23:6:28
                                </TableCell>
                                <TableCell>
                                    Transaksi
                                </TableCell>
                                <TableCell>
                                    {`[{"Id":"5efc462b6db17a3cd84ae35b","Barcode":"4970129727521","NamaBarang":"spidol snowman","Satuan":"dus","Jumlah":1,"HargaSatuan":"11000","TotalBarang":12,"HargaTotal":132000}]`}
                                </TableCell>
                                <TableCell>
                                    0
                                </TableCell>
                                <TableCell>
                                    0
                                </TableCell>
                                <TableCell>
                                    132000
                                </TableCell>
                                <TableCell>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Fragment>
            )
        },
        {
            AccordionSummaryTypography: 'Harap Dibaca Sebelum Mengisi',
            AccordionDetailsTypography: (
                <Fragment>
                    - Jika data tidak lengkap maka tidak disimpan keseluruhan <br />
                    - Jika format penulisan DetailTransaksi salah maka proses akan dihentikan  <br />
                    - Jika format penulisan TanggalTransaksi salah makan TanggalTransaksi akan diseting pada saat ini  <br />
                    - format penulisan TanggalTransaksi adalah format penulisan waktu ISO untuk lebih detail bisa cek artikel berikut <Link href='https://en.wikipedia.org/wiki/ISO_8601' target="_blank" rel="noreferrer">ini</Link> atau secara manual ditulis dengaan sebagai berikut <b>"YYYY,MM,DD:HH:mm"</b> dimana "YYYY" sebagai tahun, "MM" sebagai Bulan, "DD" sebagai tanggal, "HH" sebagai jam dan "mm" sebagai menit<br />
                    - Jika Tipe Transaksi bukan diantara "Transaksi" atau "Belanja" maka data baris tersebut tidak akan disimpan, yang lain tetap dijalankan <br />
                </Fragment>
            ),
        },
        {
            AccordionSummaryTypography: 'Bagaimana Jika Saya Ingin Mengupdate Melalui Menu ini Bukan Menambah?',
            AccordionDetailsTypography: 'Tidak bisa, menu import tidak bisa digunakan untuk mengupdate, silakan lakukan manual',
        },
        {
            AccordionSummaryTypography: 'Bagaimana Jika Saya Ingin Menggunakan Id yang sama dengan sebelumnya? karena id menjadi kode transaksi sebelumnya',
            AccordionDetailsTypography: 'Sayangnya tidak bisa, saran kami menjadikan kolom id menjadi kolom Ket sehingga sewaktu waktu dibutuhkan id lama masih bisa di cari dari pencarian dengan memasukkan keterangan berupa id lama',
        },
        {
            AccordionSummaryTypography: 'Peringatan !!!',
            AccordionDetailsTypography: 'Karna Data kompleks pengekan dilakukan diserver jadi tidak ada pemberitahuan (merah/kuning) pada halaman review',
        },
    ]
    return (
        <Fragment>
            <Typography variant='h4' align='center'>
                Import Transaksi
            </Typography>
            <TransaksiImport />
            <FAQ
                title='Keterangan:'
                faqlist={ListFAQ}
            />
        </Fragment>
    )
}

export default ImportTransaksi