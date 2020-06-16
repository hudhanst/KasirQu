import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { BrowserRouter as Router } from 'react-router-dom'

import { Load_User } from './Store/Actions/Auth.Actions'

import { CssBaseline, ThemeProvider, Container } from '@material-ui/core'
import { initialMUIState, MUI_theme_auth_dark, MUI_theme_auth_light, MUI_theme_unauth_dark, MUI_theme_unauth_light, MUI_st__Container_SideNav, MUI_st__Container_FlatNav } from './MUI_theme'

import Navbar from './Components/Containers/Navbar'
import Messages from './Components/Containers/Messages'
import BaseRouter from './Router'

class App extends React.Component {
  state = {
    // isDarkMode: false,
    isSideNavOpen: true,
  }
  componentDidMount() {
    this.props.Load_User()
    window.addEventListener("resize", this.CheckWindowWidth.bind(this))
    this.CheckWindowWidth()
  }
  CheckWindowWidth() {
    this.setState({ isSideNavOpen: window.innerWidth > initialMUIState.units.minWidth_first })
  }
  render() {
    // console.log(this.state)
    const { isDarkMode } = this.props.auth
    // const isDarkMode = false
    return (
      <Fragment>
        <ThemeProvider
          theme={
            (this.props.auth.token && this.props.auth.isAuth) ?
              ((isDarkMode === 'true' || isDarkMode === true) ?
                MUI_theme_auth_dark :
                MUI_theme_auth_light
              ) :
              ((isDarkMode === 'true' || isDarkMode === true) ?
                MUI_theme_unauth_dark :
                MUI_theme_unauth_light
              )
          }>
          <CssBaseline />
          {
            (this.props.auth.token && this.props.auth.isAuth) ?
              // <Fragment>
                <Navbar isDarkMode={isDarkMode} />
              // </Fragment>
              : null
          }

          {/* <Fragment> */}
            <Messages />
          {/* </Fragment> */}

          {/* <Fragment> */}
            <Container
              style=
              {
                (this.props.auth.token && this.props.auth.isAuth) ? (
                  (this.state.isSideNavOpen) ?
                    MUI_st__Container_SideNav :
                    MUI_st__Container_FlatNav
                ) : null
                // ) : { border: '1px solid red' }
              }>

              <Router>
                <BaseRouter />
              </Router>
            </Container>
          {/* </Fragment> */}
        </ThemeProvider>
      </Fragment >
    )
  }
}
const mapStateToProps = state => ({
  auth: state.Auth,
})
export default connect(mapStateToProps, { Load_User })(App)
