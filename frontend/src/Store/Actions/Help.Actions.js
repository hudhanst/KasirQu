import axios from 'axios'

import { tokenConfig, Get_IpAddres } from './Auth.Actions'

import {
    ////// HELP
    HELP_LOADING,
    HELP_LOADED,
    ////// HELP-REPORT
    LIST_INCOMEREPORT_BARANG,
    LIST_INCOMEREPORT_KEUANGAN,
    LIST_OUTCOMEREPORT_BARANG,
    LIST_OUTCOMEREPORT_MODAL,
    ////// END-HELP-REPORT
    ////// HELP-GRAPH
    LIST_GRAPH_ASET,
    LIST_QUERY_GRAPH_ASET,
    LIST_GRAPH_UANGMASUK,
    LIST_QUERY_GRAPH_UANGMASUK,
    LIST_GRAPH_UANGKELUAR,
    LIST_QUERY_GRAPH_UANGKELUAR,
    LIST_GRAPH_UANGLOSE,
    LIST_QUERY_GRAPH_UANGLOSE,
    LIST_GRAPH_INTENSITASTRANSAKSI,
    LIST_QUERY_GRAPH_INTENSITASTRANSAKSI,
    LIST_GRAPH_INTENSITASBARANGTRANSAKSI,
    LIST_QUERY_GRAPH_INTENSITASBARANGTRANSAKSI,
    ////// END-HELP-GRAPH
    ////// END-HELP
} from './Type.Actions'

import {
    Create_Error_Messages,
    Create_Success_Messages,
} from './Messages.Actions'

////// HELP
////// HELP-REPORT
export const Load_IncomeReport_Barang_List = () => async (dispatch, getState) => {
    dispatch({ type: HELP_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: Load_IncomeReport_Barang_List -> IpAddres', IpAddres)

        const Responses = await axios.get(`${IpAddres}/api/help/incomereport/reportbaranglist`, tokenConfig(getState))
        // console.log('Log: Load_IncomeReport_Barang_List -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: LIST_INCOMEREPORT_BARANG,
                payload: Responses.data.ReportList
            })
            dispatch({ type: HELP_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_IncomeReport_Barang_List -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: HELP_LOADED })
    }
}

export const Load_IncomeReport_Keuangan_List = () => async (dispatch, getState) => {
    dispatch({ type: HELP_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: Load_IncomeReport_Keuangan_List -> IpAddres', IpAddres)

        const Responses = await axios.get(`${IpAddres}/api/help/incomereport/reportkeuanganlist`, tokenConfig(getState))
        // console.log('Log: Load_IncomeReport_Keuangan_List -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: LIST_INCOMEREPORT_KEUANGAN,
                payload: Responses.data.ReportKeuanganList
            })
            dispatch({ type: HELP_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_IncomeReport_Keuangan_List -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: HELP_LOADED })
    }
}

export const Load_OutcomeReport_Barang_List = () => async (dispatch, getState) => {
    dispatch({ type: HELP_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: Load_OutcomeReport_Barang_List -> IpAddres', IpAddres)

        const Responses = await axios.get(`${IpAddres}/api/help/outcomereport/reportbaranglist`, tokenConfig(getState))
        if (Responses) {
            dispatch({
                type: LIST_OUTCOMEREPORT_BARANG,
                payload: Responses.data.ReportList
            })
            dispatch({ type: HELP_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_OutcomeReport_Barang_List -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: HELP_LOADED })
    }
}

export const Load_OutcomeReport_Modal_List = () => async (dispatch, getState) => {
    dispatch({ type: HELP_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: Load_OutcomeReport_Modal_List -> IpAddres', IpAddres)

        const Responses = await axios.get(`${IpAddres}/api/help/outcomereport/reportmodallist`, tokenConfig(getState))
        if (Responses) {
            dispatch({
                type: LIST_OUTCOMEREPORT_MODAL,
                payload: Responses.data.ReportModalList
            })
            dispatch({ type: HELP_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_OutcomeReport_Modal_List -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: HELP_LOADED })
    }
}
////// END-HELP-REPORT

////// HELP-GRAPH
export const Load_Graph_Aset_List = () => async (dispatch, getState) => {
    dispatch({ type: HELP_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: Load_Graph_Aset_List -> IpAddres', IpAddres)

        const Responses = await axios.get(`${IpAddres}/api/help/graph/aset`, tokenConfig(getState))
        // console.log('Log: Load_Graph_Aset_List -> Responses ', Responses)
        if (Responses) {
            dispatch({
                type: LIST_GRAPH_ASET,
                payload: Responses.data.AsetList
            })
            dispatch({ type: HELP_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_Graph_Aset_List -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: HELP_LOADED })
    }
}

export const Load_Query_Graph_Aset_List = (Query) => async (dispatch, getState) => {
    // console.log('Log: Load_Query_Graph_Aset_List -> Query', Query)
    dispatch({ type: HELP_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: Load_Query_Graph_Aset_List -> IpAddres', IpAddres)

        const Kepemilikan = Query.Kepemilikan
        const Barang = Query.Barang
        const JenisBarang = Query.JenisBarang
        const StokMin = Query.StokMin
        const StokMax = Query.StokMax
        const HargaJualMin = Query.HargaJualMin
        const HargaJualMax = Query.HargaJualMax
        const Ket = Query.Ket

        const body = JSON.stringify({ Kepemilikan, Barang, JenisBarang, StokMin, StokMax, HargaJualMin, HargaJualMax, Ket })
        const Responses = await axios.post(`${IpAddres}/api/help/graph/query/aset`, body, tokenConfig(getState))
        // console.log('Log: Load_Query_Graph_Aset_List -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: LIST_QUERY_GRAPH_ASET,
                payload: Responses.data.AsetList
            })
            if (Responses.data.AsetList) {
                const AsetList = Responses.data.AsetList
                if (AsetList.length >= 1) {
                    dispatch(Create_Success_Messages(Responses.status ? Responses.status : null, Responses.data.msg ? Responses.data.msg : null))
                } else {
                    dispatch(Create_Error_Messages(null, 'data tidak ditemukan'))
                }
            }
            dispatch({ type: HELP_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_Query_Graph_Aset_List -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: HELP_LOADED })
    }
}

export const Load_Graph_UangMasuk_List = () => async (dispatch, getState) => {
    dispatch({ type: HELP_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: Load_Graph_UangMasuk_List -> IpAddres', IpAddres)

        const Responses = await axios.get(`${IpAddres}/api/help/graph/uangmasuk`, tokenConfig(getState))
        // console.log('Log: Load_Graph_UangMasuk_List -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: LIST_GRAPH_UANGMASUK,
                payload: Responses.data.UangMasuk
            })
            dispatch({ type: HELP_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_Graph_UangMasuk_List -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: HELP_LOADED })
    }
}

export const Load_Query_Graph_UangMasuk_List = (Query) => async (dispatch, getState) => {
    // console.log('Log: Load_Query_Graph_UangMasuk_List -> Query', Query)
    dispatch({ type: HELP_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: Load_Query_Graph_UangMasuk_List -> IpAddres', IpAddres)

        const DateMin = Query.DateMin
        const DateMax = Query.DateMax
        const TotalTransaksiMin = Query.TotalTransaksiMin
        const TotalTransaksiMax = Query.TotalTransaksiMax
        const GrafikView = Query.GrafikView

        const body = JSON.stringify({ DateMin, DateMax, TotalTransaksiMin, TotalTransaksiMax, GrafikView })
        const Responses = await axios.post(`${IpAddres}/api/help/graph/query/uangmasuk`, body, tokenConfig(getState))
        // console.log('Log: Load_Query_Graph_UangMasuk_List -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: LIST_QUERY_GRAPH_UANGMASUK,
                payload: Responses.data.UangMasuk
            })
            if (Responses.data.UangMasuk) {
                const UangMasuk = Responses.data.UangMasuk
                if (UangMasuk.length >= 1) {
                    dispatch(Create_Success_Messages(Responses.status ? Responses.status : null, Responses.data.msg ? Responses.data.msg : null))
                } else {
                    dispatch(Create_Error_Messages(null, 'data tidak ditemukan'))
                }
            }
            dispatch({ type: HELP_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_Query_Graph_UangMasuk_List -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: HELP_LOADED })
    }
}

export const Load_Graph_UangKeluar_List = () => async (dispatch, getState) => {
    dispatch({ type: HELP_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: Load_Graph_UangKeluar_List -> IpAddres', IpAddres)

        const Responses = await axios.get(`${IpAddres}/api/help/graph/uangkeluar`, tokenConfig(getState))
        // console.log('Log: Load_Graph_UangKeluar_List -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: LIST_GRAPH_UANGKELUAR,
                payload: Responses.data.UangKeluar
            })
            dispatch({ type: HELP_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_Graph_UangKeluar_List -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: HELP_LOADED })
    }
}

export const Load_Query_Graph_UangKeluar_List = (Query) => async (dispatch, getState) => {
    // console.log('Log: Load_Query_Graph_UangKeluar_List -> Query', Query)
    dispatch({ type: HELP_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: Load_Query_Graph_UangKeluar_List -> IpAddres', IpAddres)

        const DateMin = Query.DateMin
        const DateMax = Query.DateMax
        const TotalTransaksiMin = Query.TotalTransaksiMin
        const TotalTransaksiMax = Query.TotalTransaksiMax
        const GrafikView = Query.GrafikView

        const body = JSON.stringify({ DateMin, DateMax, TotalTransaksiMin, TotalTransaksiMax, GrafikView })
        const Responses = await axios.post(`${IpAddres}/api/help/graph/query/uangkeluar`, body, tokenConfig(getState))
        // console.log('Log: Load_Query_Graph_UangKeluar_List -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: LIST_QUERY_GRAPH_UANGKELUAR,
                payload: Responses.data.UangKeluar
            })
            if (Responses.data.UangKeluar) {
                const UangKeluar = Responses.data.UangKeluar
                if (UangKeluar.length >= 1) {
                    dispatch(Create_Success_Messages(Responses.status ? Responses.status : null, Responses.data.msg ? Responses.data.msg : null))
                } else {
                    dispatch(Create_Error_Messages(null, 'data tidak ditemukan'))
                }
            }
            dispatch({ type: HELP_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_Query_Graph_UangKeluar_List -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: HELP_LOADED })
    }
}

export const Load_Graph_UangLose_List = () => async (dispatch, getState) => {
    dispatch({ type: HELP_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: Load_Graph_UangLose_List -> IpAddres', IpAddres)

        const Responses = await axios.get(`${IpAddres}/api/help/graph/uanglose`, tokenConfig(getState))
        // console.log('Log: Load_Graph_UangLose_List -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: LIST_GRAPH_UANGLOSE,
                payload: Responses.data.UangLose
            })
            dispatch({ type: HELP_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_Graph_UangLose_List -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: HELP_LOADED })
    }
}

export const Load_Query_Graph_UangLose_List = (Query) => async (dispatch, getState) => {
    dispatch({ type: HELP_LOADING })
    try {
        const IpAddres = Get_IpAddres()

        const DateMin = Query.DateMin
        const DateMax = Query.DateMax
        const DiskonMin = Query.DiskonMin
        const DiskonMax = Query.DiskonMax
        const PotonganMin = Query.PotonganMin
        const PotonganMax = Query.PotonganMax
        const GrafikView = Query.GrafikView

        const body = JSON.stringify({ DateMin, DateMax, DiskonMin, DiskonMax, PotonganMin, PotonganMax, GrafikView })
        const Responses = await axios.post(`${IpAddres}/api/help/graph/query/uanglose`, body, tokenConfig(getState))
        // console.log('Log: Load_Query_Graph_UangLose_List -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: LIST_QUERY_GRAPH_UANGLOSE,
                payload: Responses.data.UangLose
            })
            if (Responses.data.UangLose) {
                const UangLose = Responses.data.UangLose
                if (UangLose.length >= 1) {
                    dispatch(Create_Success_Messages(Responses.status ? Responses.status : null, Responses.data.msg ? Responses.data.msg : null))
                } else {
                    dispatch(Create_Error_Messages(null, 'data tidak ditemukan'))
                }
            }
            dispatch({ type: HELP_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_Query_Graph_UangLose_List -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: HELP_LOADED })
    }
}

export const Load_Graph_IntensitasTransaksi_List = () => async (dispatch, getState) => {
    dispatch({ type: HELP_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: Load_Graph_IntensitasTransaksi_List -> IpAddres', IpAddres)

        const Responses = await axios.get(`${IpAddres}/api/help/graph/intensitastransaksi`, tokenConfig(getState))
        // console.log('Log: Load_Graph_IntensitasTransaksi_List -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: LIST_GRAPH_INTENSITASTRANSAKSI,
                payload: Responses.data.IntensitasTransaksi
            })
            dispatch({ type: HELP_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_Graph_IntensitasTransaksi_List -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: HELP_LOADED })
    }
}

export const Load_Query_Graph_IntensitasTransaksi_List = (Query) => async (dispatch, getState) => {
    // console.log('Log: Load_Query_Graph_Aset_List -> Query', Query)
    dispatch({ type: HELP_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: Load_Query_Graph_IntensitasTransaksi_List -> IpAddres', IpAddres)

        const NamaKasir = Query.NamaKasir
        const DateMin = Query.DateMin
        const DateMax = Query.DateMax
        const Jenis = Query.Jenis
        const DiskonMin = Query.DiskonMin
        const DiskonMax = Query.DiskonMax
        const PotonganHargaMin = Query.PotonganHargaMin
        const PotonganHargaMax = Query.PotonganHargaMax
        const TotalPembayaranMin = Query.TotalPembayaranMin
        const TotalPembayaranMax = Query.TotalPembayaranMax
        const GrafikView = Query.GrafikView

        const body = JSON.stringify({ NamaKasir, DateMin, DateMax, Jenis, DiskonMin, DiskonMax, PotonganHargaMin, PotonganHargaMax, TotalPembayaranMin, TotalPembayaranMax, GrafikView })
        const Responses = await axios.post(`${IpAddres}/api/help/graph/query/intensitastransaksi`, body, tokenConfig(getState))
        // console.log('Log: Load_Query_Graph_IntensitasTransaksi_List -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: LIST_QUERY_GRAPH_INTENSITASTRANSAKSI,
                payload: Responses.data.IntensitasTransaksi
            })
            if (Responses.data.IntensitasTransaksi) {
                const IntensitasTransaksi = Responses.data.IntensitasTransaksi
                if (IntensitasTransaksi.length >= 1) {
                    dispatch(Create_Success_Messages(Responses.status ? Responses.status : null, Responses.data.msg ? Responses.data.msg : null))
                } else {
                    dispatch(Create_Error_Messages(null, 'data tidak ditemukan'))
                }
            }
            dispatch({ type: HELP_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_Query_Graph_IntensitasTransaksi_List -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: HELP_LOADED })
    }
}

export const Load_Graph_IntensitasBarangTransaksi_List = () => async (dispatch, getState) => {
    dispatch({ type: HELP_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: Load_Graph_IntensitasBarangTransaksi_List -> IpAddres', IpAddres)

        const Responses = await axios.get(`${IpAddres}/api/help/graph/intensitasbarangtransaksi`, tokenConfig(getState))
        // console.log('Log: Load_Graph_IntensitasBarangTransaksi_List -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: LIST_GRAPH_INTENSITASBARANGTRANSAKSI,
                payload: Responses.data.IntensitasBarangTransaksi
            })
            dispatch({ type: HELP_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_Graph_IntensitasBarangTransaksi_List -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: HELP_LOADED })
    }
}

export const Load_Query_Graph_IntensitasBarangTransaksi_List = (Query) => async (dispatch, getState) => {
    // console.log('Log: Load_Query_Graph_IntensitasBarangTransaksi_List -> Query', Query)
    dispatch({ type: HELP_LOADING })
    try {
        const IpAddres = Get_IpAddres()
        // console.log('Log: Load_Query_Graph_IntensitasBarangTransaksi_List -> IpAddres', IpAddres)

        const DateMin = Query.DateMin
        const DateMax = Query.DateMax
        const Tipe = Query.Tipe
        const Kepemilikan = Query.Kepemilikan
        const JenisBarang = Query.JenisBarang
        const Barang = Query.Barang
        const GrafikView = Query.GrafikView

        const body = JSON.stringify({ DateMin, DateMax, Tipe, Kepemilikan, JenisBarang, Barang, GrafikView })
        const Responses = await axios.post(`${IpAddres}/api/help/graph/query/intensitasbarangtransaksi`, body, tokenConfig(getState))
        // console.log('Log: Load_Query_Graph_IntensitasBarangTransaksi_List -> Responses', Responses)
        if (Responses) {
            dispatch({
                type: LIST_QUERY_GRAPH_INTENSITASBARANGTRANSAKSI,
                payload: Responses.data.IntensitasBarangTransaksi
            })
            if (Responses.data.IntensitasBarangTransaksi) {
                const IntensitasBarangTransaksi = Responses.data.IntensitasBarangTransaksi
                if (IntensitasBarangTransaksi.length >= 1) {
                    dispatch(Create_Success_Messages(Responses.status ? Responses.status : null, Responses.data.msg ? Responses.data.msg : null))
                } else {
                    dispatch(Create_Error_Messages(null, 'data tidak ditemukan'))
                }
            }
            dispatch({ type: HELP_LOADED })
        }
    } catch (err) {
        console.log('Log: Load_Query_Graph_IntensitasBarangTransaksi_List -> err', err)
        dispatch(
            Create_Error_Messages(
                err.response ? (
                    err.response.status ? err.response.status
                        : null) : null,
                err.response ? (
                    err.response.data.msg ? err.response.data.msg
                        : null) : 'anda tidak terhubung dengan server'
            ))
        dispatch({ type: HELP_LOADED })
    }
}
////// END-HELP-GRAPH
////// END-HELP