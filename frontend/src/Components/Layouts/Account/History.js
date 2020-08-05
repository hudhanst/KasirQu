import React, { Fragment } from 'react'

import { Typography } from '@material-ui/core'

import { TableSearching } from '../../Containers/Searching'
import BreadCrumbs from '../../Containers/BreadCrumbs'
import HistoryList from '../../Containers/Account/Account.History.HistoryList'
import QueryHistoryList from '../../Containers/Account/Account.History.QueryHistoryList'

const History = () => {
    const breadcrumbs = [{ name: 'Account', link: 'account' }, { name: 'Toko Detail', link: 'account/tokodetail' }, { name: 'History', link: 'account/tokodetail/history' }]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Typography variant='h4' align='center'>
                History
            </Typography>
            <TableSearching
                hidesearch={true}
                advancesearch={true}
                accordiondetails={<QueryHistoryList />}
            />
            <HistoryList />
        </Fragment>
    )
}

export default History