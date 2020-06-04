import React from 'react'
import { connect } from 'react-redux'
import { clearSnackbar } from '../actions/snackbar'

import Snackbar from '@material-ui/core/Snackbar'

function SnackbarContainer(props) {
    const { open, message, autoHideDuration } = props;
    return (
        <div>
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                open={open}
                onClose={props.clearSnackbar}
                message={message}
                autoHideDuration={autoHideDuration}
            />
        </div>
    )
}

export default connect(null, { clearSnackbar })(SnackbarContainer)