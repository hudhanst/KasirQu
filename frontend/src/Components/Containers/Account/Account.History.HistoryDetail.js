import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { get_HistoryDetail } from '../../../Store/Actions/Account.Actions'

import { TextField, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

import { withTheme } from '@material-ui/core/styles'
import { MUI_FullWidth, MUI_VerticalMargin } from '../../../MUI_theme'

import { DataTidakDitemukan } from '../Page404'

class HistoryDetail extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.idDetailHistory !== prevProps.idDetailHistory) {
            const { idDetailHistory } = this.props
            this.props.get_HistoryDetail(idDetailHistory)
        }
    }
    componentDidMount() {
        const { idDetailHistory } = this.props
        if (idDetailHistory !== null) {
            this.props.get_HistoryDetail(idDetailHistory)
        }
    }
    render() {
        const theme = this.props.theme
        const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth, ...theme.customTheme.readonlytextfield }
        const Detail = this.props.HistoryDetail
        const Detail_Change = Detail ? JSON.parse(Detail.Change) : null
        // console.log('Detail_Change', Detail_Change)
        const DataKeys = Detail_Change ? Object.keys(Detail_Change) : null
        // console.log('DataKeys', DataKeys)
        const DataChange = []
        if (Detail_Change) {
            DataChange.push(Detail_Change)
        }
        // console.log('DataChange', DataChange)
        return (
            <Fragment>
                {Detail ? (
                    <Fragment>
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='User Name' name='UserName' value={Detail.UserName} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Tanggal' name='Tanggal' value={Detail.Tanggal} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Lokasi' name='Location' value={Detail.Location} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Aksi' name='Action' value={Detail.Action} />
                        {/* <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Change' name='Change' value={Detail.Change} /> */}
                        <label>Perubahan:</label>
                        {DataChange && DataChange.length > 0 ? (
                            <Fragment>
                                <Table id='tabel_history_detail_change'>
                                    <TableHead >
                                        <TableRow>
                                            <TableCell align="center">No</TableCell>
                                            {DataKeys.map((item) => (
                                                <TableCell
                                                    align="center"
                                                    style={{ maxWidth: `${(100 / (DataKeys.length) + 2) - 1}%` }}
                                                    key={item}
                                                >
                                                    {item}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {DataChange.map((item, index) => (
                                            <TableRow hover key={index}>
                                                <TableCell align="center" >{index + 1}</TableCell>
                                                {Object.keys(item).map((itemitem, indexindex) => (
                                                    <TableCell align="center" key={`${index}${indexindex}`} >
                                                        {JSON.stringify(item[itemitem])}
                                                        {/* {(typeof item[itemitem] === 'Array') ? JSON.stringify(item[itemitem]) : item[itemitem]} */}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Fragment>
                        ) : <DataTidakDitemukan />}
                        <hr />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Status' name='Status' value={Detail.Status ? "Sukses" : "Gagal"} />

                    </Fragment>
                ) : <DataTidakDitemukan />}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    idDetailHistory: state.Account.idDetailHistory,
    HistoryDetail: state.Account.HistoryDetail,
})

export default connect(mapStateToProps, { get_HistoryDetail })(withTheme(HistoryDetail))