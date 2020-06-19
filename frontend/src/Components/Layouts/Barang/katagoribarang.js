import React, { Fragment } from 'react'

import { MUI_FullWidth, MUI_VerticalMargin } from '../../../MUI_theme'

import BreadCrumbs from '../../Containers/BreadCrumbs'
import GenericModals from '../../Containers/GenericModals'
import AddJenisBarang from '../../Containers/Barang/Barang.AddJenisBarang'
import KatagoriBarangList from '../../Containers/Barang/Barang.KatagoriBarangList'

const KatagoriBarang = () => {
    const breadcrumbs = [{ name: 'Barang', link: 'barang' }, { name: 'Katagori Barang', link: 'barang/katagoribarang' }]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <GenericModals
                size='m'
                header='Tambah Jenis Barang'
                body={<AddJenisBarang />}
                Buttonstyle={{ ...MUI_FullWidth, ...MUI_VerticalMargin }}
                Buttonvariant='contained'
                Buttonsize='large'
                Buttoncolor='primary'
                ButtononClickeven={() => null}
                Buttonlabel={'Tambah Jenis Barang'}
            />
            <hr />
            <KatagoriBarangList />
        </Fragment>
    )
}

export default KatagoriBarang