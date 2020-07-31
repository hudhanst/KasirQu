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
} from '../Actions/Type.Actions'

const initialState = {
    ////// HELP
    isHelpLoading: false,
    ////// HELP-REPORT
    IncomeReportBarangList: [],
    IncomeReportKeuanganList: [],
    OutcomeReportBarangList: [],
    OutcomeReportModalList: [],
    ////// END-HELP-REPORT
    ////// HELP-GRAPH
    GraphAsetList: [],
    GraphUangMasukList: [],
    GraphUangKeluarList: [],
    GraphUangLoseList: [],
    GraphIntensitasTransaksiList: [],
    GraphIntensitasBarangTransaksiList: [],
    ////// END-HELP-GRAPH
    ////// END-HELP
}

export default function (state = initialState, action) {
    switch (action.type) {
        ////// HELP
        case HELP_LOADING:
            return {
                ...state,
                isHelpLoading: true,
            }
        case HELP_LOADED:
            return {
                ...state,
                isHelpLoading: false,
            }
        ////// HELP-REPORT
        case LIST_INCOMEREPORT_BARANG:
            return {
                ...state,
                IncomeReportBarangList: action.payload,
            }
        case LIST_INCOMEREPORT_KEUANGAN:
            return {
                ...state,
                IncomeReportKeuanganList: action.payload,
            }
        case LIST_OUTCOMEREPORT_BARANG:
            return {
                ...state,
                OutcomeReportBarangList: action.payload,
            }
        case LIST_OUTCOMEREPORT_MODAL:
            return {
                ...state,
                OutcomeReportModalList: action.payload,
            }
        ////// END-HELP-REPORT
        ////// HELP-GRAPH
        case LIST_GRAPH_ASET:
        case LIST_QUERY_GRAPH_ASET:
            return {
                ...state,
                GraphAsetList: action.payload,
            }
        case LIST_GRAPH_UANGMASUK:
        case LIST_QUERY_GRAPH_UANGMASUK:
            return {
                ...state,
                GraphUangMasukList: action.payload,
            }
        case LIST_GRAPH_UANGKELUAR:
        case LIST_QUERY_GRAPH_UANGKELUAR:
            return {
                ...state,
                GraphUangKeluarList: action.payload,
            }
        case LIST_GRAPH_UANGLOSE:
        case LIST_QUERY_GRAPH_UANGLOSE:
            return {
                ...state,
                GraphUangLoseList: action.payload,
            }
        case LIST_GRAPH_INTENSITASTRANSAKSI:
        case LIST_QUERY_GRAPH_INTENSITASTRANSAKSI:
            return {
                ...state,
                GraphIntensitasTransaksiList: action.payload,
            }
        case LIST_GRAPH_INTENSITASBARANGTRANSAKSI:
        case LIST_QUERY_GRAPH_INTENSITASBARANGTRANSAKSI:
            return {
                ...state,
                GraphIntensitasBarangTransaksiList: action.payload,
            }
        ////// END-HELP-GRAPH
        ////// END-HELP
        default:
            return state
    }
}