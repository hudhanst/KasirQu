import React, { Fragment } from 'react'

import { Paper, Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core'

import { MUI_VerticalMargin } from '../../MUI_theme'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const FAQ = (props) => {
    const data = props.faqlist ? props.faqlist : []
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