import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Export_Transaksi } from '../../../Store/Actions/Transaksi.Actions'

import { Button } from '@material-ui/core'

import { MUI_VerticalMargin, MUI_FullWidth } from '../../../MUI_theme'

import ListTransaksi from './Transaksi.ListTransaksi'

class TransaksiExport extends React.Component {
    state = {
        ExportTransaksiList: []
    }
    componentDidUpdate(prevProps) {
        if (this.props.TransaksiList !== prevProps.TransaksiList) {
            const { TransaksiList } = this.props
            this.setState({ ExportTransaksiList: TransaksiList })
        }
    }
    Form_OnSubmit = E => {
        E.preventDefault()
        const ExportTransaksiList = this.state.ExportTransaksiList
        const { User } = this.props
        const authdata = {
            isKasir: User.isKasir,
            isAdmin: User.isAdmin,
            isSuperUser: User.isSuperUser,
        }

        this.props.Export_Transaksi(ExportTransaksiList, authdata)
    }
    render() {
        const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth }
        const {
            ExportTransaksiList
        } = this.state
        return (
            <Fragment>
                <ListTransaksi DisableLoad={true} />
                <form onSubmit={this.Form_OnSubmit}>
                    {((ExportTransaksiList) && (ExportTransaksiList.length > 0)) ?
                        < Button type='submit' style={st_textfield} size="large" variant='contained' color='primary' >
                            Export
                        </Button>
                        : null}
                </form>
            </Fragment >
        )
    }
}

const mapStateToProps = (state) => ({
    User: state.Auth.User,
    TransaksiList: state.Transaksi.TransaksiList,
})

export default connect(mapStateToProps, { Export_Transaksi })(TransaksiExport)