import React, { Fragment } from 'react'

import { Typography } from '@material-ui/core'

import Searching from '../../../Containers/Searching'
import UangKeluarGraph from '../../../Containers/Help/Help.Graph.UangKeluar'
import QueryUangKeluar from '../../../Containers/Help/Help.Graph.Query.UangKeluar'

const UangKeluar = () => {
    return (
        <Fragment>
            <Typography align='center' variant='h3' >Uang Keluar</Typography>
            <Searching
                hidesearch={true}
                advancesearch={true}
                accordiondetails={<QueryUangKeluar />}
            />
            <UangKeluarGraph />
        </Fragment >
    )
}

export default UangKeluar