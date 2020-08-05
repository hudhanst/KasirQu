import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Container } from '@material-ui/core'

import { MUI_st_Account_Container, MUI_FullWidth, MUI_VerticalMargin } from '../../../MUI_theme'

import BreadCrumbs from '../../Containers/BreadCrumbs'
import TokoDetail from '../../Containers/Account/Account.TokoDetail'
import GenericModals from '../../Containers/GenericModals'
import TokoUpdate from '../../Containers/Account/Account.TokoUpdate'

class Toko extends React.Component {
    render() {
        const breadcrumbs = [{ name: 'Account', link: 'account' }, { name: 'Toko Detail', link: 'account/tokodetail' }]
        const st_button = { ...MUI_FullWidth, ...MUI_VerticalMargin }
        const User = this.props.User
        return (
            <Fragment>
                <Container style={MUI_st_Account_Container} maxWidth="md">
                    <BreadCrumbs breadcrumbs={breadcrumbs} />
                    <TokoDetail />
                    <hr />
                    {User?.isSuperUser ? (
                        <GenericModals
                            size='m'
                            header='Update Toko'
                            body={<TokoUpdate />}
                            Buttonstyle={st_button}
                            Buttoncolor='primary'
                            Buttonsize='large'
                            ButtononClickeven={() => null}
                            Buttonlabel={'Update'}
                        />) : null}
                </Container>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    User: state.Auth.User
})

export default connect(mapStateToProps, {})(Toko)