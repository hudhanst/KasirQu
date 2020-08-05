import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { get_TokoDetail } from '../../../Store/Actions/Account.Actions'

import { Typography, Grid, Paper } from '@material-ui/core'

class DetailToko extends React.Component {
    componentDidMount() {
        this.props.get_TokoDetail()
    }
    render() {
        const today = new Date();
        const Gridstyle = { width: '50%' }
        const Paperstyle = { padding: '10px', margin: '10px' }
        const User = this.props.User
        const TokoDetail = this.props.TokoDetail
        return (
            <Fragment>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Grid container spacing={1} justify="flex-start" alignItems="center">
                            <Grid item style={{ ...Gridstyle }} >
                                <Paper style={{ ...Paperstyle }} >
                                    <Typography>
                                        Nama Toko &emsp; : {TokoDetail?.NamaToko ? TokoDetail.NamaToko : ''}
                                    </Typography>
                                    <Typography>
                                        Alamat Toko &emsp;: {TokoDetail?.Alamat ? TokoDetail.Alamat : ''}
                                    </Typography>
                                    <Typography>
                                        Kontak Toko &emsp;: {TokoDetail?.Kontak ? TokoDetail.Kontak : ''}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item style={{ ...Gridstyle }} >
                                <Paper style={{ ...Paperstyle }} >
                                    <Typography>
                                        UserName&emsp;&emsp; : {User?.UserName ? User.UserName : ''}
                                    </Typography>
                                    <Typography>
                                        Tanggal &emsp;&emsp;&emsp; : {`${today.getDate()}/${(today.getMonth() + 1)}/${today.getFullYear()}`}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    User: state.Auth.User,
    TokoDetail: state.Account.TokoDetail,
})

export default connect(mapStateToProps, { get_TokoDetail })(DetailToko)