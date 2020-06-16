import React from 'react'

import { connect } from 'react-redux'

import { Clean_Messages } from '../../Store/Actions/Messages.Actions'

import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

export class Messages extends React.Component {
    handleClick = () => {
        this.setState({ isSnackbarOpen: true })
    }

    handleClose = (event, reason) => {
        this.props.Clean_Messages()
    }
    render() {
        const vertical = 'bottom'
        const horizontal = 'left'
        const { isMessages, MessagesType, MessagesCode, Messages } = this.props.messages
        return (
            <div>
                <Snackbar open={isMessages} autoHideDuration={3600} onClose={this.handleClose} anchorOrigin={{ vertical, horizontal }}>
                    <MuiAlert onClose={this.handleClose} severity={MessagesType ? MessagesType : 'info'} elevation={10} variant="filled">
                        {MessagesCode ? MessagesCode : ''} :&emsp;
                        {Messages ? Messages : ''}
                    </MuiAlert>
                </Snackbar>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    messages: state.Messages
})

export default connect(mapStateToProps, { Clean_Messages })(Messages)
