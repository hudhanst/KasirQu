import React from 'react'

import { Route, Switch } from 'react-router-dom'

import PrivateRoute from './Security/PrivateRoute'

import Login from './Components/Layouts/Account/Login'
import FirsTimeUse from './Components/Layouts/FirsTimeUse'
import Logout from './Components/Layouts/Account/Logout'
import { HalamanTidakDitemukan } from './Components/Containers/Page404'

import Home from './Components/Layouts/Home'

import Transaksi from './Components/Layouts/Transaksi/Transaksi'
import TransaksiImportExport from './Components/Layouts/Transaksi/TransaksiImportExport'
import Belanja from './Components/Layouts/Transaksi/Belanja'
import TransaksiList from './Components/Layouts/Transaksi/TransaksiList'

import Barang from './Components/Layouts/Barang/Barang'
import KatagoriBarang from './Components/Layouts/Barang/katagoribarang'
import KatagoriBarangImportExport from './Components/Layouts/Barang/KatagoriBarangImportExport'
import KonfigurasiBarang from './Components/Layouts/Barang/KonfigurasiBarang'
import BarangImportExport from './Components/Layouts/Barang/BarangImportExport'

import Help from './Components/Layouts/Help/Help'
import IncomeReport from './Components/Layouts/Help/IncomeReport'
import OutcomeReport from './Components/Layouts/Help/OutcomeReport'
import Graph from './Components/Layouts/Help/Graph'

import {
    ////// USER
    Help_TingkatanAkun,
    Help_PerbedaanTingkatanAkun,
    Help_TambahUser,
    Help_UpdateUser,
    Help_DeleteUser,
    Help_UpdateToko,
    Help_History,
    ////// HELP
    Help_IncomeReport,
    Help_OutcomeReport,
    Help_Graph,
    ////// BARANG
    Help_BarangList,
    Help_Barang,
    Help_SatuanJualBarang,
    Help_JenisBarang,
    ////// TRANSAKSI
    Help_Transaksi,
    Help_Belanja,
    Help_Stok,
    Help_TransaksiDetail,
    ////// GENERAL||NAVIGASI
    Help_ImportExport,
    Help_LightDark,
    Help_PanduanPenggunaan,
    Help_PanduanTampilan,
    Help_PanduanMenu,
    Help_FirstTimeUse,
    Help_Login,
} from './Components/Layouts/Help/Help.Help'

import Account from './Components/Layouts/Account/Account'
import UserList from './Components/Layouts/Account/UserList'
import TokoDetail from './Components/Layouts/Account/TokoDetail'
import History from './Components/Layouts/Account/History'

const BaseRouter = () => {
    return (
        <Switch>
            <PrivateRoute exact path="/" component={Home} />

            <PrivateRoute exact path="/transaksi" component={Transaksi} />
            <PrivateRoute exact path="/transaksi/belanja" component={Belanja} SecurityType={'Privacry'} />
            <PrivateRoute exact path="/transaksi/transaksilist" component={TransaksiList} SecurityType={'Privacry'} />
            <PrivateRoute exact path="/transaksi/importexport" component={TransaksiImportExport} SecurityType={'SuperPrivacry'} />

            <PrivateRoute exact path="/barang" component={Barang} />
            <PrivateRoute exact path="/barang/katagoribarang" component={KatagoriBarang} SecurityType={'Privacry'} />
            <PrivateRoute exact path="/barang/konfigurasibarang" component={KonfigurasiBarang} SecurityType={'Privacry'} />
            <PrivateRoute exact path="/barang/katagoribarang/importexport" component={KatagoriBarangImportExport} SecurityType={'SuperPrivacry'} />
            <PrivateRoute exact path="/barang/konfigurasibarang/importexport" component={BarangImportExport} SecurityType={'SuperPrivacry'} />

            <PrivateRoute exact path="/help" component={Help} />
            <PrivateRoute exact path="/help/incomereport" component={IncomeReport} SecurityType={'Privacry'} />
            <PrivateRoute exact path="/help/outcomereport" component={OutcomeReport} SecurityType={'Privacry'} />
            <PrivateRoute exact path="/help/graph" component={Graph} SecurityType={'Privacry'} />


            <PrivateRoute exact path="/help/tingkatan_akun" component={Help_TingkatanAkun} />
            <PrivateRoute exact path="/help/perbedaan_tingkatan_akun" component={Help_PerbedaanTingkatanAkun} />
            <PrivateRoute exact path="/help/tambah_user" component={Help_TambahUser} />
            <PrivateRoute exact path="/help/update_user" component={Help_UpdateUser} />
            <PrivateRoute exact path="/help/delete_user" component={Help_DeleteUser} />
            <PrivateRoute exact path="/help/update_toko" component={Help_UpdateToko} />
            <PrivateRoute exact path="/help/history" component={Help_History} />

            <PrivateRoute exact path="/help/incomereport_help" component={Help_IncomeReport} />
            <PrivateRoute exact path="/help/outcomereport_help" component={Help_OutcomeReport} />
            <PrivateRoute exact path="/help/graph_help" component={Help_Graph} />

            <PrivateRoute exact path="/help/barang_list" component={Help_BarangList} />
            <PrivateRoute exact path="/help/barang" component={Help_Barang} />
            <PrivateRoute exact path="/help/satuan_jual_barang" component={Help_SatuanJualBarang} />
            <PrivateRoute exact path="/help/jenisbarang" component={Help_JenisBarang} />

            <PrivateRoute exact path="/help/transaksi" component={Help_Transaksi} />
            <PrivateRoute exact path="/help/belanja" component={Help_Belanja} />
            <PrivateRoute exact path="/help/stok" component={Help_Stok} />
            <PrivateRoute exact path="/help/transaksi_detail" component={Help_TransaksiDetail} />

            <PrivateRoute exact path="/help/import-export" component={Help_ImportExport} />
            <PrivateRoute exact path="/help/light-dark" component={Help_LightDark} />
            <PrivateRoute exact path="/help/penggunaan_help" component={Help_PanduanPenggunaan} />
            <PrivateRoute exact path="/help/tampilan_help" component={Help_PanduanTampilan} />
            <PrivateRoute exact path="/help/menu_help" component={Help_PanduanMenu} />
            <Route exact path="/help/first_time_use" component={Help_FirstTimeUse} />
            <Route exact path="/help/login" component={Help_Login} />


            <PrivateRoute exact path="/account" component={Account} />
            <PrivateRoute exact path="/account/userlist" component={UserList} SecurityType={'Privacry'} />
            <PrivateRoute exact path="/account/tokodetail" component={TokoDetail} SecurityType={'Privacry'} />
            <PrivateRoute exact path="/account/tokodetail/history" component={History} SecurityType={'SuperPrivacry'} />

            <Route exact path="/firsttimeuse" component={FirsTimeUse} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route path="*" component={HalamanTidakDitemukan} />

        </Switch>
    )
}

export default BaseRouter