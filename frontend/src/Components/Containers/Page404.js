import React, { Fragment } from 'react'

import { Typography } from '@material-ui/core'

export const HalamanTidakDitemukan = (props) => {
    return (
        <Fragment>
            <Typography variant='h2' align='center'>
                Halaman Tidak Ditemukan
            </Typography>
            {props.ket ?
                <Typography variant='h6' align='center'>
                    {props.ket}
                </Typography>
                : null
            }
        </Fragment>
    )
}

export const DataTidakDitemukan = (props) => {
    return (
        <Fragment>
            <Typography variant='h2' align='center'>
                Data Tidak Ditemukan
            </Typography>
            {props.ket ?
                <Typography variant='h6' align='center'>
                    {props.ket}
                </Typography>
                : null
            }
        </Fragment>
    )
}