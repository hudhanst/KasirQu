import React, { Fragment } from 'react'

const MoneyFormater = (props) => {
    // console.log(props)
    return (
        <Fragment>
            {props.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
        </Fragment>
    )
}

export default MoneyFormater