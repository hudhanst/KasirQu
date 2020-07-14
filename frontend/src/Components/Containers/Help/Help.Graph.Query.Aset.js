import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Load_Query_Graph_Aset_List } from '../../../Store/Actions/Help.Actions'
import { Load_JenisBarang_List } from '../../../Store/Actions/JenisBarang.Actions'
import { Load_Barang_List } from '../../../Store/Actions/Barang.Actions'
import { Create_Warning_Messages } from '../../../Store/Actions/Messages.Actions'

import { TextField, FormControl, InputLabel, Select, Button, Chip, InputAdornment } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

import { MUI_VerticalMargin, MUI_FullWidth, MUI_HalfWidth, MUI_HorizontalHalfMargin } from '../../../MUI_theme'

class QueryAset extends React.Component {
  state = {
    Kepemilikan: '',
    Barang: [],
    JenisBarang: [],
    StokMin: '',
    StokMax: '',
    HargaJualMin: '',
    HargaJualMax: '',
    Ket: ''
  }
  componentDidMount() {
    this.props.Load_JenisBarang_List()
    this.props.Load_Barang_List()
  }
  Form_OnChange = E => {
    this.setState({ [E.target.name]: E.target.value })
  }
  Form_OnSubmit = E => {
    E.preventDefault()
    const data = {
      Kepemilikan: this.state.Kepemilikan,
      Barang: this.state.Barang,
      JenisBarang: this.state.JenisBarang,
      StokMin: this.state.StokMin,
      StokMax: this.state.StokMax,
      HargaJualMin: this.state.HargaJualMin,
      HargaJualMax: this.state.HargaJualMax,
      Ket: this.state.Ket,
    }
    if (
      ((data.StokMax < data.StokMin) && (data.StokMax && data.StokMin))
      || ((data.HargaJualMax < data.HargaJualMin) && (data.HargaJualMax && data.HargaJualMin))
    ) {
      this.props.Create_Warning_Messages(null, 'Nilai Minimum Lebih Besar Dari Nilai Maksimum, Data mungkin tidak terpanggil')
    }
    this.props.Load_Query_Graph_Aset_List(data)
  }
  render() {
    const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth }
    const st_halftextfield = { ...MUI_VerticalMargin, ...MUI_HorizontalHalfMargin, ...MUI_HalfWidth }
    const KepemilikanOptions = ['pribadi', 'nonpribadi']
    const JenisBarangOptions = this.props.JenisBarangList
    const BarangOptions = this.props.BarangList
    const {
      Kepemilikan,
      Barang,
      JenisBarang,
      StokMin,
      StokMax,
      HargaJualMin,
      HargaJualMax,
      Ket,
    } = this.state
    return (
      <Fragment>
        <form onSubmit={this.Form_OnSubmit}>
          <FormControl style={st_textfield} variant="filled">
            <InputLabel shrink >Kepemilikan</InputLabel>
            <Select native onChange={this.Form_OnChange} label="Kepemilikan" name='Kepemilikan' value={Kepemilikan} labelWidth={100} >
              {/* <option value="" disabled> -- select an option -- </option> */}
              <option value="" > -- select an option -- </option>
              {KepemilikanOptions.map((item, index) =>
                <option key={index} value={item}>{item}</option>
              )}
            </Select>
          </FormControl>

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
              <TextField {...params} style={st_textfield} name='JenisBarang' label="JenisBarang" variant="outlined" placeholder="JenisBarang" />
            )}
          />

          <label>Cari Jumlah Stok:</label><br />
          <TextField
            style={st_halftextfield}
            variant='outlined'
            onChange={this.Form_OnChange}
            type='number'
            label='Jumlah Stok Minimum'
            name='StokMin'
            value={StokMin}
          /><br />
          <TextField
            style={st_halftextfield}
            variant='outlined'
            onChange={this.Form_OnChange}
            type='number'
            label='Jumlah Stok Maksimum'
            name='StokMax'
            value={StokMax}
          /><br />

          <label>Cari Berdasarkan Harga Jual:</label><br />
          <TextField
            style={st_halftextfield}
            variant='outlined'
            onChange={this.Form_OnChange}
            type='number'
            label='Harga Jual Minimum'
            name='HargaJualMin'
            value={HargaJualMin}
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
            label='Harga Jual Maksimum'
            name='HargaJualMax'
            value={HargaJualMax}
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

const mapStateToProps = (state) => ({
  JenisBarangList: state.JenisBarang.JenisBarangList,
  BarangList: state.Barang.BarangList,
})

export default connect(mapStateToProps, { Load_JenisBarang_List, Load_Barang_List, Load_Query_Graph_Aset_List, Create_Warning_Messages })(QueryAset)