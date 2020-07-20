import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Load_Barang_List, Import_Barang } from '../../../Store/Actions/Barang.Actions'
import { Load_JenisBarang_List, } from '../../../Store/Actions/JenisBarang.Actions'
import { Create_Error_Messages } from '../../../Store/Actions/Messages.Actions'

import { Table, TableHead, TableBody, TableRow, TableCell, FormGroup, FormControlLabel, Checkbox, Button } from '@material-ui/core'

import { MUI_VerticalMargin, MUI_FullWidth } from '../../../MUI_theme'

import { DataTidakDitemukan } from '../Page404'

class ReviewBarangImport extends React.Component {
    state = {
        FileData: [],
        Confirm: false,
        isProblemInData: false,
    }
    componentDidMount() {
        this.props.Load_Barang_List()
        this.props.Load_JenisBarang_List()
    }
    componentDidUpdate(prevProps) {
        if (this.props.BarangImportFile !== prevProps.BarangImportFile) {
            const { BarangImportFile } = this.props
            const FirstSheet = Object.values(BarangImportFile)[0]
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
            this.props.Import_Barang(FileData, authdata)
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
        ////// for isProblemInDataExist
        const JenisBarangList = this.props.JenisBarangList
        const JenisBarangList_NamaJenisBarang = JenisBarangList.length > 0 ? JenisBarangList.map((item) => item.NamaJenisBarang) : []
        const BarangList = this.props.BarangList
        const BarangList_Barcode = BarangList.length > 0 ? BarangList.map((item) => item.Barcode) : []
        const BarangList_Name = BarangList.length > 0 ? BarangList.map((item) => item.Name) : []
        ////// function
        const CheckisDataCorrect = (Data, DataKeys) => {
            try {
                if (Data.length > 0 && DataKeys.length > 0) {
                    const DataKeys_Barcode = DataKeys.find(item => item === 'Barcode')
                    const DataKeys_Name = DataKeys.find(item => item === 'Name')
                    const DataKeys_Jenis = DataKeys.find(item => item === 'Jenis')
                    if (!DataKeys_Barcode || !DataKeys_Name || !DataKeys_Jenis) {
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
        const isDataAlreadyExist = (newData, ListofData) => {
            try {
                if (newData) {
                    const newDataIndex = ListofData.findIndex(listofdata => listofdata === newData.toString().toLocaleLowerCase())
                    if (newDataIndex >= 0) {
                        // if (this.state.isProblemInData === false) {
                        //     console.log('maslaah')
                        //     this.setState({ isProblemInData: true })
                        // }
                        return true
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            } catch (err) {
                console.log(err)
                return false
            }
        }
        const isDataWrong = (newData, ListOfCorrectData) => {
            try {
                if (newData) {
                    const newDataIndex = ListOfCorrectData.findIndex(listofcorrectdata => listofcorrectdata === newData)
                    if (newDataIndex >= 0) {
                        return false
                    } else {
                        // if (this.state.isProblemInData === false) {
                        //     this.setState({ isProblemInData: true })
                        // }
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
                        <Table id='tabel_review_import_barang' >
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
                                    <TableRow hover key={index}
                                    style={
                                        (
                                            ////// chek for big error
                                            isDataAlreadyExist(item.Barcode ? item.Barcode.toString().toLocaleLowerCase() : null, BarangList_Barcode)
                                            || isDataAlreadyExist(item.Name ? item.Name.toString().toLocaleLowerCase() : null, BarangList_Name)
                                            || isDataWrong(item.Jenis ? item.Jenis.toString().toLocaleLowerCase() : null, JenisBarangList_NamaJenisBarang)
                                        ) ? { backgroundColor: 'red' } : ((
                                            ////// chek for warning
                                            (item.Stok ? (item.Stok > 0 ? true : false) : null)
                                            || (item.HargaModal ? (item.HargaModal > 0 ? true : false) : null)
                                            || (item.HargaJual ? (item.HargaJual > 0 ? true : false) : null)
                                            || (item.SatuanJual ? true : false)
                                        ) ? { backgroundColor: 'yellow' } : null)
                                    }
                                    >
                                        <TableCell align="center" >{index + 1}</TableCell>
                                        {Object.keys(item).map((itemitem, indexindex) => (
                                            <TableCell align="center" key={`${index}${indexindex}`} >
                                                {
                                                    (typeof item[itemitem] === 'object' && item[itemitem] !== null) ? JSON.stringify(item[itemitem]) :
                                                        ((typeof item[itemitem] === 'boolean') ? (
                                                            (item[itemitem] === 'boolean') ? "Desimal" : "NonDesimal"
                                                        ) : item[itemitem])
                                                }
                                                {/* {console.log(typeof item[itemitem])} */}
                                                {/* {item[itemitem]} */}
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
    BarangImportFile: state.Barang.BarangImportFile,
    BarangList: state.Barang.BarangList,
    JenisBarangList: state.JenisBarang.JenisBarangList,
})
export default connect(mapStateToProps, { Load_Barang_List, Load_JenisBarang_List, Import_Barang, Create_Error_Messages })(ReviewBarangImport)