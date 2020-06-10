import React, { Fragment } from 'react'

import { TextField, InputAdornment } from '@material-ui/core'

import { MUI_VerticalMargin } from '../../MUI_theme'

import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone'

const Searching = (props) => {
    const onChange_Search = (E) => {
        const textinput = E.target.value
        const filter = textinput.toUpperCase()
        const usertable = document.getElementById(props.tablename)
        const tr = usertable.getElementsByTagName('tr')
        var i, td, txtValue

        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[props.tdnumber]
            if (td) {
                txtValue = td.textContent || td.innerText
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = ""
                } else {
                    tr[i].style.display = "none"
                }
            }
        }
    }
    const width_of_bar = !props.width ? null : (
        props.width === 'xl' ? { width: '100%' } : (
            props.width === 'l' ? { width: '75%' } : { width: '50%' }
        )
    )
    const st_searchbar = { ...width_of_bar, ...MUI_VerticalMargin }
    return (
        <Fragment>
            <TextField
                variant='outlined'
                type='text'
                label={props.label ? props.label : 'Cari Berdasarkan Nama'}
                style={st_searchbar}
                name='Search'
                onChange={onChange_Search}
                InputProps={{
                    startAdornment:
                        <InputAdornment position="start">
                            <SearchTwoToneIcon />
                        </InputAdornment>,
                }}
            />
            {/* <input type='text' className='Input-as-Filter' onChange={onChange_Filter} placeholder='Search Siswa Data by Nomer Induk' /> */}
            {/* <button className='btn btn-lg btn-colorize-green'>Filter</button> */}
        </Fragment>
    )
}

export default Searching