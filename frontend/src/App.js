import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { BrowserRouter as Router } from 'react-router-dom'

// import {LoadUser} from './Store/Actions/Auth.Actions'

import { CssBaseline, ThemeProvider, Container } from '@material-ui/core'
import { initialMUIState, MUI_theme_dark, MUI_theme_light, MUI_st__Container_SideNav, MUI_st__Container_FlatNav } from './MUI_theme'

import Navbar from './Components/Containers/Navbar'
import BaseRouter from './Router'

class App extends React.Component {
  state = {
    isDarkMode: false,
    isSideNavOpen: true,
  }
  componentDidMount() {
    window.addEventListener("resize", this.CheckWindowWidth.bind(this))
    this.CheckWindowWidth();
  }
  CheckWindowWidth() {
    this.setState({ isSideNavOpen: window.innerWidth > initialMUIState.units.minWidth_first })
  }
  render() {
    // console.log(this.state)
    return (
      <Fragment>
        <ThemeProvider theme={this.state.isDarkMode ? MUI_theme_dark : MUI_theme_light}>
          <CssBaseline />
          {
            (this.props.auth.token && this.props.auth.isAuth) ?
              <Fragment>
                <Navbar />
              </Fragment>
              : null
          }

          <Fragment>
            <Container style=
              {
                // (initialMUIState.minWidth.first < WindowWidth) ?
                this.state.isSideNavOpen ?
                MUI_st__Container_SideNav :
                MUI_st__Container_FlatNav
              }>
              {/* <Button variant="contained" color="primary" >
                  tes
                  </Button> */}

              <Router>
                <BaseRouter />
              </Router>
            </Container>
          </Fragment>
        </ThemeProvider>
      </Fragment >
    )
  }
}
const mapStateToProps = state => ({
  auth: state.Auth,
})
export default connect(mapStateToProps, {})(App)
