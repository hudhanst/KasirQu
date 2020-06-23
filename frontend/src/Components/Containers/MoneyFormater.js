import React, { Fragment } from 'react'

const MoneyFormater = (props) => {
    // console.log(props)
    const data = parseInt(props)
    return (
        <Fragment>
            {data.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
        </Fragment>
    )
}

export default MoneyFormater