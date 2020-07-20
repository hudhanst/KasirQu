import React, { Fragment } from 'react'

import { Typography } from '@material-ui/core'

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
            AccordionDetailsTypography: 'Karna data yang anda masukkan tidak memiliki header dengan ketentuan yang benar minimal header berisi: \n - Barcode \n - Name \n - Jenis',
        },
        {
            AccordionSummaryTypography: 'Bagai Mana Cara Membuat Excel yang Benar Untuk Import Data?',
            AccordionDetailsTypography: '',
        },
        {
            AccordionSummaryTypography: 'Mengapa Ada Warna Merah Di Tabel Review?',
            AccordionDetailsTypography: 'Karna ada kesalahan pada data excel yang dimasukkan.\n - Barcode : tidak boleh sama dengan yang sudah ada .\n - Name : tidak boleh sama dengan yang sudah ada \n - Jenis : hanya bisa diisi dengan JenisBarang yang sudah terdaftar',
        },
        {
            AccordionSummaryTypography: 'Mengapa Ada Warna Kuning Di Tabel Review?',
            AccordionDetailsTypography: 'Karna anda mengisi salah satu data dengan header berikut: \n - Stok \n - HargaModal \n - HargaJual \n - SatuanJual \n ket: disarankan melakukan secara maual karna tidak terdata di diagram pengeluaran \n untuk penulisan "SatuanJual" mohon liat panduan karna sensitif ',
        },
        // {
        //     AccordionSummaryTypography: 'Mengapa Saya Mendapat Peringatan Ada kesalahan pada Data?',
        //     AccordionDetailsTypography: 'Karna ada kesalahan pada data excel yang dimasukkan.\n - Barcode : tidak boleh sama dengan yang sudah ada .\n - Name : tidak boleh sama dengan yang sudah ada \n - Jenis : hanya bisa diisi dengan JenisBarang yang sudah terdaftar',
        // },
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