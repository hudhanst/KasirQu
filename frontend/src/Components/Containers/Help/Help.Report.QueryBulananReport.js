////// FIXME DELETE LETTER
import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Load_Query_IncomeReport_Barang_List } from '../../../Store/Actions/Help.Actions'
import { Load_JenisBarang_List } from '../../../Store/Actions/JenisBarang.Actions'
import { Create_Info_Messages, Create_Warning_Messages } from '../../../Store/Actions/Messages.Actions'

import { TextField, FormControl, InputLabel, Select, Button } from '@material-ui/core'

import { MUI_VerticalMargin, MUI_FullWidth, MUI_HalfWidth, MUI_HorizontalHalfMargin } from '../../../MUI_theme'

const date = new Date()
// const dd = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
const mm = (date.getMonth() + 1) >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
const yyyy = date.getFullYear()

class QueryBulananReport extends React.Component {
    state = {
        JenisBarang: '',
        Kepemilikan: '',
        isAllData: false,
        DateMin: `${yyyy}-${mm}-01T00:01`,
        DateMax: '',
    }
    componentDidMount() {
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
            JenisBarang: this.state.JenisBarang,
            Kepemilikan: this.state.Kepemilikan,
            isAllData: this.state.isAllData,
            DateMin: this.state.DateMin,
            DateMax: this.state.DateMax,
        }
        if ((!data.DateMin && !data.DateMax) || (data.isAllData)) {
            this.props.Create_Info_Messages(null, 'anda mencoba memfilter semua data, mungkin akan memakan waktu proses cukup lama')
        }
        if (((data.DateMax < data.DateMin) && (data.DateMax && data.DateMin))) {
            this.props.Create_Warning_Messages(null, 'Nilai Minimum Lebih Besar Dari Nilai Maksimum, Data mungkin tidak terpanggil')
        }
        this.props.Load_Query_IncomeReport_Barang_List(data)
    }
    render() {
        const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth }
        const st_halftextfield = { ...MUI_VerticalMargin, ...MUI_HorizontalHalfMargin, ...MUI_HalfWidth }
        const choices = ['pribadi', 'nonpribadi']
        const JenisBarangOptions = this.props.JenisBarangList
        const {
            JenisBarang,
            Kepemilikan,
            isAllData,
            DateMin,
            DateMax,
        } = this.state
        return (
            <Fragment>
                <form onSubmit={this.Form_OnSubmit}>
                    <FormControl style={st_textfield} variant="filled">
                        <InputLabel shrink >Jenis Barang</InputLabel>
                        <Select native onChange={this.Form_OnChange} label="Jenis Barang" name='JenisBarang' value={JenisBarang} labelWidth={100} >
                            <option value="" disabled> -- select an option -- </option>
                            {JenisBarangOptions.map((item, index) =>
                                <option key={index} value={item.NamaJenisBarang}>{item.NamaJenisBarang}</option>
                            )}
                        </Select>
                    </FormControl>
                    <FormControl style={st_textfield} variant="filled">
                        <InputLabel shrink >Kepemilikan Barang</InputLabel>
                        <Select native onChange={this.Form_OnChange} label="Kepemilikan Barang" name='Kepemilikan' value={Kepemilikan} labelWidth={100} >
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
                    <Button type='submit' style={st_textfield} size="large" variant='contained' color='primary' >Cari</Button>
                </form>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    JenisBarangList: state.JenisBarang.JenisBarangList,
})

export default connect(mapStateToProps, { Load_JenisBarang_List, Load_Query_IncomeReport_Barang_List, Create_Info_Messages, Create_Warning_Messages })(QueryBulananReport)