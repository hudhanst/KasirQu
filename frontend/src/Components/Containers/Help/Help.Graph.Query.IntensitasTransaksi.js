import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Load_Query_Graph_IntensitasTransaksi_List } from '../../../Store/Actions/Help.Actions'
import { Create_Info_Messages, Create_Warning_Messages } from '../../../Store/Actions/Messages.Actions'

import { TextField, FormControl, Button, InputAdornment, FormLabel, RadioGroup, FormControlLabel, Radio, InputLabel, Select } from '@material-ui/core'

import { MUI_VerticalMargin, MUI_FullWidth, MUI_HalfWidth, MUI_HorizontalHalfMargin } from '../../../MUI_theme'

const date = new Date()
const mm = (date.getMonth() + 1) >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
const yyyy = date.getFullYear()

class QueryIntensitasTransaksi extends React.Component {
  state = {
    isAllData: false,
    isAllDate: false,
    NamaKasir: '',
    DateMin: `${yyyy}-${mm}-01T00:01`,
    DateMax: '',
    Jenis: '',
    DiskonMin: '',
    DiskonMax: '',
    PotonganHargaMin: '',
    PotonganHargaMax: '',
    TotalPembayaranMin: '',
    TotalPembayaranMax: '',
    GrafikView: 'harian',
  }
  Form_OnChange = E => {
    this.setState({ [E.target.name]: E.target.value })
  }
  CheckBox_OnChange = E => {
    this.setState({ [E.target.name]: !this.state[E.target.name] })
  }
  handleRadioChange = E => {
    this.setState({ [E.target.name]: E.target.value })
  }
  Form_OnSubmit = E => {
    E.preventDefault()
    const { isAllData, isAllDate } = this.state
    const data = {
      NamaKasir: isAllData ? null : this.state.NamaKasir,
      DateMin: isAllData ? null : (isAllDate ? null : this.state.DateMin),
      DateMax: isAllData ? null : (isAllDate ? null : this.state.DateMax),
      Jenis: isAllData ? null : this.state.Jenis,
      DiskonMin: isAllData ? null : this.state.DiskonMin,
      DiskonMax: isAllData ? null : this.state.DiskonMax,
      PotonganHargaMin: isAllData ? null : this.state.PotonganHargaMin,
      PotonganHargaMax: isAllData ? null : this.state.PotonganHargaMax,
      TotalPembayaranMin: isAllData ? null : this.state.TotalPembayaranMin,
      TotalPembayaranMax: isAllData ? null : this.state.TotalPembayaranMax,
      GrafikView: isAllData ? 'bulanan' : this.state.GrafikView,
    }
    if ((!data.DateMin && !data.DateMax) || (isAllData) || (isAllDate)) {
      this.props.Create_Info_Messages(null, 'anda mencoba memfilter semua data, mungkin akan memakan waktu proses cukup lama')
    }
    if (
      ((data.DateMax < data.DateMin) && (data.DateMax && data.DateMin))
      || ((data.DiskonMax < data.DiskonMin) && (data.DiskonMax && data.DiskonMin))
      || ((data.PotonganHargaMax < data.PotonganHargaMin) && (data.PotonganHargaMax && data.PotonganHargaMin))
      || ((data.TotalPembayaranMax < data.TotalPembayaranMin) && (data.TotalPembayaranMax && data.TotalPembayaranMin))
    ) {
      this.props.Create_Warning_Messages(null, 'Nilai Minimum Lebih Besar Dari Nilai Maksimum, Data mungkin tidak terpanggil')
    }
    this.props.Load_Query_Graph_IntensitasTransaksi_List(data)
  }
  render() {
    const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth }
    const st_halftextfield = { ...MUI_VerticalMargin, ...MUI_HorizontalHalfMargin, ...MUI_HalfWidth }
    const {
      isAllData,
      isAllDate,
      NamaKasir,
      DateMin,
      DateMax,
      Jenis,
      DiskonMin,
      DiskonMax,
      PotonganHargaMin,
      PotonganHargaMax,
      TotalPembayaranMin,
      TotalPembayaranMax,
      GrafikView,
    } = this.state

    const JenisOptions = ['Belanja', 'Transaksi']

    return (
      <Fragment>
        <form onSubmit={this.Form_OnSubmit}>
          <label>Cari dari Keseluruhan Data:</label><br />
          <div className='switch' style={MUI_VerticalMargin}>
            <input type="checkbox" onChange={this.CheckBox_OnChange} name='isAllData' checked={isAllData} /><span></span><br />
          </div><br />

          {!isAllData ? (
            <Fragment>
              <FormControl style={st_textfield}>
                <FormLabel >Penampakan Grafik</FormLabel>
                <RadioGroup name='GrafikView' value={GrafikView} onChange={this.handleRadioChange}>
                  <FormControlLabel value="pr_jam" control={<Radio />} label="Persentase perJam" />
                  <FormControlLabel value="pr_harian" control={<Radio />} label="Persentase perHari" />
                  <FormControlLabel value="harian" control={<Radio />} label="perHari" />
                  <FormControlLabel value="bulanan" control={<Radio />} label="perBulan" />
                </RadioGroup>
              </FormControl>

              <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='text' label='Nama Kasir' name='NamaKasir' value={NamaKasir} />

              <label>Cari dari Keseluruhan Tanggal:</label><br />
              <div className='switch' style={MUI_VerticalMargin}>
                <input type="checkbox" onChange={this.CheckBox_OnChange} name='isAllDate' checked={isAllDate} /><span></span><br />
              </div><br />

              {!isAllDate ? (
                <Fragment>
                  <label>Cari Berdasarkan Tanggal:</label><br />
                  <TextField style={st_halftextfield} variant='outlined' onChange={this.Form_OnChange} type='datetime-local' label='tanggal Minimum' name='DateMin' value={DateMin} InputLabelProps={{ shrink: true }} /><br />
                  <TextField style={st_halftextfield} variant='outlined' onChange={this.Form_OnChange} type='datetime-local' label='tanggal Maksimum' name='DateMax' value={DateMax} InputLabelProps={{ shrink: true }} /><br />
                </Fragment>
              ) : null}

              <FormControl style={st_textfield} variant="filled">
                <InputLabel shrink >Jenis Transaksi</InputLabel>
                <Select native onChange={this.Form_OnChange} label="Jenis Transaksi" name='Jenis' value={Jenis} labelWidth={100} >
                  <option value=""> -- select an option -- </option>
                  {JenisOptions.map((item, index) =>
                    <option key={index} value={item}>{item}</option>
                  )}
                </Select>
              </FormControl>

              <label>Cari Berdasarkan Total Diskon perTransaksi:</label><br />
              <TextField
                style={st_halftextfield}
                variant='outlined'
                onChange={this.Form_OnChange}
                type='number'
                label='Total Diskon Minimum'
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
                label='Total Diskon Maksimum'
                name='DiskonMax'
                value={DiskonMax}
                InputProps={{
                  startAdornment:
                    <InputAdornment position="start">
                      %
                    </InputAdornment>,
                }}
              /><br />

              <label>Cari Berdasarkan Total Potongan Harga perTransaksi:</label><br />
              <TextField
                style={st_halftextfield}
                variant='outlined'
                onChange={this.Form_OnChange}
                type='number'
                label='Total Potongan Harga Minimum'
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
                label='Total Potongan Harga Maksimum'
                name='PotonganHargaMax'
                value={PotonganHargaMax}
                InputProps={{
                  startAdornment:
                    <InputAdornment position="start">
                      Rp
                    </InputAdornment>,
                }}
              /><br />

              <label>Cari Berdasarkan Total Pembayaran perTransaksi:</label><br />
              <TextField
                style={st_halftextfield}
                variant='outlined'
                onChange={this.Form_OnChange}
                type='number'
                label='Total Transaksi Minimum'
                name='TotalPembayaranMin'
                value={TotalPembayaranMin}
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
                name='TotalPembayaranMax'
                value={TotalPembayaranMax}
                InputProps={{
                  startAdornment:
                    <InputAdornment position="start">
                      Rp
                    </InputAdornment>,
                }}
              /><br />

            </Fragment>
          ) : null}

          <Button type='submit' style={st_textfield} size="large" variant='contained' color='primary' >Cari</Button>
        </form>
      </Fragment>
    )
  }
}

export default connect(null, { Load_Query_Graph_IntensitasTransaksi_List, Create_Info_Messages, Create_Warning_Messages })(QueryIntensitasTransaksi)