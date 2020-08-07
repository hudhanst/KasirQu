import React, { Fragment } from 'react'

import { connect } from 'react-redux'
import { LogOut } from '../../../Store/Actions/Auth.Actions'

import { Redirect } from 'react-router-dom'

import { Container, Typography, Link } from '@material-ui/core'
import logo from '../../../IMG/logo.png'

class Logout extends React.Component {
    state = {
        redirectstatus: false
    }
    componentDidMount() {
        this.props.LogOut()
        setTimeout(() => this.setState({ redirectstatus: true }), 3000)
    }
    render() {
        // const logo = process.env.PUBLIC_URL + '/IMG/logo.png'
        return (
            <Fragment >
                <Container maxWidth='sm'>
                    <Typography variant="h3" align='center' color='primary' gutterBottom>
                        Logout page
                    </Typography>
                    <Typography variant="subtitle2" align='center' color='primary' gutterBottom>
                        page akan otomatis dialihkan ke halaman login setelah beberapa detik.....
                    </Typography>

                    <Link href='/login' underline='none'>
                        <Typography align='center'>
                            <img src={logo} alt='logo kasirqu' />
                        </Typography>
                    </Link>
                    <Typography variant="subtitle2" align='center' color='primary' gutterBottom>
                        atau klik gambar diatas untuk ke halaman login
                    </Typography>
                </Container>
                {this.state.redirectstatus ? <Redirect to="/login" /> : null}
            </Fragment>
        )
    }
}

// const mapStateToProps = state => ({
//     auth: state.Auth
// })

// export default connect(mapStateToProps, { LogOut })(Logout)
export default connect(null, { LogOut })(Logout)

