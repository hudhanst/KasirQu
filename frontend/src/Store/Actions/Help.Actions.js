import axios from 'axios'

import { tokenConfig } from './Auth.Actions'

import {
    ////// HELP
    HELP_LOADING,
    HELP_LOADED,
    ////// HELP-REPORT
    LIST_INCOMEREPORT_BARANG,
    LIST_QUERY_INCOMEREPORT_BARANG,
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
    // Create_Success_Messages,
} from './Messages.Actions'

////// HELP
////// HELP-REPORT
export const Load_IncomeReport_Barang_List = () => (dispatch, getState) => {
    dispatch({ type: HELP_LOADING })
    axios.get('/api/help/incomereport/reportbaranglist', tokenConfig(getState))
        .then(res => {
            // console.log(res)
            dispatch({
                type: LIST_INCOMEREPORT_BARANG,
                payload: res.data.ReportList
            })
            // dispatch({ type: HELP_LOADED })
        }).catch(err => {
            console.log(err.response)
            dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
            // dispatch({ type: HELP_LOADED })
        })
    dispatch({ type: HELP_LOADED })
}

export const Load_Query_IncomeReport_Barang_List = (data) => (dispatch, getState) => {
    dispatch({ type: HELP_LOADING })

    const JenisBarang = data.JenisBarang
    const Kepemilikan = data.Kepemilikan
    const isAllData = data.isAllData
    const DateMin = isAllData === true ? '' : data.DateMin
    const DateMax = isAllData === true ? '' : data.DateMax

    const body = JSON.stringify({ JenisBarang, Kepemilikan, DateMin, DateMax })
    axios.post('/api/help/incomereport/queryreportbaranglist', body, tokenConfig(getState))
        .then(res => {
            // console.log(res)
            dispatch({
                type: LIST_QUERY_INCOMEREPORT_BARANG,
                payload: res.data.QueryReportList
            })
            // dispatch({ type: HELP_LOADED })
        }).catch(err => {
            console.log(err.response)
            dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
            // dispatch({ type: HELP_LOADED })
        })
    dispatch({ type: HELP_LOADED })
}

export const Load_IncomeReport_Keuangan_List = () => (dispatch, getState) => {
    dispatch({ type: HELP_LOADING })
    axios.get('/api/help/incomereport/reportkeuanganlist', tokenConfig(getState))
        .then(res => {
            // console.log(res)
            dispatch({
                type: LIST_INCOMEREPORT_KEUANGAN,
                payload: res.data.ReportKeuanganList
            })
            // dispatch({ type: HELP_LOADED })
        }).catch(err => {
            console.log(err.response)
            dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
            // dispatch({ type: HELP_LOADED })
        })
    dispatch({ type: HELP_LOADED })
}

export const Load_OutcomeReport_Barang_List = () => (dispatch, getState) => {
    dispatch({ type: HELP_LOADING })
    axios.get('/api/help/outcomereport/reportbaranglist', tokenConfig(getState))
        .then(res => {
            // console.log(res)
            dispatch({
                type: LIST_OUTCOMEREPORT_BARANG,
                payload: res.data.ReportList
            })
            // dispatch({ type: HELP_LOADED })
        }).catch(err => {
            console.log(err.response)
            dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
            // dispatch({ type: HELP_LOADED })
        })
    dispatch({ type: HELP_LOADED })
}

export const Load_OutcomeReport_Modal_List = () => (dispatch, getState) => {
    dispatch({ type: HELP_LOADING })
    axios.get('/api/help/outcomereport/reportmodallist', tokenConfig(getState))
        .then(res => {
            // console.log(res)
            dispatch({
                type: LIST_OUTCOMEREPORT_MODAL,
                payload: res.data.ReportModalList
            })
            // dispatch({ type: HELP_LOADED })
        }).catch(err => {
            console.log(err.response)
            dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
            // dispatch({ type: HELP_LOADED })
        })
    dispatch({ type: HELP_LOADED })
}
////// END-HELP-REPORT

////// HELP-GRAPH
export const Load_Graph_Aset_List = () => (dispatch, getState) => {
    dispatch({ type: HELP_LOADING })
    axios.get('/api/help/graph/asetlist', tokenConfig(getState))
        .then(res => {
            // console.log(res)
            dispatch({
                type: LIST_GRAPH_ASET,
                payload: res.data.AsetList
            })
            // dispatch({ type: HELP_LOADED })
        }).catch(err => {
            console.log(err.response)
            dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
            // dispatch({ type: HELP_LOADED })
        })
    dispatch({ type: HELP_LOADED })
}

export const Load_Query_Graph_Aset_List = (Query) => (dispatch, getState) => {
    dispatch({ type: HELP_LOADING })
    const Kepemilikan = Query.Kepemilikan
    const Barang = Query.Barang
    const JenisBarang = Query.JenisBarang
    const StokMin = Query.StokMin
    const StokMax = Query.StokMax
    const HargaJualMin = Query.HargaJualMin
    const HargaJualMax = Query.HargaJualMax
    const Ket = Query.Ket

    const body = JSON.stringify({ Kepemilikan, Barang, JenisBarang, StokMin, StokMax, HargaJualMin, HargaJualMax, Ket })
    axios.post('/api/help/graph/queryasetlist', body, tokenConfig(getState))
        .then(res => {
            // console.log(res)
            dispatch({
                type: LIST_QUERY_GRAPH_ASET,
                payload: res.data.AsetList
            })
            // dispatch({ type: HELP_LOADED })
        }).catch(err => {
            console.log(err.response)
            dispatch(Create_Error_Messages(err.response.status ? err.response.status : null, err.response.data.msg ? err.response.data.msg : null))
            // dispatch({ type: HELP_LOADED })
        })
    dispatch({ type: HELP_LOADED })
}
////// END-HELP-GRAPH
////// END-HELP