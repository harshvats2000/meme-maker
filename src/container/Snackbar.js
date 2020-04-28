import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'

function SnackbarContainer(props) {
    const { open, message, handleClose } = props;
    return (
        <div>
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                open={open}
                onClose={handleClose}
                message={message}
                autoHideDuration={2000}
            />
        </div>
    )
}

export default SnackbarContainer