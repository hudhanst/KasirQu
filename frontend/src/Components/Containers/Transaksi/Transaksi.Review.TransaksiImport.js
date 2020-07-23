import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Import_Transaksi } from '../../../Store/Actions/Transaksi.Actions'
import { Create_Error_Messages } from '../../../Store/Actions/Messages.Actions'

import { Table, TableHead, TableBody, TableRow, TableCell, FormGroup, FormControlLabel, Checkbox, Button } from '@material-ui/core'

import { MUI_VerticalMargin, MUI_FullWidth } from '../../../MUI_theme'

import { DataTidakDitemukan } from '../Page404'

class ReviewTransaksiImport extends React.Component {
    state = {
        FileData: [],
        Confirm: false,
        isProblemInData: false,
    }
    componentDidUpdate(prevProps) {
        if (this.props.TransaksiImportFile !== prevProps.TransaksiImportFile) {
            const { TransaksiImportFile } = this.props
            const FirstSheet = Object.values(TransaksiImportFile)[0]
            this.setState({ FileData: FirstSheet ? JSON.parse(FirstSheet) : [] })
        }
    }
    CheckBox_OnChange = E => {
        this.setState({ [E.target.name]: !this.state[E.target.name] })
    }
    Form_OnSubmit = E => {
        E.preventDefault()
        const { isProblemInData, FileData } = this.state
        const { User } = this.props
        const authdata = {
            isKasir: User.isKasir,
            isAdmin: User.isAdmin,
            isSuperUser: User.isSuperUser,
        }
        if (isProblemInData === true) {
            this.props.Create_Error_Messages(null, 'ada kesalahan pada data yang dimasukkan')
        } else {
            this.props.Import_Transaksi(FileData, authdata)
        }
    }
    render() {
        const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth }

        const {
            FileData,
            Confirm,
            isProblemInData,
        } = this.state
        ////// for CheckisDataCorrect
        const FirstFileData = FileData[0]
        const FileDataKeys = FirstFileData ? Object.keys(FirstFileData) : null
        ////// function
        const CheckisDataCorrect = (Data, DataKeys) => {
            try {
                if (Data.length > 0 && DataKeys.length > 0) {
                    const DataKeys_NamaKasir = DataKeys.find(item => item === 'NamaKasir')
                    const DataKeys_Tipe = DataKeys.find(item => item === 'Tipe')
                    const DataKeys_DetailTransaksi = DataKeys.find(item => item === 'DetailTransaksi')
                    const DataKeys_TotalPembayaran = DataKeys.find(item => item === 'TotalPembayaran')
                    if (!DataKeys_NamaKasir || !DataKeys_Tipe || !DataKeys_DetailTransaksi || !DataKeys_TotalPembayaran) {
                        return false
                    }
                    else {
                        return true
                    }
                } else {
                    return false
                }
            } catch (err) {
                console.log(err)
                return false
            }
        }

        const isDataCorrect = CheckisDataCorrect(FileData, FileDataKeys)
        return (
            <Fragment>
                {isDataCorrect ? (
                    <Fragment>
                        <Table id='tabel_review_Import_Transaksi'>
                            <TableHead >
                                <TableRow>
                                    <TableCell align="center">No</TableCell>
                                    {FileDataKeys.map((item) => (
                                        <TableCell align="center" key={item}>{item}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {FileData.map((item, index) => (
                                    <TableRow hover key={index}>
                                        <TableCell align="center" >{index + 1}</TableCell>
                                        {Object.keys(item).map((itemitem, indexindex) => (
                                            <TableCell align="left" key={`${index}${indexindex}`}>
                                                {
                                                    (typeof item[itemitem] === 'object' && item[itemitem] !== null) ? JSON.stringify(item[itemitem]) : item[itemitem]
                                                }
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <form onSubmit={this.Form_OnSubmit}>
                            <FormGroup row>
                                <FormControlLabel
                                    control={<Checkbox color='primary' onChange={this.CheckBox_OnChange} name="Confirm" value={Confirm} />}
                                    label="Saya Sudah Yakin Tidak Ada yang Salah Pada Data diatas"
                                />
                            </FormGroup>
                            <Button type='submit' style={st_textfield} size="large" variant='contained' color='primary'
                                disabled={
                                    ((isDataCorrect === true)
                                        && (Confirm === true)
                                        && (isProblemInData === false)
                                    ) ? false : true}
                            >
                                Cek
                            </Button>
                        </form>
                    </Fragment>
                ) : <DataTidakDitemukan />}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    User: state.Auth.User,
    TransaksiImportFile: state.Transaksi.TransaksiImportFile,
})
export default connect(mapStateToProps, { Import_Transaksi, Create_Error_Messages })(ReviewTransaksiImport)