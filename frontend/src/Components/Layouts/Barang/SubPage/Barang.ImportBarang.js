import React, { Fragment } from 'react'

import { Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'

import BarangImport from '../../../Containers/Barang/Barang.BarangImport'
import FAQ from '../../../Containers/FAQ'

const ImportBarang = () => {
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
                    - Barcode (Penulisan Harus Sama) <br />
                    - Name (Penulisan Harus Sama) <br />
                    - Jenis (Penulisan Harus Sama)
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
                                    Barcode
                                </TableCell>
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell>
                                    Jenis
                                </TableCell>
                                <TableCell>
                                    Stok
                                </TableCell>
                                <TableCell>
                                    isDecimal
                                </TableCell>
                                <TableCell>
                                    HargaModal
                                </TableCell>
                                <TableCell>
                                    HargaJual
                                </TableCell>
                                <TableCell>
                                    SatuanJual
                                </TableCell>
                                <TableCell>
                                    Ket
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    111
                                </TableCell>
                                <TableCell>
                                    barang ke 1
                                </TableCell>
                                <TableCell>
                                    jenis ke 1
                                </TableCell>
                                <TableCell>
                                    100
                                </TableCell>
                                <TableCell>
                                    TRUE
                                </TableCell>
                                <TableCell>
                                    3000
                                </TableCell>
                                <TableCell>
                                    5000
                                </TableCell>
                                <TableCell>
                                    {`[{"NamaSatuan":"rencen","MinBarang":"10","HargaJual":"4500"}]`}
                                </TableCell>
                                <TableCell>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    222
                                </TableCell>
                                <TableCell>
                                    barang ke 2
                                </TableCell>
                                <TableCell>
                                    jenis ke 2
                                </TableCell>
                                <TableCell>
                                    100
                                </TableCell>
                                <TableCell>
                                    FALSE
                                </TableCell>
                                <TableCell>
                                    5000
                                </TableCell>
                                <TableCell>
                                    10000
                                </TableCell>
                                <TableCell>
                                    {`[{"NamaSatuan":"box","MinBarang":24,"HargaJual":"8000"},{"NamaSatuan":"rencen","MinBarang":"10","HargaJual":"9000"}]`}
                                </TableCell>
                                <TableCell>
                                    keterangan jika ada
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Fragment>
            )
        },
        {
            AccordionSummaryTypography: 'Mengapa Ada Warna Merah Di Tabel Review?',
            AccordionDetailsTypography: (
                <Fragment>
                    Karna ada kesalahan pada data excel yang dimasukkan.<br />
                    - Barcode : tidak boleh sama dengan yang sudah ada .<br />
                     - Name : tidak boleh sama dengan yang sudah ada <br />
                      - Jenis : hanya bisa diisi dengan JenisBarang yang sudah terdaftar
                </Fragment>)
        },
        {
            AccordionSummaryTypography: 'Mengapa Ada Warna Kuning Di Tabel Review?',
            AccordionDetailsTypography: (
                <Fragment>
                    Karna anda mengisi salah satu data dengan header berikut: <br />
                     - Stok <br />
                      - HargaModal <br />
                       - HargaJual <br />
                        - SatuanJual <br />
                         ket: disarankan melakukan secara maual karna tidak terdata di diagram pengeluaran <br />
                          untuk penulisan "SatuanJual" mohon liat panduan "Bagai Mana Cara Membuat Excel yang Benar Untuk Import Data" diatas karna sensitif
                </Fragment>)
        },
        {
            AccordionSummaryTypography: 'Bagaimana Jika Saya Ingin Mengupdate Barang Melalui Menu ini Bukan Menambah?',
            AccordionDetailsTypography: 'Tidak bisa, menu import barang tidak bisa digunakan untuk mengupdate Barang, silakan lakukan manual',
        },
    ]
    return (
        <Fragment>
            <Typography variant='h4' align='center'>
                Import Barang
            </Typography>
            <BarangImport />
            <FAQ
                title='Keterangan:'
                faqlist={ListFAQ}
            />
        </Fragment>
    )
}

export default ImportBarang