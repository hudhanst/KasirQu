import React from 'react'

import { connect } from 'react-redux'

import { Create_Error_Messages } from '../Store/Actions/Messages.Actions'

import Store from '../Store/Store'

import { Route, Redirect } from 'react-router-dom'

// import Loading from '../Components/Container/Loading'

const PrivateRoute = ({ component: Component, auth, SecurityType, ...rest }) => (
    <Route {...rest} render={props => {
        if (auth.isUserLoading) {
            return <h2>loading...</h2>
            // return <Loading />
        } else if (!auth.isAuth) {
            return <Redirect to="/login" />
        } else {
            const User = auth.User
            if (User) {
                if (SecurityType) {
                    const isAdmin = User.isAdmin
                    const isSuperUser = User.isSuperUser
                    if (SecurityType === 'SuperPrivacry' && !isSuperUser) {
                        Store.dispatch(
                            Create_Error_Messages(null, 'anda harus masuk dengan akun SUPERUSER untuk mengakses halaman terkait')
                        )
                        return <Redirect to="/" />
                    } else if (SecurityType === 'Privacry' && !(isAdmin || isSuperUser)) {
                        Store.dispatch(
                            Create_Error_Messages(null, 'anda harus masuk dengan akun ADMIN atau SUPERUSER untuk mengakses halaman terkait')
                        )
                        return <Redirect to="/" />
                    } else {
                        return <Component {...props} />
                    }
                } else {
                    return <Component {...props} />
                }
            }
        }
    }} />
)

const mapStateToProps = state => ({
    auth: state.Auth
})

export default connect(mapStateToProps)(PrivateRoute)