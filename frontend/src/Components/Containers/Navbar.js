import React, { Fragment } from 'react'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import { initialMUIState } from '../../MUI_theme'

import NavSideNavbar from './navSideNavbar'
import NavFlatNavbar from './navFlatNavbar'

const Navbar = (props) => {
  const MinWindowWidth = useMediaQuery(`(min-width:${initialMUIState.units.minWidth_first}px)`)
  // const MinWindowWidth = true
  // console.log(props.isDarkMode)
  return (
    <Fragment>
      {
        MinWindowWidth ?
          <NavSideNavbar isDarkMode={props.isDarkMode} /> :
          <NavFlatNavbar isDarkMode={props.isDarkMode} />
      }
    </Fragment>
  )
}

export default Navbar