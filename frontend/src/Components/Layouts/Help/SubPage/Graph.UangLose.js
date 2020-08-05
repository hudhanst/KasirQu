import React, { Fragment } from 'react'

import { Typography } from '@material-ui/core'

import { TableSearching } from '../../../Containers/Searching'
import UangLoseGraph from '../../../Containers/Help/Help.Graph.UangLose'
import QueryUangLose from '../../../Containers/Help/Help.Graph.Query.UangLose'

const UangLose = () => {
    return (
        <Fragment>
            <Typography align='center' variant='h3' >Uang Lose</Typography>
            <TableSearching
                hidesearch={true}
                advancesearch={true}
                accordiondetails={<QueryUangLose />}
            />
            <UangLoseGraph />
        </Fragment >
    )
}

export default UangLose