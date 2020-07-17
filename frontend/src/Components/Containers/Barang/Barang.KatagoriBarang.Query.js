import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Load_JenisBarang_List, Load_Query_KatagoriBarang } from '../../../Store/Actions/JenisBarang.Actions'

import { TextField, FormControl, InputLabel, Select, Button, Chip } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

import { MUI_VerticalMargin, MUI_FullWidth } from '../../../MUI_theme'

class QueryKatagoriBarang extends React.Component {
    state = {
        isAllData: false,
        Kepemilikan: '',
        JenisBarang: [],
        Ket: ''
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
            JenisBarang: this.state.isAllData ? null : this.state.JenisBarang,
            Kepemilikan: this.state.isAllData ? null : this.state.Kepemilikan,
            Ket: this.state.isAllData ? null : this.state.Ket,
        }

        this.props.Load_Query_KatagoriBarang(data)
    }
    render() {
        const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth }
        const KepemilikanOptions = ['pribadi', 'nonpribadi']
        const JenisBarangOptions = this.props.JenisBarangList
        const {
            isAllData,
            Kepemilikan,
            JenisBarang,
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
                            <FormControl style={st_textfield} variant="filled">
                                <InputLabel shrink >Kepemilikan</InputLabel>
                                <Select native onChange={this.Form_OnChange} label="Kepemilikan" name='Kepemilikan' value={Kepemilikan} labelWidth={100} >
                                    <option value="" > -- select an option -- </option>
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
                                    <TextField {...params} style={st_textfield} name='JenisBarang' label="JenisBarang" variant="outlined" placeholder="JenisBarang" />
                                )}
                            />

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
    JenisBarangList: state.JenisBarang.JenisBarangList,
})

export default connect(mapStateToProps, { Load_JenisBarang_List, Load_Query_KatagoriBarang })(QueryKatagoriBarang)