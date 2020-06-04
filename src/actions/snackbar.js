import { SHOW_SNACKBAR, CLEAR_SNACKBAR } from './types'

export const showSnackbar = (message, autoHideDuration) => dispatch => {
    dispatch({
        type: SHOW_SNACKBAR,
        open: true,
        message: message,
        autoHideDuration: autoHideDuration
    })
}

export const clearSnackbar = () => dispatch => {
    dispatch({
        type: CLEAR_SNACKBAR,
        open: false,
        message: '',
    })
}