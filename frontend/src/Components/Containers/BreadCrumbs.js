import React, { Fragment } from 'react'

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';

export const BreadCrumbs = (props) => {
    return (
        <Fragment>
            <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                <Link href='/' underline='hover' >
                    <Typography color="textPrimary" >
                        <HomeIcon />
                    </Typography>
                </Link>
                {props.breadcrumbs.map((breadcrumb, index) => (
                    <Link href={`/${breadcrumb.link}`} underline='hover' key={index} >
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