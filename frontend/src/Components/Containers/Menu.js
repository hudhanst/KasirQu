import React, { Fragment } from 'react'

import { List, ListItem, ListItemIcon, ListItemText, Collapse, Grid, Link, Paper } from '@material-ui/core'

import { useTheme } from "@material-ui/core/styles"
import { MUI_st_Menu_Paper } from '../../MUI_theme'

import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

export const Menu = (props) => {
    const User = props.User
    const theme = useTheme()
    const [open, setOpen] = React.useState(true)
    const handleClick = () => {
        setOpen(!open)
    }
    const st_paper = { ...MUI_st_Menu_Paper, ...theme.customTheme.menupaper }
    // console.log(MUI_st_Menu_Paper)
    return (
        <Fragment>
            <List>
                <ListItem button onClick={handleClick}>
                    <ListItemIcon>
                        {props.menu.menuheader.icon}
                    </ListItemIcon>
                    <ListItemText primary={props.menu.menuheader.name} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem>

                            <Fragment>
                                <Grid container spacing={2} >
                                    <Grid item xs={12}  >
                                        <Grid container spacing={5} justify="flex-start" alignItems="center">
                                            {props.menu.menuitems.map((menuitem, index) => (
                                                <Grid key={index} item  >
                                                    {User ? (((menuitem.type === 'SuperPrivacry') && (User.isSuperUser === true)) ? (
                                                        <Link href={`${menuitem.link}`} underline='none' >
                                                            <Paper style={st_paper} className='MenuPaperHover' >
                                                                {menuitem.icon}<br />
                                                                {menuitem.name}
                                                            </Paper>
                                                        </Link>
                                                    ) : (((menuitem.type === 'Privacry') && ((User.isSuperUser) || (User.isAdmin))) ? (
                                                        <Link href={`${menuitem.link}`} underline='none' >
                                                            <Paper style={st_paper} className='MenuPaperHover' >
                                                                {menuitem.icon}<br />
                                                                {menuitem.name}
                                                            </Paper>
                                                        </Link>
                                                    ) : ((menuitem.type === 'nonPrivacry') ? (
                                                        <Link href={`${menuitem.link}`} underline='none' >
                                                            <Paper style={st_paper} className='MenuPaperHover' >
                                                                {menuitem.icon}<br />
                                                                {menuitem.name}
                                                            </Paper>
                                                        </Link>
                                                    ) : null))
                                                    ) : null}

                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Fragment>

                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </Fragment>
    )
}

export default Menu