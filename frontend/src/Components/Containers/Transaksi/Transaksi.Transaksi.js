import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Change_Transaksi_Detail, Clear_A_Barang_From_Transaksi, Clear_Barang_In_Transaksi } from '../../../Store/Actions/Transaksi.Actions'
import { Create_Warning_Messages } from '../../../Store/Actions/Messages.Actions'

import { Short_Column_INT, Short_Column_STR, Short_Column_Money } from '../Shorting'
import { ConvertInttoMoney } from '../Formater'

import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, TextField, FormControl, InputLabel, Select } from '@material-ui/core'

import { withTheme } from '@material-ui/core/styles'
import { MUI_FullWidth, MUI_VerticalMargin } from '../../../MUI_theme'

import GenericModals from '../GenericModals'
import ReviewPembayaran from './Transaksi.ReviewPembayaran'

import EditIcon from "@material-ui/icons/EditOutlined"
import DoneIcon from "@material-ui/icons/DoneAllTwoTone"
import RevertIcon from "@material-ui/icons/NotInterestedOutlined"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

class TransaksiTransaksi extends React.Component {
    state = {
        Transaksi: this.props.Transaksi.Transaksi,
        TotalHarga: [],
        isEditingOn: false,
        JumlahBaru: '',
        SatuanBaru: '',
    }
    componentDidUpdate(prevProps) {
        if (this.props.Transaksi !== prevProps.Transaksi) {
            this.setState({ TotalHarga: [] })
        }
    }

    EditRow(Index) {
        if (this.state.isEditingOn === false) {
            let transaksis = [...this.state.Transaksi]
            let transaksi = { ...transaksis[Index] }
            transaksi.isEditAble = true
            transaksis[Index] = transaksi
            this.setState({ Transaksi: transaksis })
            this.setState({ JumlahBaru: transaksi.Jumlah })
            this.setState({ SatuanBaru: transaksi.Satuan })
            this.setState({ isEditingOn: true })
        } else {
            this.props.Create_Warning_Messages(null, 'mohon selesaikan proses editing terlebih dahulu')
        }
    }
    onEditChange = e => {
        this.setState({ [e.target.name]: e.target.value })
        // this.setState({ JumlahBaru: e.target.value })
    }
    onKeyPress = (e, index, SatuanOptions, isDecimal) => {
        if (e.keyCode === 13) {
            this.EditingDone(index, SatuanOptions, isDecimal)
        }
        if (e.keyCode === 27) {
            this.Editingcancel()
        }
    }
    EditingDone(index, SatuanOptions, isDecimal) {
        // console.log('EditingDone', this.state)
        const { JumlahBaru, SatuanBaru } = this.state
        // console.log('SatuanOptions', SatuanOptions)

        if (JumlahBaru < 0) {
            this.props.Create_Warning_Messages(null, 'satuan tidak bisa kurang dari 0')
        } else {
            const newSatuanBaru = SatuanOptions.find(satuanoptions => satuanoptions.NamaSatuan === SatuanBaru)
            const NamaSatuan_SatuanBaru = newSatuanBaru.NamaSatuan
            const MinBarang_SatuanBaru = newSatuanBaru.MinBarang
            const HargaJual_SatuanBaru = newSatuanBaru.HargaJual

            if ((JumlahBaru % 1 !== 0) && (isDecimal === false)) {
                this.props.Create_Warning_Messages(null, 'jumlah barang harus bulat tidak bisa desimal')
            } else {
                this.props.Change_Transaksi_Detail(index, JumlahBaru, NamaSatuan_SatuanBaru, MinBarang_SatuanBaru, HargaJual_SatuanBaru)
                this.setState({ Transaksi: this.props.Transaksi.Transaksi })
                this.setState({ JumlahBaru: '' })
                this.setState({ SatuanBaru: '' })
                this.setState({ isEditingOn: false })
            }
        }
    }
    Editingcancel() {
        this.setState({ Transaksi: this.props.Transaksi.Transaksi })
        this.setState({ JumlahBaru: '' })
        this.setState({ SatuanBaru: '' })
        this.setState({ isEditingOn: false })
    }
    CancelBarang(Barcode) {
        if (this.state.isEditingOn === false) {
            this.props.Clear_A_Barang_From_Transaksi(Barcode)
        } else {
            this.props.Create_Warning_Messages(null, 'mohon selesaikan proses editing terlebih dahulu')
        }
    }
    CancelAllBarang() {
        if (this.state.isEditingOn === false) {
            this.props.Clear_Barang_In_Transaksi()
        } else {
            this.props.Create_Warning_Messages(null, 'mohon selesaikan proses editing terlebih dahulu')
        }
    }
    ButtonShortSTR(ColumnNumb) {
        Short_Column_STR('tabel_transaksi', ColumnNumb)
    }
    ButtonShortINT(ColumnNumb) {
        Short_Column_INT('tabel_transaksi', ColumnNumb)
    }
    ButtonShortMoney(ColumnNumb) {
        Short_Column_Money('tabel_transaksi', ColumnNumb)
    }
    ConverNumberToMoneyFormat(OriginValue) {
        const MoneyFormate = ConvertInttoMoney(OriginValue ? OriginValue : 0)
        return MoneyFormate
    }
    SUMHargaTotal(HargaTotal) {
        this.state.TotalHarga.push(HargaTotal)
    }
    render() {
        // console.log(this.props)
        // console.log(this.state)
        const theme = this.props.theme
        const st_tablehead = { ...theme.customTheme.tablehead }
        const st_button = { ...MUI_FullWidth, ...MUI_VerticalMargin }
        const TransaksiData = this.state.Transaksi
        return (
            <Fragment>
                <Table stickyHeader id='tabel_transaksi'>
                    <TableHead style={st_tablehead}>
                        <TableRow>
                            <TableCell style={{ width: '10%' }} align="center"  >Edit</TableCell>
                            <TableCell style={{ width: '5%' }} align="center" onClick={() => this.CancelAllBarang()} >Cancel</TableCell>
                            <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(2)}>No</TableCell>
                            <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(3)}>Barcode</TableCell>
                            <TableCell style={{ width: '25%' }} align="center" onClick={() => this.ButtonShortSTR(4)}>Nama Barang</TableCell>
                            <TableCell style={{ width: '15%' }} align="center" onClick={() => this.ButtonShortSTR(5)}>Satuan</TableCell>
                            <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(6)}>Jumlah</TableCell>
                            {/* <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(6)}>Diskon</TableCell> */}
                            {/* <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(6)}>Potongan Harga</TableCell> */}
                            <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortMoney(7)}>Harga Satuan&nbsp;(Rp)</TableCell>
                            <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(8)}>Total Barang</TableCell>
                            <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortMoney(9)}>Harga Total&nbsp;(Rp)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {TransaksiData.map((item, index) => (
                            <TableRow key={index + 1}
                                hover={true}
                            // style={index % 2 === 1 ? st_tablehead : null}
                            >
                                <TableCell align="center" >
                                    {item.isEditAble ?
                                        <Fragment>
                                            <IconButton onClick={() => this.EditingDone(index, item.SatuanOptions, item.isDecimal)}>
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
                                        // <FormControl style={st_textfield} variant="filled" required >
                                        <FormControl variant="filled"  >
                                            <InputLabel shrink >Satuan</InputLabel>
                                            <Select native onChange={this.onEditChange} label="Satuan" name='SatuanBaru' value={this.state.SatuanBaru} labelWidth={100} >
                                                <option value="" disabled> -- select an option -- </option>
                                                {item.SatuanOptions.map((option, index) =>
                                                    //fix
                                                    <option key={index} value={option.NamaSatuan}>{option.MinBarang}, {option.NamaSatuan}</option>
                                                )}
                                            </Select>
                                        </FormControl>
                                        : item.Satuan
                                    }
                                </TableCell>
                                <TableCell align="right">
                                    {item.isEditAble ?
                                        <TextField
                                            onChange={this.onEditChange}
                                            onKeyDown={(event) => this.onKeyPress(event, index, item.SatuanOptions, item.isDecimal)}
                                            name='JumlahBaru'
                                            value={this.state.JumlahBaru}
                                            type='number'
                                        >
                                        </TextField>
                                        : item.Jumlah
                                    }
                                </TableCell>
                                {/* TODO ADD <TableCell align="right">
                                    10%  
                                </TableCell> */}
                                {/* TODO add <TableCell align="right">
                                    10000
                                   </TableCell> */}
                                <TableCell align="right">{this.ConverNumberToMoneyFormat(item.HargaSatuan)}</TableCell>
                                <TableCell align="right">{item.TotalBarang} </TableCell>
                                <TableCell align="right">{this.ConverNumberToMoneyFormat(item.HargaTotal)}</TableCell>
                                {this.SUMHargaTotal(item.HargaTotal)}
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
                {TransaksiData.length ?
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
                                    <TableCell align="right">{this.ConverNumberToMoneyFormat(this.state.TotalHarga.reduce((a, b) => a + b, 0))}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <GenericModals
                            size='l'
                            header='Review Pembayaran'
                            body={<ReviewPembayaran />}
                            // footer={<DeleteButton />}
                            Buttondisabled={(this.state.isEditingOn === false) ? false : true}
                            Buttonstyle={st_button}
                            Buttonvariant='contained'
                            Buttoncolor='primary'
                            Buttonsize='large'
                            // ButtononClickeven={() => this.onClick_get_AccountId_Detail(item._id)}
                            ButtononClickeven={() => null}
                            Buttonlabel={'Review Pembayaran'}
                        />
                    </Fragment>
                    : null
                }
                {/* <button onClick={() => console.log(this.props)} style={{ width: '100%' }}>props</button> */}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    User: state.Auth.User,
    Transaksi: state.Transaksi,
})

export default connect(mapStateToProps, { Change_Transaksi_Detail, Clear_A_Barang_From_Transaksi, Clear_Barang_In_Transaksi, Create_Warning_Messages })(withTheme(TransaksiTransaksi))