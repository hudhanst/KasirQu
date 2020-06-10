import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { LoadTabelBarang } from '../../../Store/Actions/Barang.Actions'

import { Table, TableHead, TableRow, TableCell, TableBody, } from '@material-ui/core'

import { withTheme } from '@material-ui/core/styles'

import { Short_Column_INT, Short_Column_STR } from '../Shorting'
import MoneyFormater from '../MoneyFormater'

class TabelBarang extends React.Component {
  ButtonShortSTR(ColumnNumb) {
    Short_Column_STR('tabel_data_barang', ColumnNumb)
  }
  ButtonShortINT(ColumnNumb) {
    Short_Column_INT('tabel_data_barang', ColumnNumb)
  }
  ConverNumberToMoneyFormat(OriginValue) {
    const MoneyFormate = MoneyFormater(OriginValue)
    return MoneyFormate
  }
  render() {
    const theme = this.props.theme
    const { Table_Barang } = this.props
    const st_tablehead = {
      ...theme.customTheme.tablehead,
    }
    // console.log(Table_Barang)
    return (
      <Fragment>
        <Table aria-label="customized table" id='tabel_data_barang'>
          <TableHead style={st_tablehead}>
            <TableRow>
              <TableCell align="left" onClick={() => this.ButtonShortINT(0)}>No</TableCell>
              <TableCell align="left" onClick={() => this.ButtonShortINT(1)}>Barcode</TableCell>
              <TableCell align="left" onClick={() => this.ButtonShortSTR(2)}>Nama Barang</TableCell>
              <TableCell align="left" onClick={() => this.ButtonShortSTR(3)}>Jenis Barang</TableCell>
              <TableCell align="left" onClick={() => this.ButtonShortINT(4)}>Stok Barang</TableCell>
              {/* <TableCell align="right" onClick={() => this.ButtonShortINT(5)}>Modal&nbsp;(Rp)</TableCell> */}
              <TableCell align="right" onClick={() => this.ButtonShortSTR(5)}>Modal&nbsp;(Rp)</TableCell>
              {/* <TableCell align="right" onClick={() => this.ButtonShortINT(6)}>Harga Jual&nbsp;(Rp)</TableCell> */}
              <TableCell align="right" onClick={() => this.ButtonShortSTR(6)}>Harga Jual&nbsp;(Rp)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Table_Barang.map((Barang, index) => (
              <TableRow key={index + 1}
              hover={true}
                // style={index % 2 === 1 ? st_tablehead : null}
              >
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="left">{Barang.Barcode}</TableCell>
                <TableCell align="left">{Barang.NamaBarang}</TableCell>
                <TableCell align="left">{Barang.JenisBarang}</TableCell>
                <TableCell align="left">{Barang.StokBarang}</TableCell>
                {/* <TableCell align="right">{Barang.HargaJual}</TableCell> */}
                <TableCell align="right">{this.ConverNumberToMoneyFormat(Barang.HargaJual)}</TableCell>
                {/* <TableCell align="right">{Barang.HargaBeli}</TableCell> */}
                <TableCell align="right">{this.ConverNumberToMoneyFormat(Barang.HargaBeli)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  User: state.Auth.User,
  isBarangLoading: state.Barang.isBarangLoading,
  Table_Barang: state.Barang.Table_Barang,
})

export default connect(mapStateToProps, { LoadTabelBarang })(withTheme(TabelBarang))