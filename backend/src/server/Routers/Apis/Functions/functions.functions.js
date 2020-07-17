const XLSX = require('xlsx')

//// GENERIC
exports.Create_Excel_File = async (UserName, Location, ExcelData) => {
    try {
        const date = new Date()
        const FileName = `${Location}.${date.toISOString().replace(/:/g, '-')}.xlsx`
        if (!UserName || !Location || !ExcelData.length > 0) {
            throw {
                msg: 'data tidak lengkap untuk membuat file excel',
            }
        }
        const wb = XLSX.utils.book_new()
        wb.Props = {
            Title: `Export ${Location}`,
            Subject: `Data ${Location}`,
            Author: `KasirQu-${UserName}`,
            CreatedDate: date,
        }
        wb.SheetNames.push(`${Location}`)
        // const ws_data = [['hallo', 'world']]
        const ws_data = ExcelData
        const FirstExcelData = ExcelData[0]
        console.log('FirstExcelData',FirstExcelData)
        const ws_header = Object.keys(FirstExcelData)
        // const ws = XLSX.utils.aoa_to_sheet(ws_data)
        const ws = XLSX.utils.json_to_sheet(ws_data, ws_header)
        wb.Sheets[`${Location}`] = ws

        XLSX.writeFile(wb, `./downloads/${Location}/${FileName}`)
        return FileName
    } catch (err) {
        console.log(`Erorr saat Create_Excel_File => ${err}`)
        throw { msg: 'ada kesalahan pada proses Create_Excel_File', errorDetail: err }
    }
}
////// END-GENERIC

////// NONGENERIC
////// END-NONGENERIC