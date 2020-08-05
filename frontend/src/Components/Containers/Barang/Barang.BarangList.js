import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Load_Barang_List, Load_Barang_List_Base_On_Jenis, get_BarangId_Detail, get_BarangId_Update, Delete_a_Barang } from '../../../Store/Actions/Barang.Actions'

import { Short_Column_INT, Short_Column_STR, Short_Column_Money } from '../Shorting'

import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@material-ui/core'

import { MUI_FullWidth, MUI_VerticalMargin } from '../../../MUI_theme'

import { DataTidakDitemukan } from '../Page404'
import { ConvertInttoMoney } from '../Formater'
import GenericModals from '../GenericModals'
import BarangDetail from './Barang.BarangDetail'
import BarangUpdate from './Barang.BarangUpdate'

class BarangList extends React.Component {
    componentDidMount() {
        if (this.props.LoadBarangListBaseOnJenis) {
            this.props.Load_Barang_List_Base_On_Jenis(this.props.LoadBarangListBaseOnJenis)
        } else {
            this.props.Load_Barang_List()
        }
    }
    ButtonShortSTR(ColumnNumb) {
        Short_Column_STR('tabel_barang', ColumnNumb)
    }
    ButtonShortINT(ColumnNumb) {
        Short_Column_INT('tabel_barang', ColumnNumb)
    }
    ButtonShortMoney(ColumnNumb) {
        Short_Column_Money('tabel_barang', ColumnNumb)
    }
    ConverNumberToMoneyFormat(OriginValue) {
        const MoneyFormate = ConvertInttoMoney(OriginValue ? OriginValue : 0)
        return MoneyFormate
    }
    onClick_get_BarangId_Detail(BarangID) {
        this.props.get_BarangId_Detail(BarangID)
    }
    onClick_get_BarangId_Update(BarangID) {
        this.props.get_BarangId_Update(BarangID)
    }
    onClick_get_Delete_a_Barang(BarangID) {
        const { User } = this.props
        const authdata = {
            isKasir: User.isKasir,
            isAdmin: User.isAdmin,
            isSuperUser: User.isSuperUser,
        }
        this.props.Delete_a_Barang(BarangID, authdata)
    }
    render() {
        const data = this.props.BarangList
        const { User, idDetailBarang } = this.props
        const DeleteButton = () => {
            return (
                <Fragment>
                    <Button
                        style={{ ...MUI_FullWidth, MUI_VerticalMargin }}
                        variant='contained'
                        color='secondary'
                        onClick={() => this.onClick_get_Delete_a_Barang(idDetailBarang)}
                    >
                        Delete
                        </Button>
                </Fragment>
            )
        }
        return (
            <Fragment>
                {data ?
                    <Table stickyHeader id='tabel_barang'>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(0)}>No</TableCell>
                                <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(1)}>Barcode</TableCell>
                                <TableCell style={{ width: '35%' }} align="center" onClick={() => this.ButtonShortSTR(2)}>Nama Barang</TableCell>
                                <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(3)}>Jenis Barang</TableCell>
                                <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(4)}>Stok Barang</TableCell>
                                <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortMoney(5)}>Harga Jual&nbsp;(Rp)</TableCell>
                                <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortMoney(6)}>Modal&nbsp;(Rp)</TableCell>
                                <TableCell style={{ width: '5%' }} align='center'>Detail</TableCell>
                                {User ? ((User.isSuperUser || User.isAdmin) ?
                                    <Fragment>
                                        <TableCell style={{ width: '5%' }} align='center'>Edit</TableCell>
                                        <TableCell style={{ width: '5%' }} align='center'>Delete</TableCell>
                                    </Fragment>
                                    : null)
                                    : null
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item, index) => (
                                <TableRow hover key={index + 1}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="left">{item.Barcode}</TableCell>
                                    <TableCell align="left">{item.Name}</TableCell>
                                    <TableCell align="left">{item.Jenis}</TableCell>
                                    <TableCell align="right">{item.Stok}</TableCell>
                                    <TableCell align="right">{this.ConverNumberToMoneyFormat(item.HargaJual)}</TableCell>
                                    <TableCell align="right">{this.ConverNumberToMoneyFormat(item.HargaModal)}</TableCell>
                                    <TableCell align='center'>
                                        <GenericModals
                                            size='s'
                                            header='Jenis Barang Detail'
                                            body={<BarangDetail />}
                                            Buttoncolor='primary'
                                            ButtononClickeven={() => this.onClick_get_BarangId_Detail(item._id)}
                                            Buttonlabel={'Detail'}
                                        />
                                    </TableCell>
                                    {User ? ((User.isSuperUser || User.isAdmin) ?
                                        <Fragment>
                                            <TableCell align='center'>
                                                <GenericModals
                                                    size='m'
                                                    header='Update Jenis Barang'
                                                    body={<BarangUpdate />}
                                                    Buttoncolor='inherit'
                                                    ButtononClickeven={() => this.onClick_get_BarangId_Update(item._id)}
                                                    Buttonlabel={'Edit'}
                                                />
                                            </TableCell>
                                            <TableCell align='center'>
                                                <GenericModals
                                                    size='s'
                                                    header='Delete Jenis Barang'
                                                    body={<BarangDetail />}
                                                    footer={<DeleteButton />}
                                                    Buttoncolor='secondary'
                                                    ButtononClickeven={() => this.onClick_get_BarangId_Detail(item._id)}
                                                    Buttonlabel={'Delete'}
                                                />
                                            </TableCell>
                                        </Fragment>
                                        : null)
                                        : null
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    :
                    <DataTidakDitemukan />
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    User: state.Auth.User,
    BarangList: state.Barang.BarangList,
    idDetailBarang: state.Barang.idDetailBarang,
})

export default connect(mapStateToProps, { Load_Barang_List, Load_Barang_List_Base_On_Jenis, get_BarangId_Detail, get_BarangId_Update, Delete_a_Barang })(BarangList)