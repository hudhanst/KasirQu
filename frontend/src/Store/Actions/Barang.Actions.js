// import axios from 'axios'

import {
    BARANG_LOADING,
    BARANG_LOADED,
    TABLE_BARANG_LOADED,
} from './Type.Actions'

export const LoadTabelBarang = () => (dispatch) => {
    dispatch({ type: BARANG_LOADING })
    dispatch({ 
        type: TABLE_BARANG_LOADED,
        // payload: isDarkMode,
    })
    dispatch({ type: BARANG_LOADED })
}