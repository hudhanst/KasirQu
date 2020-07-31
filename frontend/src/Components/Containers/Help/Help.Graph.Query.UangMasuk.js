import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Load_Query_Graph_UangMasuk_List } from '../../../Store/Actions/Help.Actions'
import { Create_Info_Messages, Create_Warning_Messages } from '../../../Store/Actions/Messages.Actions'

import { TextField, FormControl, Button, InputAdornment, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'

import { MUI_VerticalMargin, MUI_FullWidth, MUI_HalfWidth, MUI_HorizontalHalfMargin } from '../../../MUI_theme'

const date = new Date()
const mm = (date.getMonth() + 1) >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
const yyyy = date.getFullYear()

class QueryUangMasuk extends React.Component {
  state = {
    isAllData: false,
    isAllDate: false,
    DateMin: `${yyyy}-${mm}-01T00:01`,
    DateMax: '',
    TotalTransaksiMin: '',
    TotalTransaksiMax: '',
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
      DateMin: isAllData ? null : (isAllDate ? null : this.state.DateMin),
      DateMax: isAllData ? null : (isAllDate ? null : this.state.DateMax),
      TotalTransaksiMin: isAllData ? null : this.state.TotalTransaksiMin,
      TotalTransaksiMax: isAllData ? null : this.state.TotalTransaksiMax,
      GrafikView: (isAllData || isAllDate) ? 'bulanan' : this.state.GrafikView,
    }
    if ((!data.DateMin && !data.DateMax) || (isAllData) || (isAllDate)) {
      this.props.Create_Info_Messages(null, 'anda mencoba memfilter semua data, mungkin akan memakan waktu proses cukup lama')
    }
    if (
      ((data.DateMax < data.DateMin) && (data.DateMax && data.DateMin))
      || ((data.TotalTransaksiMax < data.TotalTransaksiMin) && (data.TotalTransaksiMax && data.TotalTransaksiMin))
    ) {
      this.props.Create_Warning_Messages(null, 'Nilai Minimum Lebih Besar Dari Nilai Maksimum, Data mungkin tidak terpanggil')
    }
    this.props.Load_Query_Graph_UangMasuk_List(data)
  }
  render() {
    const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth }
    const st_halftextfield = { ...MUI_VerticalMargin, ...MUI_HorizontalHalfMargin, ...MUI_HalfWidth }
    const {
      isAllData,
      isAllDate,
      DateMin,
      DateMax,
      TotalTransaksiMin,
      TotalTransaksiMax,
      GrafikView,
    } = this.state
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
                  <FormControlLabel value="harian" control={<Radio />} label="perHari" />
                  <FormControlLabel value="bulanan" control={<Radio />} label="perBulan" />
                </RadioGroup>
              </FormControl>

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

              {/* <label>{`Cari Berdasarkan Total Transaksi ${GrafikView === 'harian' ? 'perHari' : 'perBulan'}:`}</label><br /> */}
              <label>Cari Berdasarkan Total Transaksi perTransaksi:</label><br />
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

            </Fragment>
          ) : null}

          <Button type='submit' style={st_textfield} size="large" variant='contained' color='primary' >Cari</Button>
        </form>
      </Fragment>
    )
  }
}

export default connect(null, { Load_Query_Graph_UangMasuk_List, Create_Info_Messages, Create_Warning_Messages })(QueryUangMasuk)