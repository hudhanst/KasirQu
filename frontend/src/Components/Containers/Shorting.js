export const Short_Column_INT = (TableName, ColumnNumb) => {
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
}
export const Short_Column_STR = (TableName, ColumnNumb) => {
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
}