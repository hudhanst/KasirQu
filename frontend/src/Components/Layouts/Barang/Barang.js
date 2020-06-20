import React, { Fragment } from 'react'

import BreadCrumbs from '../../Containers/BreadCrumbs'
import Searching from '../../Containers/Searching'
import TabelBarang from '../../Containers/Barang/Barang.TabelBarang'

const Barang = () => {
    const breadcrumbs = [{ name: 'Barang', link: 'barang' }]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Searching tablename={'tabel_data_barang'} tdnumber={2} width='xl' label={null} />
            <TabelBarang />
        </Fragment>
    )
}

export default Barang