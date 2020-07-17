import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Load_JenisBarang_List, Import_KatagoriBarang } from '../../../Store/Actions/JenisBarang.Actions'
import { Create_Error_Messages } from '../../../Store/Actions/Messages.Actions'

import { Table, TableHead, TableBody, TableRow, TableCell, FormGroup, FormControlLabel, Checkbox, Button } from '@material-ui/core'

import { MUI_VerticalMargin, MUI_FullWidth } from '../../../MUI_theme'

import { DataTidakDitemukan } from '../Page404'

class ReviewKatagoriBarangImport extends React.Component {
    state = {
        FileData: [],
        Confirm: false,
        isProblemInData: false,
    }
    componentDidMount() {
        this.props.Load_JenisBarang_List()
    }
    componentDidUpdate(prevProps) {
        if (this.props.KatagoriBarangImportFile !== prevProps.KatagoriBarangImportFile) {
            const { KatagoriBarangImportFile } = this.props
            const FirstSheet = Object.values(KatagoriBarangImportFile)[0]
            // console.log('FirstSheet', FirstSheet)
            // this.setState({ FileData: KatagoriBarangImportFile })
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
            this.props.Import_KatagoriBarang(FileData, authdata)
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
        const ListKepemilikan = ['pribadi', 'nonpribadi']
        ////// function
        const CheckisDataCorrect = (Data, DataKeys) => {
            try {
                if (Data.length > 0 && DataKeys.length > 0) {
                    const NamaJenisBarangIndex = DataKeys.findIndex(datakeys => datakeys === 'NamaJenisBarang')
                    const KepemilikanIndex = DataKeys.findIndex(datakeys => datakeys === 'Kepemilikan')
                    if (NamaJenisBarangIndex < 0 || KepemilikanIndex < 0) {
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
                        <Table id='tabel_review_import_katagoribarang'>
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
                                            (isDataAlreadyExist(item.NamaJenisBarang ? item.NamaJenisBarang : null, JenisBarangList_NamaJenisBarang)
                                                || isDataWrong(item.Kepemilikan ? item.Kepemilikan : null, ListKepemilikan)
                                            ) ? { backgroundColor: 'red' } : null
                                        }
                                    >
                                        <TableCell align="center" >{index + 1}</TableCell>
                                        {Object.keys(item).map((itemitem, indexindex) => (
                                            <TableCell align="center" key={`${index}${indexindex}`} >{item[itemitem]}</TableCell>
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
    KatagoriBarangImportFile: state.JenisBarang.KatagoriBarangImportFile,
    JenisBarangList: state.JenisBarang.JenisBarangList,
})
export default connect(mapStateToProps, { Load_JenisBarang_List, Import_KatagoriBarang, Create_Error_Messages })(ReviewKatagoriBarangImport)