import React, { Fragment } from 'react'

import { Typography } from '@material-ui/core'

import Searching from '../../../Containers/Searching'
import AsetGraph from '../../../Containers/Help/Help.Graph.Aset'
import QueryAset from '../../../Containers/Help/Help.Graph.Query.Aset'

const GraphAset = () => {
    return (
        <Fragment>
            <Typography align='center' variant='h3' >Aset</Typography>
            <Searching
                hidesearch={true}
                advancesearch={true}
                accordiondetails={<QueryAset />}
            />
            <AsetGraph />
        </Fragment >
    )
}

export default GraphAset