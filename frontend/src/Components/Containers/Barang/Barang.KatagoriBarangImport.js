import React, { Fragment } from 'react'

import XLSX from 'xlsx'

import { connect } from 'react-redux'

import ReviewKatagoriBarangImport from './Barang.Review.KatagoriBarangImport'

import { Cek_Import_KatagoriBarang } from '../../../Store/Actions/JenisBarang.Actions'

import { DropzoneArea } from 'material-ui-dropzone'

// import { Button } from '@material-ui/core'

import GenericModals from '../GenericModals'

import { MUI_VerticalMargin, MUI_FullWidth } from '../../../MUI_theme'

class ImportKatagoriBarang extends React.Component {
    state = {
        MaxFileSize: 1000000 * 50,
        // UploadFile: null,
        ExcelData: null,
    }
    excelToJson(reader) {
        const fileData = reader.result
        const wb = XLSX.read(fileData, { type: 'binary' })
        const data = {}
        wb.SheetNames.forEach(function (sheetName) {
            const rowObj = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName])
            const rowString = JSON.stringify(rowObj)
            data[sheetName] = rowString
        })
        this.setState({ ExcelData: data })
        // console.log('ExcelData', this.state.ExcelData)
    }

    loadFileXLSX(files) {
        // console.log('input',input.files[0])
        // console.log('files', files)
        if (files.length > 0) {
            try {
                // const input = event.target
                const reader = new FileReader()
                // console.log('reader',reader)
                reader.onload = this.excelToJson.bind(this, reader)
                // reader.readAsBinaryString(input.files[0])
                reader.readAsBinaryString(files[0])
            } catch (err) {
                console.log(err)
            }
        }
    }

    Form_OnSubmit = E => {
        E.preventDefault()
        // const { UploadFile } = this.state
        const { ExcelData } = this.state
        this.props.Cek_Import_KatagoriBarang(ExcelData)
    }

    render() {
        const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth }

        const {
            MaxFileSize,
            // UploadFile,
            ExcelData,
        } = this.state
        // const UploadFileSize = UploadFile ? UploadFile.size : 0
        // const UploadFileName = UploadFile ? UploadFile.name : null


        return (
            <Fragment>
                <form onSubmit={this.Form_OnSubmit}>
                    <DropzoneArea
                        filesLimit={1}
                        showPreviewsInDropzone={true}
                        showFileNames={true}
                        // showPreviews={true}
                        // showFileNamesInPreview={true}
                        maxFileSize={MaxFileSize}
                        acceptedFiles={['.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel']}
                        dropzoneText={"Masukkan atau Pilih File excel/sejenisnya untuk Import Jenis Barang"}
                        // onChange={(files) => console.log('Files:', files)}
                        // onChange={(files) => this.setState({ UploadFile: files[0] })}
                        // onChange={this.loadFileXLSX.bind(this)}
                        onChange={(files) => this.loadFileXLSX(files)}
                    // onChange={this.loadFileXLSX}
                    // onChange={this.Form_OnChange}
                    />
                    {/* <input type="file" onChange={this.loadFileXLSX.bind(this)} value={this.state.UploadFile} /> */}
                    <GenericModals
                        size='xl'
                        uncontrollsize={true}
                        header='Review Import Katagori Barang'
                        body={<ReviewKatagoriBarangImport />}
                        Buttontype='submit'
                        Buttonstyle={st_textfield}
                        Buttonsize='large'
                        Buttonvariant='contained'
                        Buttoncolor='primary'
                        // Buttondisabled={((UploadFileName) && (UploadFileSize < MaxFileSize)) ? false : true}
                        Buttondisabled={ExcelData ? false : true}
                        ButtononClickeven={() => null}
                        Buttonlabel={'Cek'}
                    />
                    {/* <Button type='submit' style={st_textfield} size="large" variant='contained' color='primary' disabled={((UploadFileName) && (UploadFileSize < MaxFileSize)) ? false : true} >Cek</Button> */}
                </form>
            </Fragment >
        )
    }
}

export default connect(null, { Cek_Import_KatagoriBarang })(ImportKatagoriBarang)