import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Load_Graph_IntensitasBarangTransaksi_List } from '../../../Store/Actions/Help.Actions'
import { get_BarangId_Detail } from '../../../Store/Actions/Barang.Actions'

import { Short_Column_INT, Short_Column_STR } from '../Shorting'

import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

import { MUI_HorizontalMargin, MUI_VerticalMargin } from '../../../MUI_theme'

import { DataTidakDitemukan } from '../Page404'
import Charting from '../Charting'

class IntensitasBarangTransaksiGraph extends React.Component {
    componentDidMount() {
        this.props.Load_Graph_IntensitasBarangTransaksi_List()
    }
    ButtonShortSTR(TableName, ColumnNumb) {
        Short_Column_STR(TableName, ColumnNumb)
    }
    ButtonShortINT(TableName, ColumnNumb) {
        Short_Column_INT(TableName, ColumnNumb)
    }
    onClick_get_BarangId_Detail(BarangID) {
        this.props.get_BarangId_Detail(BarangID)
    }
    RandomColor() {
        const letters = '0123456789ABCDEF'
        let color = '#'
        let i = 0
        while (i < 6) {
            color += letters[Math.floor(Math.random() * 16)]
            i = i + 1
        }
        return color
    }
    render() {
        ////// data
        const data = this.props.GraphIntensitasBarangTransaksiList
        ////// graphdata
        const GraphData = (Dataset) => {
            // console.log('Log: IntensitasBarangTransaksiGraph -> GraphData -> Dataset', Dataset)
            try {
                if (!Dataset) {
                    throw new Error(
                        'Dataset tidak ada'
                    )
                }

                const DataGraph = {}
                const GraphLabels = []
                const GraphData = []
                let i = 0
                Dataset.forEach(element => {
                    const Dataset_Tanggal = element.Tanggal
                    const ExistTanggal = GraphLabels.find(item => item === Dataset_Tanggal)
                    if (!ExistTanggal) {
                        GraphLabels.push(Dataset_Tanggal)
                    }

                    const Dataset_IntensitasBarangTransaksi = element.IntensitasBarangTransaksi ? element.IntensitasBarangTransaksi : []
                    if (Dataset_IntensitasBarangTransaksi.length === 0) {
                        let j = 0
                        while (j < GraphData.length) {
                            GraphData[j].data.push(0)
                            j = j + 1
                        }
                    } else {
                        const ExistBarangList = []
                        Dataset_IntensitasBarangTransaksi.forEach(element_element => {
                            const Dataset_Barcode = element_element.Barcode
                            const InedexBarang = GraphData.findIndex(item => item.label === Dataset_Barcode)
                            if (InedexBarang >= 0) {
                                // console.log('InedexBarang', InedexBarang)
                                ExistBarangList.push(InedexBarang)
                                const IntensitasBarangTransaksi_IntensitasBarangTransaksi = element_element.IntensitasBarangTransaksi
                                GraphData[InedexBarang].data.push(IntensitasBarangTransaksi_IntensitasBarangTransaksi)
                            } else {
                                const newGraphData_data = []
                                const InedexBarang = GraphData.length 
                                ExistBarangList.push(InedexBarang)
                                let k = 0
                                while (k < i) {
                                    newGraphData_data.push(0)
                                    k = k + 1
                                }
                                const IntensitasBarangTransaksi_IntensitasBarangTransaksi = element_element.IntensitasBarangTransaksi
                                const newColor = this.RandomColor()
                                newGraphData_data.push(IntensitasBarangTransaksi_IntensitasBarangTransaksi)
                                const newGraphData = {
                                    label: Dataset_Barcode,
                                    data: newGraphData_data,
                                    backgroundColor: newColor,
                                    fill: false,
                                    borderColor: newColor,
                                }
                                GraphData.push(newGraphData)
                            }
                        })

                        let l = 0
                        // console.log(Dataset_Tanggal)
                        // console.log('length', ExistBarangList.length)
                        // console.log('ExistBarangList', ExistBarangList)
                        while (l < GraphData.length) {
                            const IndexExistBarangList = ExistBarangList.includes(l)
                            // console.log(IndexExistBarangList)
                            if (!IndexExistBarangList) {
                                GraphData[l].data.push(0)
                            }
                            l = l + 1
                        }
                    }
                    i = i + 1
                })

                // console.log('Log: IntensitasBarangTransaksiGraph -> GraphData -> GraphData', GraphData)
                Object.assign(DataGraph, { datasets: GraphData })
                Object.assign(DataGraph, { labels: GraphLabels })
                // console.log('Log: IntensitasBarangTransaksiGraph -> GraphData -> DataGraph', DataGraph)
                return DataGraph
            } catch (err) {
                console.log('Log: IntensitasBarangTransaksiGraph -> GraphData -> err', err)
            }
        }

        return (
            <Fragment>
                {
                    (data && data.length > 0) ? (
                        <Fragment>
                            <Charting
                                canvasstyle={{ ...MUI_HorizontalMargin, ...MUI_VerticalMargin, width: '800px', height: '300px', padding: '10px' }}
                                type='line'
                                data={GraphData(data)}
                            />

                            <Table id='table_graph_intensibarangtastransaksi'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT('table_graph_intensibarangtastransaksi', 0)}>No</TableCell>
                                        <TableCell style={{ width: '15%' }} align="center" onClick={() => this.ButtonShortSTR('table_graph_intensibarangtastransaksi', 1)}>Tanggal</TableCell>
                                        <TableCell style={{ width: '70%' }} align="center" >Intensitas Barang Transaksi</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((item, index) => (
                                        <TableRow hover key={index}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="left">{item.Tanggal}</TableCell>
                                            <TableCell align="right">
                                                {item.IntensitasBarangTransaksi.length > 0 ? (
                                                    <Fragment>
                                                        <Table id={`table_graph_barangtransaksiharian_${index}`}>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell style={{ width: '5%' }} align="center" onClick={() => this.ButtonShortINT(`table_graph_barangtransaksiharian_${index}`, 0)}>No</TableCell>
                                                                    <TableCell style={{ width: '15%' }} align="center" onClick={() => this.ButtonShortSTR(`table_graph_barangtransaksiharian_${index}`, 1)}>Barcode</TableCell>
                                                                    <TableCell style={{ width: '15%' }} align="center" onClick={() => this.ButtonShortSTR(`table_graph_barangtransaksiharian_${index}`, 2)}>NamaBarang</TableCell>
                                                                    <TableCell style={{ width: '10%' }} align="center" onClick={() => this.ButtonShortINT(`table_graph_barangtransaksiharian_${index}`, 3)}>Intensitas Barang Harian</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {item.IntensitasBarangTransaksi.map((item_item, index_index) => (
                                                                    <TableRow hover key={index_index}>
                                                                        <TableCell align="center">{index_index + 1}</TableCell>
                                                                        <TableCell align="left">{item_item.Barcode}</TableCell>
                                                                        <TableCell align="left">{item_item.NamaBarang}</TableCell>
                                                                        <TableCell align="right">{item_item.IntensitasBarangTransaksi}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </Fragment>
                                                ) : ''}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Fragment>
                    ) : <DataTidakDitemukan />
                }
            </Fragment >
        )
    }
}

const mapStateToProps = (state) => ({
    isHelpLoading: state.Help.isHelpLoading,
    GraphIntensitasBarangTransaksiList: state.Help.GraphIntensitasBarangTransaksiList,
})

export default connect(mapStateToProps, { Load_Graph_IntensitasBarangTransaksi_List, get_BarangId_Detail })(IntensitasBarangTransaksiGraph)