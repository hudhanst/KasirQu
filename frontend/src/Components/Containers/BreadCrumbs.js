import React, { Fragment } from 'react'

import { Breadcrumbs, Link, Typography } from '@material-ui/core'

import HomeIcon from '@material-ui/icons/Home'

export const BreadCrumbs = (props) => {
    return (
        <Fragment>
            <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                <Link href='#/' underline='hover' >
                    <Typography color="textPrimary" >
                        <HomeIcon />
                    </Typography>
                </Link>
                {props.breadcrumbs.map((breadcrumb, index) => (
                    <Link href={`#/${breadcrumb.link}`} underline='hover' key={index} >
                        <Typography color="textPrimary" >
                            {breadcrumb.name}
                        </Typography>
                    </Link>
                ))}
            </Breadcrumbs>
        </Fragment >
    )
}

export default BreadCrumbs