import React, { Fragment } from 'react'

import { Typography } from '@material-ui/core'

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
            AccordionDetailsTypography: 'Karna data yang anda masukkan tidak memiliki header dengan ketentuan yang benar minimal header berisi: \n - NamaJenisBarang \n - Kepemilikan',
        },
        {
            AccordionSummaryTypography: 'Bagai Mana Cara Membuat Excel yang Benar Untuk Import Data?',
            AccordionDetailsTypography: '',
        },
        {
            AccordionSummaryTypography: 'Mengapa Ada Warna Merah Di Tabel Review?',
            AccordionDetailsTypography: 'Karna ada kesalahan pada data excel yang dimasukkan.\n - NamaJenisBarang : tidak boleh sama dengan yang sudah ada \n - Kepemilikan : hanya bisa diisi dengan "pribadi" atau "nonpribadi"',
        },
        {
            AccordionSummaryTypography: 'Mengapa Saya Mendapat Peringatan Ada kesalahan pada Data?',
            AccordionDetailsTypography: 'Karna ada kesalahan pada data excel yang dimasukkan.\n - NamaJenisBarang : tidak boleh sama dengan yang sudah ada \n - Kepemilikan : hanya bisa diisi dengan "pribadi" atau "nonpribadi"',
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