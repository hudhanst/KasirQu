const { Get_Transaksi_List } = require('./functions.Transaksi')
const { Get_Barang_List } = require('./functions.Barang')

////// GENERIC
////// END-GENERIC

////// NONGENERIC
exports.Report_Get_BarangList = async (TransaksiListQuery, TransaksiListSelect) => {
    ////// TransaksiListSelect = need ((DetailTransaksi Diskon PotonganHarga TotalPembayaran)|| null)
    ////// BarangListSelect = need ((Barcode HargaModal)|| null)
    try {
        const ReportList = []
        // const ReportData = []

        const ListTransaksi = await Get_Transaksi_List(
            TransaksiListQuery ? TransaksiListQuery : null,
            TransaksiListSelect ? TransaksiListSelect : null,
        )

        if (ListTransaksi.length > 0) {
            const ListBarang = await Get_Barang_List(null, 'Barcode Jenis HargaModal')
            ListTransaksi.forEach(listtransaksi => {

                // ////// create ReportData

                // // const ID = listtransaksi._id
                // const ListTransaksiDiskon = listtransaksi.Diskon ? listtransaksi.Diskon : 0
                // const ListTransaksiPotonganHarga = listtransaksi.PotonganHarga ? listtransaksi.PotonganHarga : 0
                // const ListTransaksiTotalPembayaran = listtransaksi.TotalPembayaran ? listtransaksi.TotalPembayaran : 0
                // if (ReportData.length > 0) {
                //     const ReportDataIndex = 0
                //     ReportData[ReportDataIndex].TotalDiskon = ReportData[ReportDataIndex].TotalDiskon + ListTransaksiDiskon
                //     ReportData[ReportDataIndex].TotalPotonganHarga = ReportData[ReportDataIndex].TotalPotonganHarga + ListTransaksiPotonganHarga
                //     ReportData[ReportDataIndex].TotalTotalPembayaran = ReportData[ReportDataIndex].TotalTotalPembayaran + ListTransaksiTotalPembayaran
                // } else {
                //     const newReportData = {
                //         TotalDiskon: ListTransaksiDiskon,
                //         TotalPotonganHarga: ListTransaksiPotonganHarga,
                //         TotalTotalPembayaran: ListTransaksiTotalPembayaran,
                //     }
                //     ReportData.push(newReportData)
                // }

                ////// create ReportList
                const ListTransaksiDetailTransaksi = listtransaksi.DetailTransaksi

                ListTransaksiDetailTransaksi.forEach(detailtransaksi => {
                    const DetailTransaksiBarcode = detailtransaksi.Barcode
                    const DetailTransaksiNamaBarang = detailtransaksi.NamaBarang
                    const DetailTransaksiTotalBarang = detailtransaksi.TotalBarang ? Number(detailtransaksi.TotalBarang) : 0
                    const DetailTransaksiHargaTotal = detailtransaksi.HargaTotal ? Number(detailtransaksi.HargaTotal) : 0

                    const DetailBarang = ListBarang.find(listbarang => listbarang.Barcode === DetailTransaksiBarcode)
                    const DetailBarang_JenisBarang = DetailBarang.Jenis ? DetailBarang.Jenis : ''
                    const DetailBarang_HargaModal = DetailBarang.HargaModal ? DetailBarang.HargaModal : 0

                    if (ReportList.length > 0) {
                        const ReportListIndex = ReportList.findIndex(reportlist => reportlist.Barcode === DetailTransaksiBarcode)
                        if (ReportListIndex >= 0) {
                            ReportList[ReportListIndex].TotalBarang = ReportList[ReportListIndex].TotalBarang + DetailTransaksiTotalBarang
                            ReportList[ReportListIndex].HargaTotal = ReportList[ReportListIndex].HargaTotal + DetailTransaksiHargaTotal
                        } else {
                            const newReportListData = {
                                Barcode: DetailTransaksiBarcode, ////// ReportList=DetailTransaksi->Barcode
                                NamaBarang: DetailTransaksiNamaBarang, ////// ReportList=DetailTransaksi->NamaBarang
                                JenisBarang: DetailBarang_JenisBarang, ////// ReportList=DetailBarang->Jenis
                                ModalBarang: DetailBarang_HargaModal, ////// ReportList=DetailBarang->HargaModal
                                TotalBarang: DetailTransaksiTotalBarang, ////// ReportList=DetailTransaksi->TotalBarang++
                                HargaTotal: DetailTransaksiHargaTotal, ////// ReportList=DetailTransaksi->HargaTotal++
                            }
                            ReportList.push(newReportListData)
                        }
                    } else {
                        const newReportListData = {
                            Barcode: DetailTransaksiBarcode, ////// ReportList=DetailTransaksi->Barcode
                            NamaBarang: DetailTransaksiNamaBarang, ////// ReportList=DetailTransaksi->NamaBarang
                            JenisBarang: DetailBarang_JenisBarang, ////// ReportList=DetailBarang->Jenis
                            ModalBarang: DetailBarang_HargaModal, ////// ReportList=DetailBarang->HargaModal
                            TotalBarang: DetailTransaksiTotalBarang, ////// ReportList=DetailTransaksi->TotalBarang++
                            HargaTotal: DetailTransaksiHargaTotal, ////// ReportList=DetailTransaksi->HargaTotal++
                        }
                        ReportList.push(newReportListData)
                    }
                })
            })
        }
        // console.log('Report_Get_BarangList dipanggil')
        // return res.status(200).json({ ReportList, ReportData, msg: 'Report_Get_BarangList berhasil dijalankan' })
        // return { ReportList, ReportData }
        return ReportList
    } catch (err) {
        console.log(`Erorr saat proses Report_Get_BarangList => ${err.errorDetail ? err.errorDetail : err}`)
        // return res.status(400).json({
        //     msg: err.msg ? err.msg : 'ada kesalahan pada proses pemanggilan list Help Report Barang',
        //     errorDetail: err.errorDetail ? err.errorDetail : err
        // })
        throw {
            msg: err.msg ? err.msg : 'ada kesalahan pada proses Report_Get_BarangList',
            errorDetail: err.errorDetail ? err.errorDetail : err,
        }
    }

}
////// END-NONGENERIC
