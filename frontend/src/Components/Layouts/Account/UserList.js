import React, { Fragment } from 'react'

import BreadCrumbs from '../../Containers/BreadCrumbs'
import UserDataList from '../../Containers/Account/Account.UserDataList'

const UserList = () => {
    const breadcrumbs = [{ name: 'Account', link: 'account' },{ name: 'UserList', link: 'account/userlist' }]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <UserDataList />
        </Fragment>
    )
}

export default UserList