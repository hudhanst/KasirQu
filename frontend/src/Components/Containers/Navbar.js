import React, { Fragment } from 'react'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import { initialMUIState } from '../../MUI_theme'

import NavSideNavbar from './navSideNavbar'
import NavFlatNavbar from './navFlatNavbar'

const Navbar = (props) => {
  const MinWindowWidth = useMediaQuery(`(min-width:${initialMUIState.units.minWidth_first}px)`)
  // const MinWindowWidth = true
  return (
    <Fragment>
      {
        MinWindowWidth ?
          <NavSideNavbar /> :
          <NavFlatNavbar />
      }
    </Fragment>
  )
}

export default Navbar