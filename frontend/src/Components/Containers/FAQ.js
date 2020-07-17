import React, { Fragment } from 'react'

import { Paper, Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core'

import { MUI_VerticalMargin } from '../../MUI_theme'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const FAQ = (props) => {
    const data = props.faqlist ? props.faqlist : []
    // const brText = (ogText) => {
    //     try {
    //         if (ogText) {
    //             console.log(ogText)
    //             // const newText = ogText.map(i => i.replace(/\n/g, '<br />'))
    //             const newText = ogText.replace(/\n/g, '<br />')
    //             return newText
    //         } else {
    //             return ogText
    //         }
    //     } catch (err) {
    //         console.log(err)
    //         return ogText
    //     }
    // }
    // console.log(data)
    return (
        <Fragment>
            <Paper style={{
                width: '90%',
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'block',
                marginTop: '10px',
                marginBottom: '10px',
                padding: '10px',
            }}>
                {props.title ? (
                    <Typography
                        variant={props.titlevariant ? props.titlevariant : 'h4'}
                        align={props.titlealign ? props.titlealign : 'left'}
                        style={{ ...MUI_VerticalMargin }}
                    >
                        {props.title}
                    </Typography>
                ) : null}
                {data && data.length > 0 ? (
                    data.map((item, index) => (
                        <Accordion disabled={item.disabled ? item.disabled : false} key={index}>
                            <AccordionSummary
                                expandIcon={item.expandIcon ? item.expandIcon : <ExpandMoreIcon />}
                            >
                                {item.AccordionSummary ? item.AccordionSummary : (
                                    <Typography align="left" >
                                        {item.AccordionSummaryTypography ? item.AccordionSummaryTypography : ''}
                                    </Typography>
                                )}
                            </AccordionSummary>
                            <AccordionDetails>
                                {item.AccordionDetails ? item.AccordionDetails : (
                                    <Typography>
                                        {item.AccordionDetailsTypography ? item.AccordionDetailsTypography : ''}
                                        {/* {item.AccordionDetailsTypography ? brText(item.AccordionDetailsTypography) : ''} */}
                                    </Typography >
                                )}
                            </AccordionDetails>
                        </Accordion>
                    ))
                ) : null}
            </Paper>
        </Fragment>
    )
}

export default FAQ