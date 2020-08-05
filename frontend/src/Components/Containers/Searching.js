import React, { Fragment } from 'react'

import { TextField, InputAdornment, Accordion, AccordionSummary, AccordionDetails, Typography, Paper } from '@material-ui/core'

import { MUI_VerticalMargin } from '../../MUI_theme'

import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

export const TableSearching = (props) => {
    const onChange_Search = (E) => {
        try {
            const textinput = E.target.value
            const filter = textinput.toUpperCase()
            const usertable = document.getElementById(props.tablename)
            const tr = usertable.getElementsByTagName('tr')
            let i, td, txtValue

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
        } catch (err) {
            console.log(err)
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
            {(props.hidesearch === true) ? null : (
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
            )}
            {props.advancesearch ? (
                <Fragment>
                    <Accordion>
                        <AccordionSummary >
                            {props.accordionsummary ?
                                props.accordionsummary : (
                                    <Typography align='center' style={{ marginLeft: '45%' }}>
                                        <ExpandMoreIcon />
                                    </Typography>)}
                        </AccordionSummary>
                        <AccordionDetails>
                            {props.accordiondetails ? (
                                <Paper style={{ width: '100%' }}>
                                    {props.accordiondetails}
                                </Paper>
                            ) : null}
                        </AccordionDetails>
                    </Accordion>
                </Fragment>
            ) : null}
        </Fragment>
    )
}

export const ListSearching = (props) => {
    const onChange_Search = (E) => {
        try {
            const input = E.target.value
            const filter = input.toUpperCase()
            const ul = document.getElementById(props.ulname)
            const li = ul.getElementsByTagName("li")
            let i = 0
            while (i < li.length) {
                const a = li[i].getElementsByTagName("a")[0]
                const txtValue = a.textContent || a.innerText
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = ""
                } else {
                    li[i].style.display = "none"
                }
                i = i + 1
            }

        } catch (err) {
            console.log(err)
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
            {(props.hidesearch === true) ? null : (
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
            )}
            {props.advancesearch ? (
                <Fragment>
                    <Accordion>
                        <AccordionSummary >
                            {props.accordionsummary ?
                                props.accordionsummary : (
                                    <Typography align='center' style={{ marginLeft: '45%' }}>
                                        <ExpandMoreIcon />
                                    </Typography>)}
                        </AccordionSummary>
                        <AccordionDetails>
                            {props.accordiondetails ? (
                                <Paper style={{ width: '100%' }}>
                                    {props.accordiondetails}
                                </Paper>
                            ) : null}
                        </AccordionDetails>
                    </Accordion>
                </Fragment>
            ) : null}
        </Fragment>
    )
}