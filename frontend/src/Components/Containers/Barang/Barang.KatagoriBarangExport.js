import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Export_KatagoriBarang } from '../../../Store/Actions/JenisBarang.Actions'

import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@material-ui/core'
import { MUI_VerticalMargin, MUI_FullWidth } from '../../../MUI_theme'

import { Short_Column_INT, Short_Column_STR } from '../Shorting'

import { DataTidakDitemukan } from '../Page404'

class KatagoriBarangExport extends React.Component {
    state = {
        ExportJenisBarangList: []
    }
    componentDidUpdate(prevProps) {
        if (this.props.ExportJenisBarangList !== prevProps.ExportJenisBarangList) {
            const { ExportJenisBarangList } = this.props
            this.setState({ ExportJenisBarangList: ExportJenisBarangList })
        }
    }
    ButtonShortSTR(ColumnNumb) {
        Short_Column_STR('tabel_export_jenisbarang', ColumnNumb)
    }
    ButtonShortINT(ColumnNumb) {
        Short_Column_INT('tabel_export_jenisbarang', ColumnNumb)
    }
    Form_OnSubmit = E => {
        E.preventDefault()
        const ExportJenisBarangList = this.state.ExportJenisBarangList
        const { User } = this.props
        const authdata = {
            isKasir: User.isKasir,
            isAdmin: User.isAdmin,
            isSuperUser: User.isSuperUser,
        }

        this.props.Export_KatagoriBarang(ExportJenisBarangList, authdata)
    }
    render() {
        const {
            ExportJenisBarangList,
        } = this.state
        const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth }
        const data = ExportJenisBarangList
        return (
            <Fragment>
                {(data && data.length > 0) ?
                    <Fragment>
                        <Table id='tabel_export_jenisbarang'>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: '5%' }} align='center' onClick={() => this.ButtonShortINT(0)}>No</TableCell>
                                    <TableCell style={{ width: '45%' }} align='center' onClick={() => this.ButtonShortSTR(1)}>Nama Jenis Barang</TableCell>
                                    <TableCell style={{ width: '10%' }} align='center' onClick={() => this.ButtonShortSTR(2)}>Tipe Kepemilikan</TableCell>
                                    {/* <TableCell style={{ width: '30%' }} align='center' onClick={() => this.ButtonShortSTR(3)}>Keterangan</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item, index) => (
                                    <TableRow hover key={index + 1}>
                                        <TableCell align='center'>{index + 1}</TableCell>
                                        <TableCell align='left'>{item.NamaJenisBarang}</TableCell>
                                        <TableCell align='left'>{item.Kepemilikan}</TableCell>
                                        {/* <TableCell align='left'>{item.Ket}</TableCell> */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <form onSubmit={this.Form_OnSubmit}>
                            <Button type='submit' style={st_textfield} size="large" variant='contained' color='primary' >Export</Button>
                        </form>
                    </Fragment>
                    :
                    <DataTidakDitemukan />
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    User: state.Auth.User,
    ExportJenisBarangList: state.JenisBarang.ExportJenisBarangList,
})

export default connect(mapStateToProps, { Export_KatagoriBarang })(KatagoriBarangExport)