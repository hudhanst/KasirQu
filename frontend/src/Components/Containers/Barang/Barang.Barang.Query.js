import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Load_Barang_List, Load_Export_Query_Barang } from '../../../Store/Actions/Barang.Actions'
import { Load_JenisBarang_List } from '../../../Store/Actions/JenisBarang.Actions'

import { TextField, FormControl, InputLabel, Select, Button, Chip, InputAdornment } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

import { MUI_VerticalMargin, MUI_FullWidth, MUI_HorizontalHalfMargin, MUI_HalfWidth } from '../../../MUI_theme'

class QueryBarang extends React.Component {
    state = {
        isAllData: false,
        NamaBarang: [],
        JenisBarang: [],
        Kepemilikan: '',
        StokMin: '',
        StokMax: '',
        HargaModalMin: '',
        HargaModalMax: '',
        HargaJualMin: '',
        HargaJualMax: '',
        Ket: ''
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
    Form_OnSubmit = E => {
        E.preventDefault()
        const data = {
            NamaBarang: this.state.isAllData ? null : this.state.NamaBarang,
            JenisBarang: this.state.isAllData ? null : this.state.JenisBarang,
            Kepemilikan: this.state.isAllData ? null : this.state.Kepemilikan,
            StokMin: this.state.isAllData ? null : this.state.StokMin,
            StokMax: this.state.isAllData ? null : this.state.StokMax,
            HargaModalMin: this.state.isAllData ? null : this.state.HargaModalMin,
            HargaModalMax: this.state.isAllData ? null : this.state.HargaModalMax,
            HargaJualMin: this.state.isAllData ? null : this.state.HargaJualMin,
            HargaJualMax: this.state.isAllData ? null : this.state.HargaJualMax,
            Ket: this.state.isAllData ? null : this.state.Ket,
        }

        this.props.Load_Export_Query_Barang(data)
    }
    render() {
        const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth }
        const st_halftextfield = { ...MUI_VerticalMargin, ...MUI_HorizontalHalfMargin, ...MUI_HalfWidth }
        const KepemilikanOptions = ['pribadi', 'nonpribadi']
        const JenisBarangOptions = this.props.JenisBarangList
        const BarangOptions = this.props.BarangList
        const {
            isAllData,
            NamaBarang,
            JenisBarang,
            Kepemilikan,
            StokMin,
            StokMax,
            HargaModalMin,
            HargaModalMax,
            HargaJualMin,
            HargaJualMax,
            Ket,
        } = this.state
        return (
            <Fragment>
                <form onSubmit={this.Form_OnSubmit}>
                    <label>Cari dari Keseluruhan Data:</label><br />
                    <div className='switch' style={MUI_VerticalMargin}>
                        <input type="checkbox" onChange={this.CheckBox_OnChange} name='isAllData' checked={isAllData} /><span></span><br />
                    </div><br />
                    {isAllData === false ? (
                        <Fragment>
                            <Autocomplete
                                multiple
                                value={NamaBarang}
                                onChange={(event, newNamaBarang) => {
                                    this.setState({ NamaBarang: newNamaBarang })
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

                            <FormControl style={st_textfield} variant="filled">
                                <InputLabel shrink >Kepemilikan</InputLabel>
                                <Select native onChange={this.Form_OnChange} label="Kepemilikan" name='Kepemilikan' value={Kepemilikan} labelWidth={100} >
                                    <option value="" > -- select an option -- </option>
                                    {KepemilikanOptions.map((item, index) =>
                                        <option key={index} value={item}>{item}</option>
                                    )}
                                </Select>
                            </FormControl>

                            <label>Cari Berdasarkan Total Stok Barang:</label><br />
                            <TextField
                                style={st_halftextfield}
                                variant='outlined'
                                onChange={this.Form_OnChange}
                                type='number'
                                label='Stok Minimum'
                                name='StokMin'
                                value={StokMin}
                            /><br />
                            <TextField
                                style={st_halftextfield}
                                variant='outlined'
                                onChange={this.Form_OnChange}
                                type='number'
                                label='Stok Maksimum'
                                name='StokMax'
                                value={StokMax}
                            /><br />

                            <label>Cari Berdasarkan Modal Barang:</label><br />
                            <TextField
                                style={st_halftextfield}
                                variant='outlined'
                                onChange={this.Form_OnChange}
                                type='number'
                                label='Harga Modal Minimum'
                                name='HargaModalMin'
                                value={HargaModalMin}
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
                                label='Harga Modal Maksimum'
                                name='HargaModalMax'
                                value={HargaModalMax}
                                InputProps={{
                                    startAdornment:
                                        <InputAdornment position="start">
                                            Rp
                                        </InputAdornment>,
                                }}
                            /><br />

                            <label>Cari Harga Jual Barang:</label><br />
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
                        </Fragment>
                    ) : null}
                    <Button type='submit' style={st_textfield} size="large" variant='contained' color='primary' >Cari</Button>
                </form>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    BarangList: state.Barang.BarangList,
    JenisBarangList: state.JenisBarang.JenisBarangList,
})

export default connect(mapStateToProps, { Load_Barang_List, Load_JenisBarang_List, Load_Export_Query_Barang })(QueryBarang)