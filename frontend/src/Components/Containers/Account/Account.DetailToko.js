import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Typography } from '@material-ui/core'

class DetailToko extends React.Component {
    render() {
        const today = new Date();
        return (
            <Fragment>
                <Typography>
                    UserName&emsp;&emsp; : asd
                    </Typography>
                <Typography>
                    {/* Tanggal &emsp;&emsp;&emsp; : {`${today.getDate()}/${(today.getMonth() + 1)}/${today.getFullYear()} | ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`} */}
                        Tanggal &emsp;&emsp;&emsp; : {`${today.getDate()}/${(today.getMonth() + 1)}/${today.getFullYear()}`}
                </Typography>
            </Fragment>
        )
    }
}

export default connect(null, {})(DetailToko)