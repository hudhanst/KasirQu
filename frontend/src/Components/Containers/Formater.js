import React, { Fragment } from 'react'

export const ConvertInttoMoney = (props) => {
    try {
        const data = parseInt(props)
        return (
            <Fragment>
                {data.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </Fragment>
        )
    } catch (err) {
        console.log('Log: ConvertInttoMoney -> err', err)
    }
}

export const ConvertMoneytoInt = (StringData) => {
    try {
        const MoneyinInt = StringData ? StringData.replace(/,/g, '') : '0'
        return Number(MoneyinInt)
    } catch (err) {
        console.log('Log: ConvertMoneytoInt -> err', err)
    }
}