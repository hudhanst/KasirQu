import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Load_History_List, get_HistoryId_Detail, Export_History } from '../../../Store/Actions/Account.Actions'

import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@material-ui/core'
import { MUI_VerticalMargin, MUI_FullWidth } from '../../../MUI_theme'

import { Short_Column_INT, Short_Column_STR, Short_Column_Date } from '../Shorting'

import { DataTidakDitemukan } from '../Page404'
import GenericModals from '../GenericModals'
import HistoryDetail from './Account.History.HistoryDetail'

class HistoryList extends React.Component {
    state = {
        ExportHistoryList: [],
    }
    componentDidMount() {
        this.props.Load_History_List()
    }
    componentDidUpdate(prevProps) {
        if (this.props.HistoryList !== prevProps.HistoryList) {
            const { HistoryList } = this.props
            this.setState({ ExportHistoryList: HistoryList })
        }
        if (this.props.ExportHistoryList !== prevProps.ExportHistoryList) {
            const { ExportHistoryList } = this.props
            this.setState({ ExportHistoryList: ExportHistoryList })
        }
    }
    onClick_get_HistoryId_Detail(HistoryID) {
        this.props.get_HistoryId_Detail(HistoryID)
    }
    ButtonShortSTR(ColumnNumb) {
        Short_Column_STR('tabel_export_history', ColumnNumb)
    }
    ButtonShortINT(ColumnNumb) {
        Short_Column_INT('tabel_export_history', ColumnNumb)
    }
    ButtonShortDate(ColumnNumb) {
        Short_Column_Date('tabel_export_history', ColumnNumb)
    }
    Form_OnSubmit = E => {
        E.preventDefault()
        const ExportHistoryList = this.state.ExportHistoryList
        const { User } = this.props
        const authdata = {
            isKasir: User.isKasir,
            isAdmin: User.isAdmin,
            isSuperUser: User.isSuperUser,
        }

        this.props.Export_History(ExportHistoryList, authdata)
    }
    render() {
        const {
            ExportHistoryList,
        } = this.state
        const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth }
        const data = ExportHistoryList
        // console.log(data)
        return (
            <Fragment>
                {(data && data.length > 0) ?
                    <Fragment>
                        <Table stickyHeader id='tabel_export_history'>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: '5%' }} align='center' onClick={() => this.ButtonShortINT(0)}>No</TableCell>
                                    <TableCell style={{ width: '45%' }} align='center' onClick={() => this.ButtonShortSTR(1)}>UserName</TableCell>
                                    <TableCell style={{ width: '10%' }} align='center' onClick={() => this.ButtonShortDate(2)}>Tanggal</TableCell>
                                    <TableCell style={{ width: '10%' }} align='center' onClick={() => this.ButtonShortSTR(3)}>Location</TableCell>
                                    <TableCell style={{ width: '10%' }} align='center' onClick={() => this.ButtonShortSTR(4)}>Action</TableCell>
                                    <TableCell style={{ width: '30%' }} align='center' onClick={() => this.ButtonShortSTR(5)}>Status</TableCell>
                                    <TableCell style={{ width: '10%' }} align='center'>Detail</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item, index) => (
                                    <TableRow hover key={index + 1}>
                                        <TableCell align='center'>{index + 1}</TableCell>
                                        <TableCell align='left'>{item.UserName}</TableCell>
                                        <TableCell align='left'>{new Date(item.Tanggal).toLocaleString()}</TableCell>
                                        <TableCell align='center'>{item.Location}</TableCell>
                                        <TableCell align='center'>{item.Action}</TableCell>
                                        <TableCell align='center'>{item.Status ? "Sukses" : "Gagal"}</TableCell>
                                        <TableCell align='center'>
                                            <GenericModals
                                                size='xl'
                                                uncontrollsize={true}
                                                header='Account Detail'
                                                body={<HistoryDetail />}
                                                Buttoncolor='primary'
                                                ButtononClickeven={() => this.onClick_get_HistoryId_Detail(item._id)}
                                                Buttonlabel={'Detail'}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <form onSubmit={this.Form_OnSubmit}>
                            <Button type='submit' style={st_textfield} size="large" variant='contained' color='primary' >Export</Button>
                        </form>
                    </Fragment>
                    :
                    <DataTidakDitemukan />
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    User: state.Auth.User,
    HistoryList: state.Account.HistoryList,
    ExportHistoryList: state.Account.ExportHistoryList,
})

export default connect(mapStateToProps, { Load_History_List, get_HistoryId_Detail, Export_History })(HistoryList)