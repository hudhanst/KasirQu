import axios from 'axios'

import { tokenConfig, Get_IpAddres } from './Auth.Actions'

import {
    ////// HELP
    HELP_LOADING,
    HELP_LOADED,
    ////// HELP-REPORT
    LIST_INCOMEREPORT_BARANG,
    // LIST_QUERY_INCOMEREPORT_BARANG,
    LIST_INCOMEREPORT_KEUANGAN,
    ////// END-HELP-REPORT
    ////// HELP-GRAPH
    LIST_GRAPH_ASET,
    LIST_QUERY_GRAPH_ASET,
    LIST_OUTCOMEREPORT_BARANG,
    LIST_OUTCOMEREPORT_MODAL,
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

// export const Load_Query_IncomeReport_Barang_List = (data) => (dispatch, getState) => {
//     dispatch({ type: HELP_LOADING })

//     const JenisBarang = data.JenisBarang
//     const Kepemilikan = data.Kepemilikan
//     const isAllData = data.isAllData
//     const DateMin = isAllData === true ? '' : data.DateMin
//     const DateMax = isAllData === true ? '' : data.DateMax

//     const body = JSON.stringify({ JenisBarang, Kepemilikan, DateMin, DateMax })
//     axios.post('/api/help/incomereport/queryreportbaranglist', body, tokenConfig(getState))
//         .then(res => {
//             // console.log(res)
//             dispatch({
//                 type: LIST_QUERY_INCOMEREPORT_BARANG,
//                 payload: res.data.QueryReportList
//             })
//             // dispatch({ type: HELP_LOADED })
//         }).catch(err => {
//             console.log(err.response)
//             dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
//             // dispatch({ type: HELP_LOADED })
//         })
//     dispatch({ type: HELP_LOADED })
// }

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

        const Responses = await axios.get(`${IpAddres}/api/help/graph/asetlist`, tokenConfig(getState))
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
        const Responses = await axios.post(`${IpAddres}/api/help/graph/queryasetlist`, body, tokenConfig(getState))
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
////// END-HELP-GRAPH
////// END-HELP