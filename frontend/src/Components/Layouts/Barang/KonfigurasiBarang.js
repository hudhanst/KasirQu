import React, { Fragment } from 'react'

import { MUI_FullWidth, MUI_VerticalMargin } from '../../../MUI_theme'

import BreadCrumbs from '../../Containers/BreadCrumbs'
import GenericModals from '../../Containers/GenericModals'
import AddBarang from '../../Containers/Barang/Barang.AddBarang'
import { TableSearching } from '../../Containers/Searching'
import BarangList from '../../Containers/Barang/Barang.BarangList'

const KonfigurasiBarang = () => {
    const breadcrumbs = [{ name: 'Barang', link: 'barang' }, { name: 'Konfigurasi Barang', link: 'barang/konfigurasibarang' }]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <GenericModals
                size='m'
                header='Tambah Barang'
                body={<AddBarang />}
                Buttonstyle={{ ...MUI_FullWidth, ...MUI_VerticalMargin }}
                Buttonvariant='contained'
                Buttonsize='large'
                Buttoncolor='primary'
                ButtononClickeven={() => null}
                Buttonlabel={'Tambah Barang'}
            />
            <hr />
            <TableSearching tablename={'tabel_barang'} tdnumber={2} width='xl' label={null} />
            <hr />
            <BarangList />
        </Fragment>
    )
}

export default KonfigurasiBarang