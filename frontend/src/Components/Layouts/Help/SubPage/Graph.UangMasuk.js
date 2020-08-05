import React, { Fragment } from 'react'

import { Typography } from '@material-ui/core'

import { TableSearching } from '../../../Containers/Searching'
import UangMasukGraph from '../../../Containers/Help/Help.Graph.UangMasuk'
import QueryUangMasuk from '../../../Containers/Help/Help.Graph.Query.UangMasuk'

const UangMasuk = () => {
    return (
        <Fragment>
            <Typography align='center' variant='h3' >Uang Masuk</Typography>
            <TableSearching
                hidesearch={true}
                advancesearch={true}
                accordiondetails={<QueryUangMasuk />}
            />
            <UangMasukGraph />
        </Fragment >
    )
}

export default UangMasuk