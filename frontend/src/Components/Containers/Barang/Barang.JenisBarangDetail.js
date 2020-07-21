import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { get_JenisBarangDetail } from '../../../Store/Actions/JenisBarang.Actions'

import { TextField } from '@material-ui/core'

import { withTheme } from '@material-ui/core/styles'
import { MUI_st_AccountDetail_TextField, MUI_VerticalMargin } from '../../../MUI_theme'

import { DataTidakDitemukan } from '../Page404'

class JenisBarangDetail extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.idDetailJenisBarang !== prevProps.idDetailJenisBarang) {
            const { idDetailJenisBarang } = this.props
            this.props.get_JenisBarangDetail(idDetailJenisBarang)
        }
    }
    componentDidMount() {
        const { idDetailJenisBarang } = this.props
        if (idDetailJenisBarang !== null) {
            this.props.get_JenisBarangDetail(idDetailJenisBarang)
        }
    }
    render() {
        const theme = this.props.theme
        const JenisBarangDetail = this.props.JenisBarangDetail

        const st_textfield = { ...MUI_VerticalMargin, ...MUI_st_AccountDetail_TextField, ...theme.customTheme.readonlytextfield }
        return (
            <Fragment>
                {JenisBarangDetail ?
                    <Fragment>
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Nama Jenis Barang' name='NamaJenisBarang' value={JenisBarangDetail.NamaJenisBarang} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Kepemilikan' name='Kepemilikan' value={JenisBarangDetail.Kepemilikan} />
                        <TextField style={st_textfield} variant='outlined' InputProps={{ readOnly: true, }} type='text' label='Keterangan' name='Ket' value={JenisBarangDetail.Ket ? JenisBarangDetail.Ket : ''} />
                    </Fragment>
                    : <DataTidakDitemukan />
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    idDetailJenisBarang: state.JenisBarang.idDetailJenisBarang,
    JenisBarangDetail: state.JenisBarang.JenisBarangDetail,
})

export default connect(mapStateToProps, { get_JenisBarangDetail })(withTheme(JenisBarangDetail))