import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { LoadTabelBarang } from '../../../Store/Actions/Barang.Actions'
import { Add_Barang_To_Transaksi } from '../../../Store/Actions/Transaksi.Actions'

import { TextField, Button } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'


class AddBarangToTransaksi extends React.Component {
    state = {
        Data_Barang: this.props.Data_Barang,
        NamaBarang: null,
        Barcode: '',
    }
    componentDidMount() {
        this.props.LoadTabelBarang()
    }
    BarangonChange = (e, newNamaBarang) => {
        this.setState({ NamaBarang: newNamaBarang })
        // this.setState({ Barcode: null })
    }
    BarcodeonChange = (e, newBarcode) => {
        // e.prev
        this.setState({ Barcode: newBarcode })
        this.setState({ NamaBarang: null })
    }
    onSubmit = e => {
        e.preventDefault()
        const { Data_Barang, NamaBarang, Barcode, } = this.state
        console.log('NamaBarang', NamaBarang)
        console.log('Barcode', Barcode)
        if (NamaBarang.Barcode) {
            this.props.Add_Barang_To_Transaksi(NamaBarang)
            this.setState({
                NamaBarang: null,
                Barcode: '',
            })
        } else {
            Data_Barang.forEach((item, index) => {
                if (Barcode === item.Barcode) {
                    const BarcodeItem = item
                    this.props.Add_Barang_To_Transaksi(BarcodeItem)
                    this.setState({
                        NamaBarang: null,
                        Barcode: '',
                    })
                } else if ((index === (Data_Barang.length - 1)) && (Barcode !== Data_Barang[index])) {
                    console.log('warning')
                }
            })
        }
    }
    render() {
        // console.log(this.state)
        return (
            <Fragment>
                {/* <Fragment>
                    <div>
                        {`NamaBarang: ${this.state.NamaBarang !== null ? `'${this.state.NamaBarang}'` : 'null'}`}
                    </div>
                    <div>
                        {`Barcode: '${this.state.Barcode}'`}
                    </div>
                </Fragment> */}
                <Fragment>
                    <form onSubmit={this.onSubmit}>
                        <Autocomplete
                            freeSolo
                            disableClearable

                            options={this.state.Data_Barang}
                            getOptionLabel={(option) => option.NamaBarang}
                            groupBy={(option) => option.JenisBarang}

                            value={this.state.NamaBarang}
                            onChange={this.BarangonChange}

                            inputValue={this.state.Barcode}
                            onInputChange={this.BarcodeonChange}

                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Masukan Code Barcode atau Pilih Nama Barang"
                                    margin="normal"
                                    variant="outlined"
                                    style={{ width: '100%' }}
                                    InputProps={{ ...params.InputProps, type: 'search' }}
                                />
                            )}
                        />
                        <Button
                            type='submit'
                            variant="outlined"
                            color='primary'
                            size="large"
                            style={{ width: '100%' }}
                        >
                            Tambah
                            </Button>
                    </form>
                </Fragment>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    User: state.Auth.User,
    Data_Barang: state.Barang.Table_Barang,
})

export default connect(mapStateToProps, { LoadTabelBarang, Add_Barang_To_Transaksi })(AddBarangToTransaksi)