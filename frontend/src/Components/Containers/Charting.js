import React, { Fragment } from "react"

import { connect } from 'react-redux'

import { Create_Warning_Messages } from '../../Store/Actions/Messages.Actions'

import { Typography } from '@material-ui/core'

import { DataTidakDitemukan } from './Page404'

const Chart = require("chart.js")


class Charting extends React.Component {
    componentDidMount() {
        this.createChart()
    }
    componentDidUpdate(prevProps) {
        if ((this.props.datasetsdata !== prevProps.datasetsdata) ||
            (this.props.datasets !== prevProps.datasets) ||
            (this.props.data !== prevProps.data)) {
            this.createChart()
        }
    }
    createChart = () => {
        const isRedy = this.isRedy()
        if (isRedy) {
            try {
                const randomcolor = []
                if ((((this.props.datasetsdata)
                    // || (this.props.datasets)
                    // || (this.props.data)
                ) && (!this.props.datasetsbackgroundColor))) {
                    this.props.datasetsdata.forEach(element => {
                        const newrandomcolor = this.RandomColor()
                        randomcolor.push(newrandomcolor)
                    })
                }
                new Chart(this.node, {
                    type: this.props.type ? this.props.type : null,
                    data: this.props.data ? this.props.data : {
                        labels: this.props.labels ? this.props.labels : [],
                        datasets: this.props.datasets ? this.props.datasets : [
                            {
                                label: this.props.datasetslabel ? this.props.datasetslabel : "",
                                data: this.props.datasetsdata ? this.props.datasetsdata : [],
                                backgroundColor: this.props.datasetsbackgroundColor ? this.props.datasetsbackgroundColor : randomcolor,
                                borderColor: this.props.datasetsborderColor ? this.props.datasetsborderColor : [],
                                borderWidth: this.props.datasetsborderWidth ? this.props.datasetsborderWidth : 1
                            }
                        ]
                    },
                    options: this.props.options ? this.props.options : null,
                })
            } catch (err) {
                console.log(err)
                this.props.Create_Warning_Messages(null, `ada kesalahan pada pembuatan grafik ${err}`)
            }
        } else {
            this.props.Create_Warning_Messages(null, 'Data untuk membuat grafik kurang/salah')
        }
    }
    isRedy = () => {
        const data = this.props.data
        const datasets = this.props.datasets
        const datasetsdata = this.props.datasetsdata
        try {
            if (data || datasets || datasetsdata) {
                if (((data) && (datasets || datasetsdata)) ||
                    ((datasets) && (data || datasetsdata))) {
                    return false
                } else {
                    return true
                }
            } else {
                return false
            }
        } catch (err) {
            console.log(err)
            return false
        }
    }
    RandomColor = () => {
        const letters = '0123456789ABCDEF'
        let color = '#'
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        // console.log('color', color)
        return color
    }

    render() {
        const isRedy = this.isRedy()
        const ChartOnCanvas = () => {
            return (
                <Fragment>
                    <canvas
                        style={this.props.canvasstyle ? this.props.canvasstyle : { width: 800, height: 300 }}
                        ref={node => (this.node = node)}
                    />
                </Fragment>
            )
        }
        return (
            <Fragment>
                <Typography variant='h6'>Grafik:</Typography>
                {isRedy ? (
                    <ChartOnCanvas />
                ) : <DataTidakDitemukan />}

            </Fragment>
        )
    }
}

export default connect(null, { Create_Warning_Messages })(Charting)