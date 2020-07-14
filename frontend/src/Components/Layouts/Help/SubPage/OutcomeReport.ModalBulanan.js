import React, { Fragment } from 'react'

import { Typography } from '@material-ui/core'

import ModalBulanan from '../../../Containers/Help/Help.OutcomeReport.ModalBulanan'

const OutcomeReportModalBulanan = () => {
    return (
        <Fragment>
            <Typography variant='h4' align='center'>
                Laporan Belanja Modal Bulanan
                </Typography>
            <ModalBulanan />
        </Fragment >
    )
}

export default OutcomeReportModalBulanan