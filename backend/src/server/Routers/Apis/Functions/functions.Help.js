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

                ////// create ReportList
                const ListTransaksiDetailTransaksi = listtransaksi.DetailTransaksi

                ListTransaksiDetailTransaksi.forEach(detailtransaksi => {
                    const DetailTransaksiBarcode = detailtransaksi.Barcode
                    const DetailTransaksiNamaBarang = detailtransaksi.NamaBarang
                    const DetailTransaksiTotalBarang = detailtransaksi.TotalBarang ? Number(detailtransaksi.TotalBarang) : 0
                    const DetailTransaksiHargaTotal = detailtransaksi.HargaTotal ? Number(detailtransaksi.HargaTotal) : 0

                    const DetailBarang = ListBarang.find(listbarang => listbarang.Barcode === DetailTransaksiBarcode)
                    const DetailBarang_JenisBarang = DetailBarang ? (DetailBarang.Jenis ? DetailBarang.Jenis : '') : ''
                    const DetailBarang_HargaModal = DetailBarang ? (DetailBarang.HargaModal ? DetailBarang.HargaModal : 0) : 0

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
        console.log('Report_Get_BarangList dipanggil')
        return ReportList
    } catch (err) {
        console.log(`Erorr saat proses Report_Get_BarangList => ${err.errorDetail ? err.errorDetail : err}`)
        throw {
            msg: err.msg ? err.msg : 'ada kesalahan pada proses Report_Get_BarangList',
            errorDetail: err.errorDetail ? err.errorDetail : err,
        }
    }

}
////// END-NONGENERIC
