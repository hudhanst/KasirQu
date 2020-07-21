import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { get_BarangDetail, Update_Barang } from '../../../Store/Actions/Barang.Actions'
import { Load_JenisBarang_List } from '../../../Store/Actions/JenisBarang.Actions'
import { Create_Warning_Messages } from '../../../Store/Actions/Messages.Actions'

import { Short_Column_INT, Short_Column_STR } from '../Shorting'
import MoneyFormater from '../MoneyFormater'

import { TextField, FormControl, InputLabel, Select, FormHelperText, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button } from '@material-ui/core'

import { withTheme } from '@material-ui/core/styles'
import { MUI_VerticalMargin, MUI_FullWidth } from '../../../MUI_theme'

import WarningRoundedIcon from '@material-ui/icons/WarningRounded'
import AddBoxIcon from '@material-ui/icons/AddBox'
import EditIcon from "@material-ui/icons/EditOutlined"
import DoneIcon from "@material-ui/icons/DoneAllTwoTone"
import RevertIcon from "@material-ui/icons/NotInterestedOutlined"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

import { DataTidakDitemukan } from '../Page404'


////// TODO ADD FORM NAMEING CEK 


class BarangUpdate extends React.Component {
    state = {
        Barcode: '',
        Name: '',
        Jenis: '',
        Stok: '',
        isDecimal: false,
        HargaModal: '',
        HargaJual: '',
        SatuanJual: [],
        Ket: '',
        BarangPic: null,
        OriginalSatuanJual: [],
        isEditingOn: false,
        NamaSatuanBaru: '',
        MinBarangBaru: '',
        HargaJualBaru: '',
    }
    componentDidMount() {
        const { idUpdateBarang } = this.props
        if (idUpdateBarang !== null) {
            this.props.get_BarangDetail(idUpdateBarang)
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.idUpdateBarang !== prevProps.idUpdateBarang) {
            const { idUpdateBarang } = this.props
            this.props.get_BarangDetail(idUpdateBarang)
            this.props.Load_JenisBarang_List()
        }
        if (this.props.BarangDetail !== prevProps.BarangDetail) {
            const { BarangDetail } = this.props
            this.props.Load_JenisBarang_List()
            if (BarangDetail) {
                const satuanjual = []
                BarangDetail.SatuanJual.forEach(obj => {
                    const datasatuanjual = { ...obj, ...{ isEditAble: false } }
                    satuanjual.push(datasatuanjual)
                })
                // console.log('satuanjual', satuanjual)
                this.setState({
                    Barcode: BarangDetail.Barcode,
                    Name: BarangDetail.Name,
                    Jenis: BarangDetail.Jenis,
                    Stok: BarangDetail.Stok,
                    isDecimal: BarangDetail.isDecimal,
                    HargaModal: BarangDetail.HargaModal,
                    HargaJual: BarangDetail.HargaJual,
                    SatuanJual: satuanjual,
                    Ket: BarangDetail.Ket,
                })
            }
        }
    }
    Form_OnChange = E => {
        this.setState({ [E.target.name]: E.target.value })
    }
    CheckBox_OnChange = E => {
        this.setState({ [E.target.name]: !this.state[E.target.name] })
    }
    File_OnChange = E => {
        this.setState({ [E.target.name]: E.target.files[0] })
    }
    Form_OnSubmit = E => {
        E.preventDefault()
        const { User, idUpdateBarang } = this.props
        const SatuanJual = this.state.SatuanJual
        const updatedata = {
            Barcode: this.state.Barcode,
            Name: this.state.Name,
            Jenis: this.state.Jenis,
            Stok: this.state.Stok,
            isDecimal: this.state.isDecimal,
            HargaModal: this.state.HargaModal,
            HargaJual: this.state.HargaJual,
            SatuanJual: this.state.SatuanJual,
            Ket: this.state.Ket,
            BarangPic: this.state.BarangPic,
        }
        const authdata = {
            isKasir: User.isKasir,
            isAdmin: User.isAdmin,
            isSuperUser: User.isSuperUser,
        }
        // console.log('updatedata', updatedata)
        try {
            if (
                (SatuanJual[SatuanJual.length - 1].NamaSatuan)
                && (SatuanJual[SatuanJual.length - 1].MinBarang > 0)
                && (SatuanJual[SatuanJual.length - 1].HargaJual > 0)
            ) {
                this.props.Update_Barang(idUpdateBarang, updatedata, authdata)
            } else {
                console.log(SatuanJual[SatuanJual.length - 1].NamaSatuan)
                this.props.Create_Warning_Messages(null, 'mohon lengkapi proses penambahan SatuanJual terlebih dahulu')
            }
        } catch (err) {
            console.log(err)
        }
    }
    ButtonShortSTR(ColumnNumb) {
        Short_Column_STR('tabel_barang_satuan', ColumnNumb)
    }
    ButtonShortINT(ColumnNumb) {
        Short_Column_INT('tabel_barang_satuan', ColumnNumb)
    }
    ConverNumberToMoneyFormat(OriginValue) {
        const MoneyFormate = MoneyFormater(OriginValue ? OriginValue : 0)
        return MoneyFormate
    }
    AddSatuanJual() {
        const SatuanJual = this.state.SatuanJual
        if (SatuanJual[SatuanJual.length - 1].NamaSatuan) {
            const satuanbaru = { NamaSatuan: '', MinBarang: 1, HargaJual: 0, isEditAble: false }
            SatuanJual.push(satuanbaru)
            this.setState({ SatuanJual: SatuanJual })
        } else {
            this.props.Create_Warning_Messages(null, 'mohon lengkapi proses penambahan SatuanJual terlebih dahulu')
        }
    }
    EditRow(index) {
        if (this.state.isEditingOn === false) {
            const { SatuanJual } = this.state
            SatuanJual[index].isEditAble = true
            this.setState({ NamaSatuanBaru: SatuanJual[index].NamaSatuan })
            this.setState({ MinBarangBaru: SatuanJual[index].MinBarang })
            this.setState({ HargaJualBaru: SatuanJual[index].HargaJual })
            this.setState({ isEditingOn: true })
            this.setState({ SatuanJual: SatuanJual })
            // console.log('EditRow', this.state)
        } else {
            this.props.Create_Warning_Messages(null, 'mohon selesaikan proses editing terlebih dahulu')
        }
    }
    onEditChange = e => this.setState({ [[e.target.name]]: e.target.value })
    EditingDone(index) {
        const { SatuanJual, NamaSatuanBaru, MinBarangBaru, HargaJualBaru } = this.state
        if (!NamaSatuanBaru || MinBarangBaru < 1 || HargaJualBaru < 1) {
            this.props.Create_Warning_Messages(null, 'input salah, tidak bisa kosong atau kurang dari samadengan 0')
        } else {
            SatuanJual[index].isEditAble = false
            SatuanJual[index].NamaSatuan = NamaSatuanBaru
            SatuanJual[index].MinBarang = MinBarangBaru
            SatuanJual[index].HargaJual = HargaJualBaru
            this.setState({ SatuanJual: SatuanJual })
            this.setState({ NamaSatuanBaru: '' })
            this.setState({ MinBarangBaru: 0 })
            this.setState({ HargaJualBaru: 0 })
            this.setState({ isEditingOn: false })
        }
    }
    Editingcancel(index) {
        const { SatuanJual } = this.state
        SatuanJual[index].isEditAble = false
        this.setState({ SatuanJual: SatuanJual })
        this.setState({ NamaSatuanBaru: '' })
        this.setState({ MinBarangBaru: 0 })
        this.setState({ HargaJualBaru: 0 })
        this.setState({ isEditingOn: false })
    }
    CancelBarang(index) {
        if (this.state.isEditingOn === false) {
            const SatuanJual = this.state.SatuanJual
            SatuanJual.splice(index, 1)
            this.setState({ SatuanJual: SatuanJual })
        } else {
            this.props.Create_Warning_Messages(null, 'mohon selesaikan proses editing terlebih dahulu')
        }
    }
    render() {
        // console.log('prop', this.props)
        const theme = this.props.theme
        const User = this.props.User
        const BarangDetail = this.props.BarangDetail
        const options = this.props.JenisBarangList

        const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth }
        const {
            Barcode,
            Name,
            Jenis,
            Stok,
            isDecimal,
            HargaModal,
            HargaJual,
            SatuanJual,
            Ket,
            NamaSatuanBaru,
            MinBarangBaru,
            HargaJualBaru,
        } = this.state
        return (
            <Fragment>
                {BarangDetail ?
                    <Fragment>
                        <form onSubmit={this.Form_OnSubmit}>
                            <TextField style={{ ...st_textfield, ...theme.customTheme.readonlytextfield }} variant='outlined' disabled type='text' label='Barcode' name='Barcode' value={Barcode} required />
                            <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='text' label='Name' name='Name' value={Name} required />
                            <FormControl style={st_textfield} variant="filled" required >
                                <InputLabel shrink >Jenis</InputLabel>
                                <Select native onChange={this.Form_OnChange} label="Jenis" name='Jenis' value={Jenis} labelWidth={100} >
                                    <option value="" disabled> -- select an option -- </option>
                                    {options.map((option, index) =>
                                        <option key={index} value={option.NamaJenisBarang}>{option.NamaJenisBarang}</option>
                                    )}
                                </Select>
                            </FormControl>
                            <TextField style={{ ...st_textfield, ...theme.customTheme.readonlytextfield }} onChange={this.Form_OnChange} variant='outlined' disabled={User.isSuperUser ? false : true} type='number' label='Stok' name='Stok' value={Stok} />
                            {User.isSuperUser ?
                                <FormHelperText style={{ color: 'orange' }}> <WarningRoundedIcon fontSize="small" />Sangat Tidak Disarankan, Silakan Update Melalu Menu <a href='/transaksi/belanja'>Belanja</a>. karena tidak akan terdata di report bulanan</FormHelperText>
                                : null}
                            <label>Apakah Bisa Melakukan Transaksi Satuan Desimal?</label><br />
                            <div className='switch'>
                                <input type="checkbox" onChange={this.CheckBox_OnChange} name='isDecimal' checked={isDecimal} /><span></span><br />
                            </div><br />
                            <FormHelperText >Jika iya maka transaksi bisa dalam bentuk 0.xxx (koma)</FormHelperText>
                            <TextField style={{ ...st_textfield, ...theme.customTheme.readonlytextfield }} onChange={this.Form_OnChange} variant='outlined' disabled={User.isSuperUser ? false : true} type='number' label='HargaModal' name='HargaModal' value={HargaModal} />
                            {User.isSuperUser ?
                                <FormHelperText style={{ color: 'orange' }}> <WarningRoundedIcon fontSize="small" />Sangat Tidak Disarankan, Silakan Update Melalu Menu <a href='/transaksi/belanja'>Belanja</a>. karena tidak akan terdata di report bulanan</FormHelperText>
                                : null}
                            <TextField style={{ ...st_textfield, ...theme.customTheme.readonlytextfield }} onChange={this.Form_OnChange} variant='outlined' disabled={User.isSuperUser ? false : true} type='number' label='HargaJual' name='HargaJual' value={HargaJual} />
                            {User.isSuperUser ?
                                <FormHelperText style={{ color: 'orange' }}> <WarningRoundedIcon fontSize="small" />Sangat Tidak Disarankan, Silakan Update Melalu Menu <a href='/transaksi/belanja'>Belanja</a>. karena tidak akan terdata di report bulanan</FormHelperText>
                                : null}
                            <hr />
                            {SatuanJual.length >= 1 ?
                                <Fragment>
                                    <Table id='tabel_barang_satuan'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ width: '5%' }} align="center" >Edit</TableCell>
                                                <TableCell style={{ width: '5%' }} align="center" >Delete</TableCell>
                                                <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(2)}>No</TableCell>
                                                <TableCell style={{ width: '70%' }} align="center" onClick={() => this.ButtonShortSTR(3)}>Nama Satuan</TableCell>
                                                <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(4)}>Jumlah Beli Minimum</TableCell>
                                                <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(5)}>Harga Jual Satuan&nbsp;(Rp)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {SatuanJual.map((item, index) => (
                                                <TableRow hover={true} key={index}>
                                                    <TableCell align="center">
                                                        {index === 0 ?
                                                            <IconButton onClick={() => this.AddSatuanJual()}>
                                                                <AddBoxIcon color='primary' />
                                                            </IconButton>
                                                            :
                                                            (item.isEditAble ?
                                                                <Fragment>
                                                                    <IconButton onClick={() => this.EditingDone(index)}>
                                                                        <DoneIcon />
                                                                    </IconButton>
                                                                    <IconButton onClick={() => this.Editingcancel(index)}>
                                                                        <RevertIcon />
                                                                    </IconButton>
                                                                </Fragment>
                                                                :
                                                                <Fragment>
                                                                    <IconButton onClick={() => this.EditRow(index)}>
                                                                        <EditIcon />
                                                                    </IconButton>
                                                                </Fragment>
                                                            )}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {index === 0 ?
                                                            <IconButton onClick={() => this.AddSatuanJual()}>
                                                                <AddBoxIcon color='primary' />
                                                            </IconButton> :
                                                            <IconButton onClick={() => this.CancelBarang(index)}>
                                                                <DeleteForeverIcon />
                                                            </IconButton>
                                                        }
                                                    </TableCell>
                                                    <TableCell align="center">{index + 1}</TableCell>
                                                    <TableCell align="left">
                                                        {item.isEditAble ?
                                                            <TextField
                                                                onChange={this.onEditChange}
                                                                value={NamaSatuanBaru}
                                                                name='NamaSatuanBaru'
                                                                type='text'
                                                            >
                                                            </TextField>
                                                            : item.NamaSatuan
                                                        }
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {item.isEditAble ?
                                                            <TextField
                                                                onChange={this.onEditChange}
                                                                value={MinBarangBaru}
                                                                name='MinBarangBaru'
                                                                type='number'
                                                            >
                                                            </TextField>
                                                            : item.MinBarang
                                                        }
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {item.isEditAble ?
                                                            <TextField
                                                                onChange={this.onEditChange}
                                                                value={HargaJualBaru}
                                                                name='HargaJualBaru'
                                                                type='number'
                                                            >
                                                            </TextField>
                                                            :
                                                            // item.HargaJual
                                                            this.ConverNumberToMoneyFormat(item.HargaJual)
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <hr />
                                </Fragment>
                                : null}
                            <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='text' label='Keterangan' name='Ket' value={Ket ? Ket : ''} />
                            <label>Barang Profile:</label><br />
                            <input type='file' accept='image/*' onChange={this.File_OnChange} name='BarangPic' /><br />
                            <hr />
                            <Button type='submit' style={st_textfield} size="large" variant='contained' color='primary' disabled={this.state.isEditingOn ? true : false} >Update</Button>
                        </form>
                    </Fragment>
                    : <DataTidakDitemukan />
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    User: state.Auth.User,
    idUpdateBarang: state.Barang.idUpdateBarang,
    BarangDetail: state.Barang.BarangDetail,
    JenisBarangList: state.JenisBarang.JenisBarangList,
})

export default connect(mapStateToProps, { get_BarangDetail, Load_JenisBarang_List, Create_Warning_Messages, Update_Barang })(withTheme(BarangUpdate))