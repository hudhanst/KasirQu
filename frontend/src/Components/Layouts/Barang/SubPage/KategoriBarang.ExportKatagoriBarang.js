import React, { Fragment } from 'react'

import { Typography } from '@material-ui/core'

import { TableSearching } from '../../../Containers/Searching'
import KatagoriBarangExport from '../../../Containers/Barang/Barang.KatagoriBarangExport'
import QueryKatagoriBarang from '../../../Containers/Barang/Barang.KatagoriBarang.Query'

const ExportKatagoriBarang = () => {
    // const numberone = [1, 3, 5, 7, 9]
    // const numbertwo = [1, 2, 3, 4, 5]
    // const samenumber = numberone.filter(num => numbertwo.includes(num)) //
    // const diferentnumber = numberone.filter(num => !numbertwo.includes(num))
    // console.log('samenumber', samenumber)
    // console.log('diferentnumber', diferentnumber)
    return (
        <Fragment>
            <Typography variant='h4' align='center'>
                Export Kategori Barang
            </Typography>
            <TableSearching
                hidesearch={true}

                advancesearch={true}
                accordiondetails={<QueryKatagoriBarang />}
            />
            <KatagoriBarangExport />
        </Fragment>
    )
}

export default ExportKatagoriBarang