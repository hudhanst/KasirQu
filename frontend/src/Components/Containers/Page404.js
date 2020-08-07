import React, { Fragment } from 'react'

import { Typography, Button } from '@material-ui/core'

import logo from '../../IMG/logo.png'

export const HalamanTidakDitemukan = (props) => {
    // const logo = process.env.PUBLIC_URL + '/IMG/logo.png'
    const BackButton = () => {
        window.history.back()
    }
    const HomeButton = () => {
        window.location = "/"
    }
    return (
        <Fragment>
            <Typography align='center' style={{ marginTop: '10%', padding: '10px' }}>
                <img src={logo} alt='logo kasirqu' onClick={() => HomeButton()} />
            </Typography>
            <Typography variant='h2' align='center'>
                Halaman Tidak Ditemukan
            </Typography>
            <Typography variant='subtitle1' align='center'>
                Klik tombol dibawah untuk kembali atau logo untuk ke halaman utama
            </Typography>
            <Typography align='center'>
                <Button variant='contained' color='primary' onClick={() => BackButton()} style={{ padding: '10px', marginTop: '10px' }} >
                    Kembali !
                </Button>
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