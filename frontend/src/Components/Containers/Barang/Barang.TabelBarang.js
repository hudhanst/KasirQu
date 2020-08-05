import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Load_Barang_List } from '../../../Store/Actions/Barang.Actions'

import { Table, TableHead, TableRow, TableCell, TableBody, } from '@material-ui/core'

import { withTheme } from '@material-ui/core/styles'

import { Short_Column_INT, Short_Column_STR, Short_Column_Money } from '../Shorting'
import { ConvertInttoMoney } from '../Formater'
import { DataTidakDitemukan } from '../Page404'

class TabelBarang extends React.Component {
  componentDidMount() {
    this.props.Load_Barang_List()
  }
  ButtonShortSTR(ColumnNumb) {
    Short_Column_STR('tabel_data_barang', ColumnNumb)
  }
  ButtonShortINT(ColumnNumb) {
    Short_Column_INT('tabel_data_barang', ColumnNumb)
  }
  ButtonShortMoney(ColumnNumb) {
    Short_Column_Money('tabel_data_barang', ColumnNumb)
  }
  ConverNumberToMoneyFormat(OriginValue) {
    const MoneyFormate = ConvertInttoMoney(OriginValue ? OriginValue : 0)
    return MoneyFormate
  }
  render() {
    const theme = this.props.theme
    const data = this.props.BarangList
    const st_tablehead = {
      ...theme.customTheme.tablehead,
    }
    return (
      <Fragment>
        {data ?
          (<Table aria-label="customized table" id='tabel_data_barang'>
            <TableHead style={st_tablehead}>
              <TableRow>
                <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(0)}>No</TableCell>
                <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(1)}>Barcode</TableCell>
                <TableCell style={{ width: '40%' }} align="center" onClick={() => this.ButtonShortSTR(2)}>Nama Barang</TableCell>
                <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortSTR(3)}>Jenis Barang</TableCell>
                <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(4)}>Stok Barang</TableCell>
                <TableCell style={{ width: '15%' }} align="center" onClick={() => this.ButtonShortMoney(5)}>Harga Jual&nbsp;(Rp)</TableCell>
                {/* <TableCell style={{ width: '15%' }} align="right" onClick={() => this.ButtonShortSTR(6)}>Modal&nbsp;(Rp)</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow hover key={index + 1}
                // style={index % 2 === 1 ? st_tablehead : null}
                >
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell align="left">{item.Barcode}</TableCell>
                  <TableCell align="left">{item.Name}</TableCell>
                  <TableCell align="left">{item.Jenis}</TableCell>
                  <TableCell align="right">{item.Stok}</TableCell>
                  <TableCell align="right">{this.ConverNumberToMoneyFormat(item.HargaJual)}</TableCell>
                  {/* <TableCell align="right">{this.ConverNumberToMoneyFormat(item.HargaModal)}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>)
          : <DataTidakDitemukan />
        }
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  // User: state.Auth.User,
  // isBarangLoading: state.Barang.isBarangLoading,
  BarangList: state.Barang.BarangList,
})

export default connect(mapStateToProps, { Load_Barang_List })(withTheme(TabelBarang))