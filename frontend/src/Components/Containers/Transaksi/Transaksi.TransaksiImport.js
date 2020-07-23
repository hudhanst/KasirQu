import React, { Fragment } from 'react'

import XLSX from 'xlsx'

import { connect } from 'react-redux'

import ReviewTransaksiImport from './Transaksi.Review.TransaksiImport'

import { Cek_Import_Transaksi } from '../../../Store/Actions/Transaksi.Actions'

import { DropzoneArea } from 'material-ui-dropzone'

import GenericModals from '../GenericModals'

import { MUI_VerticalMargin, MUI_FullWidth } from '../../../MUI_theme'

class TransaksiImport extends React.Component {
    state = {
        MaxFileSize: 1000000 * 50,
        ExcelData: null,
    }
    excelToJson(reader) {
        const fileData = reader.result
        const wb = XLSX.read(fileData, { type: 'binary' })
        const data = {}
        wb.SheetNames.forEach((sheetName) => {
            const rowObj = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName])
            const rowString = JSON.stringify(rowObj)
            data[sheetName] = rowString
        })
        this.setState({ ExcelData: data })
    }

    loadFileXLSX(files) {
        if (files.length > 0) {
            try {
                const reader = new FileReader()
                reader.onload = this.excelToJson.bind(this, reader)
                reader.readAsBinaryString(files[0])
            } catch (err) {
                console.log(err)
            }
        }
    }

    Form_OnSubmit = E => {
        E.preventDefault()
        const { ExcelData } = this.state
        this.props.Cek_Import_Transaksi(ExcelData)
    }

    render() {
        const st_textfield = { ...MUI_VerticalMargin, ...MUI_FullWidth }

        const {
            MaxFileSize,
            ExcelData,
        } = this.state

        return (
            <Fragment>
                <form onSubmit={this.Form_OnSubmit}>
                    <DropzoneArea
                        filesLimit={1}
                        showPreviewsInDropzone={true}
                        showFileNames={true}
                        maxFileSize={MaxFileSize}
                        acceptedFiles={['.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel']}
                        dropzoneText={"Masukkan atau Pilih File excel/sejenisnya untuk Import Transaksi"}
                        onChange={(files) => this.loadFileXLSX(files)}
                    />
                    <GenericModals
                        size='xl'
                        uncontrollsize={true}
                        header='Review Import Transaksi'
                        body={<ReviewTransaksiImport />}
                        Buttontype='submit'
                        Buttonstyle={st_textfield}
                        Buttonsize='large'
                        Buttonvariant='contained'
                        Buttoncolor='primary'
                        Buttondisabled={ExcelData ? false : true}
                        ButtononClickeven={() => null}
                        Buttonlabel={'Cek'}
                    />
                </form>
            </Fragment >
        )
    }
}

export default connect(null, { Cek_Import_Transaksi })(TransaksiImport)