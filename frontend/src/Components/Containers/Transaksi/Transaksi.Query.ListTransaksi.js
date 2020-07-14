import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Load_Query_Transaksi_List } from '../../../Store/Actions/Transaksi.Actions'
import { Create_Info_Messages, Create_Warning_Messages } from '../../../Store/Actions/Messages.Actions'

import { TextField, FormControl, InputLabel, Select, InputAdornment, Button } from '@material-ui/core'

import { MUI_VerticalMargin, MUI_FullWidth, MUI_HalfWidth, MUI_HorizontalHalfMargin } from '../../../MUI_theme'

const date = new Date()
const dd = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
const mm = (date.getMonth() + 1) >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
const yyyy = date.getFullYear()

class ListTransaksiQuery extends React.Component {
    state = {
        TransaksiID: '',
        UserName: '',
        Jenis: '',
        isAllData: false,
        // DateMin: '',
        DateMin: `${yyyy}-${mm}-${dd}T00:01`,
        DateMax: '',
        DiskonMin: '',
        DiskonMax: '',
        PotonganHargaMin: '',
        PotonganHargaMax: '',
        TotalTransaksiMin: '',
        TotalTransaksiMax: '',
        Ket: '',
    }
    Form_OnChange = E => {
        this.setState({ [E.target.name]: E.target.value })
    }
    CheckBox_OnChange = E => {
        this.setState({ [E.target.name]: !this.state[E.target.name] })
    }
    Form_OnSubmit = E => {
        E.preventDefault()
        const data = {
            TransaksiID: this.state.TransaksiID,
            UserName: this.state.UserName,
            Jenis: this.state.Jenis,
            isAllData: this.state.isAllData,
            DateMin: this.state.DateMin,
            DateMax: this.state.DateMax,
            DiskonMin: this.state.DiskonMin,
            DiskonMax: this.state.DiskonMax,
            PotonganHargaMin: this.state.PotonganHargaMin,
            PotonganHargaMax: this.state.PotonganHargaMax,
            TotalTransaksiMin: this.state.TotalTransaksiMin,
            TotalTransaksiMax: this.state.TotalTransaksiMax,
            Ket: this.state.Ket,
        }
        if ((!data.DateMin && !data.DateMax) || (data.isAllData)) {
            this.props.Create_Info_Messages(null, 'anda mencoba memfilter semua data, mungkin akan memakan waktu proses cukup lama')
        }
        if (((data.DateMax < data.DateMin) && (data.DateMax && data.DateMin)) ||
            ((data.DiskonMax < data.DiskonMin) && (data.DiskonMax && data.DiskonMin)) ||
            ((data.PotonganHargaMax < data.PotonganHargaMin) && (data.PotonganHargaMax && data.PotonganHargaMin)) ||
            ((data.TotalTransaksiMax < data.TotalTransaksiMin) && (data.TotalTransaksiMax && data.TotalTransaksiMin))
        ) {
            this.props.Create_Warning_Messages(null, 'Nilai Minimum Lebih Besar Dari Nilai Maksimum, Data mungkin tidak terpanggil')
        }
        this.props.Load_Query_Transaksi_List(data)
    }
    render() {
        const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth }
        const st_halftextfield = { ...MUI_VerticalMargin, ...MUI_HorizontalHalfMargin, ...MUI_HalfWidth }
        const choices = ['Belanja', 'Transaksi']
        const {
            TransaksiID,
            UserName,
            Jenis,
            isAllData,
            DateMin,
            DateMax,
            DiskonMin,
            DiskonMax,
            PotonganHargaMin,
            PotonganHargaMax,
            TotalTransaksiMin,
            TotalTransaksiMax,
            Ket,
        } = this.state
        return (
            <Fragment>
                <form onSubmit={this.Form_OnSubmit}>
                    <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='text' label='Transaksi ID' name='TransaksiID' value={TransaksiID} />
                    <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='text' label='UserName' name='UserName' value={UserName} />
                    {/* <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='text' label='Jenis Transaksi' name='Jenis' value={Jenis} /> */}
                    <FormControl style={st_textfield} variant="filled">
                        <InputLabel shrink >Jenis Transaksi</InputLabel>
                        <Select native onChange={this.Form_OnChange} label="Jenis Transaksi" name='Jenis' value={Jenis} labelWidth={100} >
                            <option value="" disabled> -- select an option -- </option>
                            {choices.map((item, index) =>
                                <option key={index} value={item}>{item}</option>
                            )}
                        </Select>
                    </FormControl>
                    <label>Cari dari Keseluruhan Data:</label><br />
                    <div className='switch' style={MUI_VerticalMargin}>
                        <input type="checkbox" onChange={this.CheckBox_OnChange} name='isAllData' checked={isAllData} /><span></span><br />
                    </div><br />
                    {!isAllData ? (
                        <Fragment>
                            <label>Cari Berdasarkan Total Transaksi:</label><br />
                            <TextField style={st_halftextfield} variant='outlined' onChange={this.Form_OnChange} type='datetime-local' label='tanggal Minimum' name='DateMin' value={DateMin} InputLabelProps={{ shrink: true }} /><br />
                            <TextField style={st_halftextfield} variant='outlined' onChange={this.Form_OnChange} type='datetime-local' label='tanggal Maksimum' name='DateMax' value={DateMax} InputLabelProps={{ shrink: true }} /><br />
                        </Fragment>
                    ) : null}
                    <label>Cari Berdasarkan Diskon Transaksi:</label><br />
                    <TextField
                        style={st_halftextfield}
                        variant='outlined'
                        onChange={this.Form_OnChange}
                        type='number'
                        label='Diskon Minimum'
                        name='DiskonMin'
                        value={DiskonMin}
                        InputProps={{
                            startAdornment:
                                <InputAdornment position="start">
                                    %
                            </InputAdornment>,
                        }}
                    /><br />
                    <TextField
                        style={st_halftextfield}
                        variant='outlined'
                        onChange={this.Form_OnChange}
                        type='number'
                        label='Diskon Maksimum'
                        name='DiskonMax'
                        value={DiskonMax}
                        InputProps={{
                            startAdornment:
                                <InputAdornment position="start">
                                    %
                            </InputAdornment>,
                        }}
                    /><br />
                    <label>Cari Berdasarkan Total Potongan Harga Transaksi:</label><br />
                    <TextField
                        style={st_halftextfield}
                        variant='outlined'
                        onChange={this.Form_OnChange}
                        type='number'
                        label='Potongan Harga Minimum'
                        name='PotonganHargaMin'
                        value={PotonganHargaMin}
                        InputProps={{
                            startAdornment:
                                <InputAdornment position="start">
                                    Rp
                            </InputAdornment>,
                        }}
                    /><br />
                    <TextField
                        style={st_halftextfield}
                        variant='outlined'
                        onChange={this.Form_OnChange}
                        type='number'
                        label='Potongan Harga Maksimum'
                        name='PotonganHargaMax'
                        value={PotonganHargaMax}
                        InputProps={{
                            startAdornment:
                                <InputAdornment position="start">
                                    Rp
                            </InputAdornment>,
                        }}
                    /><br />
                    <label>Cari Berdasarkan Total Transaksi:</label><br />
                    <TextField
                        style={st_halftextfield}
                        variant='outlined'
                        onChange={this.Form_OnChange}
                        type='number'
                        label='Total Transaksi Minimum'
                        name='TotalTransaksiMin'
                        value={TotalTransaksiMin}
                        InputProps={{
                            startAdornment:
                                <InputAdornment position="start">
                                    Rp
                            </InputAdornment>,
                        }}
                    /><br />
                    <TextField
                        style={st_halftextfield}
                        variant='outlined'
                        onChange={this.Form_OnChange}
                        type='number'
                        label='Total Transaksi Maksimum'
                        name='TotalTransaksiMax'
                        value={TotalTransaksiMax}
                        InputProps={{
                            startAdornment:
                                <InputAdornment position="start">
                                    Rp
                            </InputAdornment>,
                        }}
                    /><br />
                    <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='text' label='Keteragan' name='Ket' value={Ket} />

                    <Button type='submit' style={st_textfield} size="large" variant='contained' color='primary' >Cari</Button>
                </form>
            </Fragment>
        )
    }
}

export default connect(null, { Load_Query_Transaksi_List, Create_Info_Messages, Create_Warning_Messages })(ListTransaksiQuery)