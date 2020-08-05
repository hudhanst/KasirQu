import { ConvertMoneytoInt } from './Formater'

export const Short_Column_INT = (TableName, ColumnNumb) => {
    try {
        let rows, switching, i, x, y, shouldSwitch, dir, switchcount
        const table = document.getElementById(TableName)
        switching = true
        switchcount = 0
        dir = "asc"

        while (switching) {
            switching = false
            rows = table.rows

            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false

                x = rows[i].getElementsByTagName("td")[ColumnNumb]
                y = rows[i + 1].getElementsByTagName("td")[ColumnNumb]

                if (dir === "asc") {
                    if (Number(x.innerHTML) > Number(y.innerHTML)) {
                        shouldSwitch = true
                        break
                    }
                } else if (dir === "desc") {
                    if (Number(x.innerHTML) < Number(y.innerHTML)) {
                        shouldSwitch = true
                        break
                    }
                }
            }
            if (shouldSwitch) {

                rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
                switching = true
                switchcount = switchcount + 1
            } else {

                if (switchcount === 0 && dir === "asc") {
                    dir = "desc"
                    switching = true
                }
            }
        }
    } catch (err) {
        console.log('Log: Short_Column_INT -> err', err)
    }
}
export const Short_Column_STR = (TableName, ColumnNumb) => {
    try {
        let rows, switching, i, x, y, shouldSwitch, dir, switchcount
        const table = document.getElementById(TableName)
        switching = true
        switchcount = 0
        dir = "asc"

        while (switching) {
            switching = false
            rows = table.rows

            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false

                x = rows[i].getElementsByTagName("td")[ColumnNumb]
                y = rows[i + 1].getElementsByTagName("td")[ColumnNumb]

                if (dir === "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true
                        break
                    }
                } else if (dir === "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true
                        break
                    }
                }
            }
            if (shouldSwitch) {

                rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
                switching = true
                switchcount = switchcount + 1
            } else {

                if (switchcount === 0 && dir === "asc") {
                    dir = "desc"
                    switching = true
                }
            }
        }
    } catch (err) {
        console.log('Log: Short_Column_STR -> err', err)
    }
}

export const Short_Column_Money = (TableName, ColumnNumb) => {
    try {
        let rows, switching, i, x, y, shouldSwitch, dir, switchcount
        const table = document.getElementById(TableName)
        switching = true
        switchcount = 0
        dir = "asc"

        while (switching) {
            switching = false
            rows = table.rows

            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false

                x = rows[i].getElementsByTagName("td")[ColumnNumb]
                y = rows[i + 1].getElementsByTagName("td")[ColumnNumb]

                if (dir === "asc") {
                    if (ConvertMoneytoInt(x.innerHTML) > ConvertMoneytoInt(y.innerHTML)) {
                        shouldSwitch = true
                        break
                    }
                } else if (dir === "desc") {
                    if (ConvertMoneytoInt(x.innerHTML) < ConvertMoneytoInt(y.innerHTML)) {
                        shouldSwitch = true
                        break
                    }
                }
            }
            if (shouldSwitch) {

                rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
                switching = true
                switchcount = switchcount + 1
            } else {

                if (switchcount === 0 && dir === "asc") {
                    dir = "desc"
                    switching = true
                }
            }
        }
    } catch (err) {
        console.log('Log: Short_Column_Money -> err', err)
    }
}

export const Short_Column_Date = (TableName, ColumnNumb) => {
    try {
        let rows, switching, i, x, y, shouldSwitch, dir, switchcount
        const table = document.getElementById(TableName)
        switching = true
        switchcount = 0
        dir = "asc"

        while (switching) {
            switching = false
            rows = table.rows

            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false

                x = rows[i].getElementsByTagName("td")[ColumnNumb]
                y = rows[i + 1].getElementsByTagName("td")[ColumnNumb]

                if (dir === "asc") {
                    if (new Date(x.innerHTML) > new Date(y.innerHTML)) {
                        shouldSwitch = true
                        break
                    }
                } else if (dir === "desc") {
                    if (new Date(x.innerHTML) < new Date(y.innerHTML)) {
                        shouldSwitch = true
                        break
                    }
                }
            }
            if (shouldSwitch) {

                rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
                switching = true
                switchcount = switchcount + 1
            } else {

                if (switchcount === 0 && dir === "asc") {
                    dir = "desc"
                    switching = true
                }
            }
        }
    } catch (err) {
        console.log('Log: Short_Column_Money -> err', err)
    }
}