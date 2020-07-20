import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Load_Export_Query_History } from '../../../Store/Actions/Account.Actions'

import { TextField, FormControl, InputLabel, Select, Button, Chip } from '@material-ui/core'

import Autocomplete from '@material-ui/lab/Autocomplete'

import { MUI_VerticalMargin, MUI_FullWidth, MUI_HalfWidth, MUI_HorizontalHalfMargin } from '../../../MUI_theme'

const date = new Date()
const dd = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
const mm = (date.getMonth() + 1) >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
const yyyy = date.getFullYear()

class QueryHistoryList extends React.Component {
    state = {
        UserName: '',
        isAllDate: false,
        DateMin: `${yyyy}-${mm}-${dd}T00:01`,
        DateMax: '',
        Location: [],
        Action: [],
        Status: '',
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
            UserName: this.state.UserName,
            DateMin: this.state.isAllDate ? null : this.state.DateMin,
            DateMax: this.state.isAllDate ? null : this.state.DateMax,
            Location: this.state.Location,
            Action: this.state.Action,
            Status: this.state.Status,
        }

        this.props.Load_Export_Query_History(data)
    }
    render() {
        const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth }
        const st_halftextfield = { ...MUI_VerticalMargin, ...MUI_HorizontalHalfMargin, ...MUI_HalfWidth }
        const LocationOptions = [
            'JenisBarang',
            'Barang/JenisBarang',
        ]
        const ActionOptions = [
            'Add',
            'Update',
            'Delete',
            'Import/Add',
        ]
        const StatusOption = [
            { text: 'Sukses', value: true },
            { text: 'Gagal', value: false }
        ]
        const {
            UserName,
            isAllDate,
            DateMin,
            DateMax,
            Location,
            Action,
            Status,
        } = this.state
        return (
            <Fragment>
                <form onSubmit={this.Form_OnSubmit}>
                    <TextField style={st_textfield} variant='outlined' onChange={this.Form_OnChange} type='text' label='Berdasarkan UserName' name='UserName' value={UserName} />

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

                    <Autocomplete
                        multiple
                        value={Location}
                        onChange={(event, newLocation) => {
                            this.setState({ Location: newLocation })
                        }}

                        options={LocationOptions.sort((a, b) => (a > b) ? 1 : ((b > a) ? -1 : 0))}
                        // getOptionLabel={option => typeof option === 'string' ? option : option.NamaJenisBarang}
                        getOptionLabel={option => option}
                        // groupBy={(option) => option.Kepemilikan}
                        renderTags={(tagValue, getTagProps) =>
                            tagValue.map((option, index) => (
                                <Chip
                                    // label={option.NamaJenisBarang}
                                    label={option}
                                    {...getTagProps({ index })}
                                />
                            ))
                        }
                        style={{ width: '100%' }}
                        renderInput={(params) => (
                            <TextField {...params} style={st_textfield} name='Location' label="Lokasi" variant="outlined" placeholder="Lokasi" />
                        )}
                    />

                    <Autocomplete
                        multiple
                        value={Action}
                        onChange={(event, newAction) => {
                            this.setState({ Action: newAction })
                        }}

                        options={ActionOptions.sort((a, b) => (a > b) ? 1 : ((b > a) ? -1 : 0))}
                        // getOptionLabel={option => typeof option === 'string' ? option : option.NamaJenisBarang}
                        getOptionLabel={option => option}
                        // groupBy={(option) => option.Kepemilikan}
                        renderTags={(tagValue, getTagProps) =>
                            tagValue.map((option, index) => (
                                <Chip
                                    // label={option.NamaJenisBarang}
                                    label={option}
                                    {...getTagProps({ index })}
                                />
                            ))
                        }
                        style={{ width: '100%' }}
                        renderInput={(params) => (
                            <TextField {...params} style={st_textfield} name='Action' label="Aksi" variant="outlined" placeholder="Aksi" />
                        )}
                    />

                    <FormControl style={st_textfield} variant="filled">
                        <InputLabel shrink >Status</InputLabel>
                        <Select native onChange={this.Form_OnChange} label="Status" name='Status' value={Status} labelWidth={100} >
                            <option value="" > -- select an option -- </option>
                            {StatusOption.map((item, index) =>
                                <option key={index} value={item.value}>{item.text}</option>
                            )}
                        </Select>
                    </FormControl>
                    <Button type='submit' style={st_textfield} size="large" variant='contained' color='primary' >Cari</Button>
                </form>
            </Fragment>
        )
    }
}

export default connect(null, { Load_Export_Query_History })(QueryHistoryList)