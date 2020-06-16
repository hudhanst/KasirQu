import React, { Fragment } from 'react'

import { MUI_FullWidth, MUI_VerticalMargin } from '../../../MUI_theme'

import BreadCrumbs from '../../Containers/BreadCrumbs'
import GenericModals from '../../Containers/GenericModals'
import AddAccount from '../../Containers/Account/Account.AddAccount'
import UserDataList from '../../Containers/Account/Account.UserDataList'

const UserList = () => {
    const breadcrumbs = [{ name: 'Account', link: 'account' }, { name: 'UserList', link: 'account/userlist' }]
    return (
        <Fragment>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <GenericModals
                size='m'
                header='Add Account'
                body={<AddAccount />}
                Buttonstyle={{ ...MUI_FullWidth, ...MUI_VerticalMargin }}
                Buttonvariant='contained'
                Buttonsize='large'
                Buttoncolor='primary'
                ButtononClickeven={() => null}
                Buttonlabel={'Add Account'}
            />
            <hr />
            <UserDataList />
        </Fragment>
    )
}

export default UserList