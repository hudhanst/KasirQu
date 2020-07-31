import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Load_Query_Graph_IntensitasBarangTransaksi_List } from '../../../Store/Actions/Help.Actions'
import { Load_Barang_List } from '../../../Store/Actions/Barang.Actions'
import { Load_JenisBarang_List } from '../../../Store/Actions/JenisBarang.Actions'
import { Create_Info_Messages, Create_Warning_Messages } from '../../../Store/Actions/Messages.Actions'

import { TextField, FormControl, Button, FormLabel, RadioGroup, FormControlLabel, Radio, InputLabel, Select, Chip } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

import { MUI_VerticalMargin, MUI_FullWidth, MUI_HalfWidth, MUI_HorizontalHalfMargin } from '../../../MUI_theme'

// Transaksi -> DateMin|DateMax
// Transaksi -> Tipe
// JenisBarang -> Kepemilikan 
// Barang -> JenisList []
// Barang -> BarangList []

const date = new Date()
const mm = (date.getMonth() + 1) >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
const yyyy = date.getFullYear()

class QueryIntensitasBarangTransaksi extends React.Component {
  state = {
    isAllData: false,
    isAllDate: false,
    DateMin: `${yyyy}-${mm}-01T00:01`,
    DateMax: '',
    Tipe: '',
    Kepemilikan: '',
    JenisBarang: [],
    Barang: [],
    GrafikView: 'harian',
  }
  componentDidMount() {
    this.props.Load_Barang_List()
    this.props.Load_JenisBarang_List()
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
      Tipe: isAllData ? null : this.state.Tipe,
      Kepemilikan: isAllData ? null : this.state.Kepemilikan,
      JenisBarang: isAllData ? null : this.state.JenisBarang,
      Barang: isAllData ? null : this.state.Barang,
      GrafikView: isAllData ? 'bulanan' : this.state.GrafikView,
    }
    if ((!data.DateMin && !data.DateMax) || (isAllData) || (isAllDate)) {
      this.props.Create_Info_Messages(null, 'anda mencoba memfilter semua data, mungkin akan memakan waktu proses cukup lama')
    }
    if (
      ((data.DateMax < data.DateMin) && (data.DateMax && data.DateMin))) {
      this.props.Create_Warning_Messages(null, 'Nilai Minimum Lebih Besar Dari Nilai Maksimum, Data mungkin tidak terpanggil')
    }
    this.props.Load_Query_Graph_IntensitasBarangTransaksi_List(data)
  }
  render() {
    const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth }
    const st_halftextfield = { ...MUI_VerticalMargin, ...MUI_HorizontalHalfMargin, ...MUI_HalfWidth }
    const {
      isAllData,
      isAllDate,
      DateMin,
      DateMax,
      Tipe,
      Kepemilikan,
      JenisBarang,
      Barang,
      GrafikView,
    } = this.state

    const TipeOptions = ['Belanja', 'Transaksi']
    const KepemilikanOptions = ['pribadi', 'nonpribadi']
    const JenisBarangOptions = this.props.JenisBarangList
    const BarangOptions = this.props.BarangList

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
                  {/* <FormControlLabel value="pr_jam" control={<Radio />} label="Persentase perJam" /> */}
                  {/* <FormControlLabel value="pr_harian" control={<Radio />} label="Persentase perHari" /> */}
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

              <FormControl style={st_textfield} variant="filled">
                <InputLabel shrink >Tipe Transaksi</InputLabel>
                <Select native onChange={this.Form_OnChange} label="Tipe Transaksi" name='Tipe' value={Tipe} labelWidth={100} >
                  <option value=""> -- select an option -- </option>
                  {TipeOptions.map((item, index) =>
                    <option key={index} value={item}>{item}</option>
                  )}
                </Select>
              </FormControl>

              <FormControl style={st_textfield} variant="filled">
                <InputLabel shrink >Kepemilikan Barang</InputLabel>
                <Select native onChange={this.Form_OnChange} label="Kepemilikan Barang" name='Kepemilikan' value={Kepemilikan} labelWidth={100} >
                  <option value=""> -- select an option -- </option>
                  {KepemilikanOptions.map((item, index) =>
                    <option key={index} value={item}>{item}</option>
                  )}
                </Select>
              </FormControl>

              <Autocomplete
                multiple
                value={JenisBarang}
                onChange={(event, newJenisBarang) => {
                  this.setState({ JenisBarang: newJenisBarang })
                }}

                options={JenisBarangOptions.sort((a, b) => (a.Kepemilikan > b.Kepemilikan) ? 1 : ((b.Kepemilikan > a.Kepemilikan) ? -1 : 0))}
                getOptionLabel={option => typeof option === 'string' ? option : option.NamaJenisBarang}
                groupBy={(option) => option.Kepemilikan}
                renderTags={(tagValue, getTagProps) =>
                  tagValue.map((option, index) => (
                    <Chip
                      label={option.NamaJenisBarang}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                style={{ width: '100%' }}
                renderInput={(params) => (
                  <TextField {...params} style={st_textfield} name='JenisBarang' label="Jenis Barang" variant="outlined" placeholder="JenisBarang" />
                )}
              />

              <Autocomplete
                multiple
                value={Barang}
                onChange={(event, newBarang) => {
                  this.setState({ Barang: newBarang })
                }}

                options={BarangOptions.sort((a, b) => (a.Jenis > b.Jenis) ? 1 : ((b.Jenis > a.Jenis) ? -1 : 0))}
                getOptionLabel={option => typeof option === 'string' ? option : option.Name}
                groupBy={(option) => option.Jenis}
                renderTags={(tagValue, getTagProps) =>
                  tagValue.map((option, index) => (
                    <Chip
                      label={option.Name}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                style={{ width: '100%' }}
                renderInput={(params) => (
                  <TextField {...params} style={st_textfield} name='Barang' label="Barang" variant="outlined" placeholder="Barang" />
                )}
              />

            </Fragment>
          ) : null}

          <Button type='submit' style={st_textfield} size="large" variant='contained' color='primary' >Cari</Button>
        </form>
      </Fragment>

    )
  }
}
const mapStateToProps = (state) => ({
  JenisBarangList: state.JenisBarang.JenisBarangList,
  BarangList: state.Barang.BarangList,
})

export default connect(mapStateToProps, { Load_Query_Graph_IntensitasBarangTransaksi_List, Load_Barang_List, Load_JenisBarang_List, Create_Info_Messages, Create_Warning_Messages })(QueryIntensitasBarangTransaksi)