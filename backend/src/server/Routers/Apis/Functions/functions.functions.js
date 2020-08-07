const XLSX = require('xlsx')
const path = require('path')

//// GENERIC
exports.Create_Excel_File = async (UserName, Location, ExcelData, NestedArray) => {
    const isNestedArray = NestedArray ? NestedArray : false
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
        // console.log('FirstExcelData', FirstExcelData)
        const ws_header = Object.keys(FirstExcelData)

        const filePath = path.join(__dirname, `../../../downloads/${Location}/${FileName}`)

        if (isNestedArray) {
            const ws = XLSX.utils.aoa_to_sheet([ws_header])
            const newws_data = []

            ws_data.map((item) => {
                const newitem = []
                Object.keys(item).map((itemitem) => {
                    // console.log(item[itemitem])
                    // console.log(typeof item[itemitem])
                    if (typeof item[itemitem] === 'object' && item[itemitem] !== null) {
                        newitem.push(JSON.stringify(item[itemitem]))
                    } else {
                        newitem.push(item[itemitem])
                    }
                })
                newws_data.push(newitem)
            })

            XLSX.utils.sheet_add_aoa(ws, newws_data, { origin: "A2" })

            wb.Sheets[`${Location}`] = ws
            XLSX.writeFile(wb, filePath)
            // return FileName
            return filePath
        } else {
            const ws = XLSX.utils.json_to_sheet(ws_data, ws_header)

            wb.Sheets[`${Location}`] = ws
            XLSX.writeFile(wb, filePath)
            // return FileName
            return filePath
        }
    } catch (err) {
        console.log(`Erorr saat Create_Excel_File => ${typeof err === 'object' ? JSON.stringify(err) : err}`)
        throw { msg: 'ada kesalahan pada proses Create_Excel_File', errorDetail: err }
    }
}
////// END-GENERIC

////// NONGENERIC
////// END-NONGENERIC