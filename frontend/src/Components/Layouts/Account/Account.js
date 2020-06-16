import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { get_AccountId_Detail, get_AccountId_Update } from '../../../Store/Actions/Auth.Actions'

import { Container } from '@material-ui/core'

import { MUI_st_Account_Container, MUI_FullWidth, MUI_VerticalMargin } from '../../../MUI_theme'

import BreadCrumbs from '../../Containers/BreadCrumbs'
import AccountDetail from '../../Containers/Account/Account.AccountDetail'
import GenericModals from '../../Containers/GenericModals'
import AccountUpdate from '../../Containers/Account/Account.AccountUpdate'
import LogOutButton from '../../Containers/LogOutButton'

class Account extends React.Component {
    componentDidMount() {
        const { user } = this.props
        if (user !== null) {
            // console.log('hi')
            this.props.get_AccountId_Detail(user._id)
        }
    }
    onClick_get_AccountId_Update(AccountId) {
        this.props.get_AccountId_Update(AccountId)
    }
    render() {
        // console.log(this.props)
        const breadcrumbs = [{ name: 'Account', link: 'account' }]
        const st_button = { ...MUI_FullWidth, ...MUI_VerticalMargin }
        // const AccountId = this.props.user._id
        return (
            <Fragment>
                <Container style={MUI_st_Account_Container} maxWidth="md">
                    <BreadCrumbs breadcrumbs={breadcrumbs} />
                    <AccountDetail />
                    <hr />
                    <GenericModals
                        size='m'
                        header='Update Account'
                        body={<AccountUpdate />}
                        Buttonstyle={st_button}
                        Buttoncolor='primary'
                        Buttonsize='large'
                        ButtononClickeven={() => this.onClick_get_AccountId_Update(this.props.user._id)}
                        Buttonlabel={'Update'}
                    />
                    <LogOutButton />
                </Container>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: state.Auth.User
})

export default connect(mapStateToProps, { get_AccountId_Detail, get_AccountId_Update })(Account)