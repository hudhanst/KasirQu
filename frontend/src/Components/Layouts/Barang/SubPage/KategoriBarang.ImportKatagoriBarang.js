import React, { Fragment } from 'react'

import { Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

import KatagoriBarangImport from '../../../Containers/Barang/Barang.KatagoriBarangImport'
import FAQ from '../../../Containers/FAQ'

const ImportKatagoriBarang = () => {
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
                     - NamaJenisBarang (Penulisan Harus Sama) <br />
                      - Kepemilikan (Penulisan Harus Sama)
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
                                    NamaJenisBarang
                                </TableCell>
                                <TableCell>
                                    Kepemilikan
                                </TableCell>
                                <TableCell>
                                    Ket
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    Jenis Barang 1
                                </TableCell>
                                <TableCell>
                                    pribadi
                                </TableCell>
                                <TableCell>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Jenis Barang 2
                                </TableCell>
                                <TableCell>
                                    nonpribadi
                                </TableCell>
                                <TableCell>
                                    Keternagan Jika ada
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
                     - NamaJenisBarang : tidak boleh sama dengan yang sudah ada <br />
                      - Kepemilikan : hanya bisa diisi dengan "pribadi" atau "nonpribadi"
                </Fragment>)
        },
        {
            AccordionSummaryTypography: 'Mengapa Saya Mendapat Peringatan Ada kesalahan pada Data?',
            AccordionDetailsTypography: (
                <Fragment>
                    Karna ada kesalahan pada data excel yang dimasukkan.<br />
                     - NamaJenisBarang : tidak boleh sama dengan yang sudah ada <br />
                      - Kepemilikan : hanya bisa diisi dengan "pribadi" atau "nonpribadi"
                </Fragment>)
        },
        {
            AccordionSummaryTypography: 'Bagaimana Jika Saya Ingin Mengupdate JenisBarang Melalui Menu ini Bukan Menambah?',
            AccordionDetailsTypography: 'Tidak bisa, menu import Jenis barang tidak bisa digunakan untuk mengupdate JenisBarang, silakan lakukan manual',
        },
    ]
    return (
        <Fragment>
            <Typography variant='h4' align='center'>
                Import Kategori Barang
            </Typography>
            <KatagoriBarangImport />
            <FAQ
                title='Keterangan:'
                faqlist={ListFAQ}
            />
        </Fragment>
    )
}

export default ImportKatagoriBarang