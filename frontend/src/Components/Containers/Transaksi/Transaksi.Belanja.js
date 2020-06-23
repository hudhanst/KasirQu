import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Change_Belanja_Detail, Clear_A_Barang_From_Belanja, Clear_Barang_In_Belanja } from '../../../Store/Actions/Transaksi.Actions'
import { Create_Warning_Messages } from '../../../Store/Actions/Messages.Actions'

import { Short_Column_INT, Short_Column_STR } from '../Shorting'
import MoneyFormater from '../MoneyFormater'

import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, TextField, Typography } from '@material-ui/core'

import { withTheme } from '@material-ui/core/styles'
import { MUI_FullWidth, MUI_VerticalMargin } from '../../../MUI_theme'

import GenericModals from '../GenericModals'
import ReviewBelanja from './Transaksi.ReviewBelanja'

import EditIcon from "@material-ui/icons/EditOutlined"
import DoneIcon from "@material-ui/icons/DoneAllTwoTone"
import RevertIcon from "@material-ui/icons/NotInterestedOutlined"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

class TransaksiBelanja extends React.Component {
    state = {
        Belanja: this.props.Belanja.Belanja,
        Total: [],
        isEditingOn: false,
        Jumlah: '',
        HargaModal: '',
        HargaJual: '',
    }
    componentDidUpdate(prevProps) {
        if (this.props.Belanja !== prevProps.Belanja) {
            this.setState({ Total: [] })
        }
    }

    EditRow(Index) {
        if (this.state.isEditingOn === false) {
            let belanjas = [...this.state.Belanja]
            let belanja = { ...belanjas[Index] }
            belanja.isEditAble = true
            belanjas[Index] = belanja
            this.setState({ Belanja: belanjas })
            this.setState({ Jumlah: belanja.Jumlah })
            this.setState({ HargaModal: belanja.HargaModal })
            this.setState({ HargaJual: belanja.HargaJual })
            this.setState({ isEditingOn: true })
        } else {
            this.props.Create_Warning_Messages(null, 'mohon selesaikan proses editing terlebih dahulu')
        }
    }
    onEditChange = e => this.setState({ [[e.target.name]]: e.target.value })
    EditingDone(index) {
        const { Jumlah, HargaModal, HargaJual } = this.state
        this.props.Change_Belanja_Detail(index, Jumlah, HargaModal, HargaJual)
        this.setState({ Belanja: this.props.Belanja.Belanja })
        this.setState({ Jumlah: '' })
        this.setState({ HargaModal: '' })
        this.setState({ HargaJual: '' })
        this.setState({ isEditingOn: false })
    }
    Editingcancel() {
        this.setState({ Belanja: this.props.Belanja.Belanja })
        this.setState({ Jumlah: '' })
        this.setState({ HargaModal: '' })
        this.setState({ HargaJual: '' })
        this.setState({ isEditingOn: false })
    }
    CancelBarang(Barcode) {
        if (this.state.isEditingOn === false) {
            this.props.Clear_A_Barang_From_Belanja(Barcode)
        } else {
            this.props.Create_Warning_Messages(null, 'mohon selesaikan proses editing terlebih dahulu')
        }
    }
    CancelAllBarang() {
        if (this.state.isEditingOn === false) {
            this.props.Clear_Barang_In_Belanja()
        } else {
            this.props.Create_Warning_Messages(null, 'mohon selesaikan proses editing terlebih dahulu')
        }
    }
    ButtonShortSTR(ColumnNumb) {
        Short_Column_STR('tabel_belanja', ColumnNumb)
    }
    ButtonShortINT(ColumnNumb) {
        Short_Column_INT('tabel_belanja', ColumnNumb)
    }
    ConverNumberToMoneyFormat(OriginValue) {
        const MoneyFormate = MoneyFormater(OriginValue ? OriginValue : 0)
        return MoneyFormate
    }
    SUMHargaTotal(TotalModal) {
        this.state.Total.push(TotalModal)
    }
    render() {
        const theme = this.props.theme
        const st_tablehead = { ...theme.customTheme.tablehead }
        const st_button = { ...MUI_FullWidth, ...MUI_VerticalMargin }
        const Data = this.state.Belanja
        return (
            <Fragment>
                <Table id='tabel_belanja'>
                    <TableHead style={st_tablehead}>
                        <TableRow>
                            <TableCell style={{ width: '10%' }} align="center"  >Edit</TableCell>
                            <TableCell style={{ width: '5%' }} align="center" onClick={() => this.CancelAllBarang()} >Cancel</TableCell>
                            <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(2)}>No</TableCell>
                            <TableCell style={{ width: '10%' }} align="left" onClick={() => this.ButtonShortINT(3)}>Barcode</TableCell>
                            <TableCell style={{ width: '35%' }} align="left" onClick={() => this.ButtonShortSTR(4)}>Nama Barang</TableCell>
                            <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(5)}>Jumlah</TableCell>
                            <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(6)}>Harga Modal&nbsp;(Rp)</TableCell>
                            <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(7)}>Harga Jual&nbsp;(Rp)</TableCell>
                            <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(8)}>Total Modal&nbsp;(Rp)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Data.map((item, index) => (
                            <TableRow key={index + 1}
                                hover={true}
                            // style={index % 2 === 1 ? st_tablehead : null}
                            >
                                <TableCell align="center" >
                                    {item.isEditAble ?
                                        <Fragment>
                                            <IconButton onClick={() => this.EditingDone(index, item.HargaSatuan)}>
                                                <DoneIcon />
                                            </IconButton>
                                            <IconButton onClick={() => this.Editingcancel()}>
                                                <RevertIcon />
                                            </IconButton>
                                        </Fragment>
                                        :
                                        <Fragment>
                                            <IconButton onClick={() => this.EditRow(index)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Fragment>
                                    }
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => this.CancelBarang(index)}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="left">{item.Barcode}</TableCell>
                                <TableCell align="left">{item.NamaBarang}</TableCell>
                                <TableCell align="center">
                                    {item.isEditAble ?
                                        <TextField
                                            onChange={this.onEditChange}
                                            name='Jumlah'
                                            value={this.state.Jumlah}
                                            type='number'
                                        >
                                        </TextField>
                                        : item.Jumlah
                                    }
                                </TableCell>
                                <TableCell align="right">
                                    {item.isEditAble ?
                                        <TextField
                                            onChange={this.onEditChange}
                                            name='HargaModal'
                                            value={this.state.HargaModal}
                                            type='number'
                                        >
                                        </TextField>
                                        : <Typography>
                                            {this.ConverNumberToMoneyFormat(item.HargaModal)}
                                        </Typography>
                                    }
                                </TableCell>
                                <TableCell align="right">
                                    {item.isEditAble ?
                                        <TextField
                                            onChange={this.onEditChange}
                                            name='HargaJual'
                                            value={this.state.HargaJual}
                                            type='number'
                                        >
                                        </TextField>
                                        : <Typography>
                                            {this.ConverNumberToMoneyFormat(item.HargaJual)}
                                        </Typography>
                                    }
                                </TableCell>
                                <TableCell align="right">{this.ConverNumberToMoneyFormat(item.TotalModal)}</TableCell>
                                {this.SUMHargaTotal(item.TotalModal)}
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
                {Data.length ?
                    <Fragment>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="left">total:</TableCell>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right">{this.ConverNumberToMoneyFormat(this.state.Total.reduce((a, b) => a + b, 0))}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <GenericModals
                            size='l'
                            header='Review Barang Belanja'
                            body={<ReviewBelanja />}
                            // footer={<DeleteButton />}
                            Buttondisabled={(this.state.isEditingOn === false) ? false : true}
                            Buttonstyle={st_button}
                            Buttonvariant='contained'
                            Buttoncolor='primary'
                            Buttonsize='large'
                            // ButtononClickeven={() => this.onClick_get_AccountId_Detail(item._id)}
                            ButtononClickeven={() => null}
                            Buttonlabel={'Review Barang Belanja'}
                        />
                    </Fragment>
                    : null
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    User: state.Auth.User,
    Belanja: state.Transaksi,
})

export default connect(mapStateToProps, { Change_Belanja_Detail, Clear_A_Barang_From_Belanja, Clear_Barang_In_Belanja, Create_Warning_Messages })(withTheme(TransaksiBelanja))