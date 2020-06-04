import { SHOW_SNACKBAR, CLEAR_SNACKBAR } from '../actions/types'

const initialState = {
    open: false,
    message: '',
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SHOW_SNACKBAR: 
        return {
            ...state,
            open: action.open,
            message: action.message,
            autoHideDuration: action.autoHideDuration
        }
        case CLEAR_SNACKBAR: 
        return {
            ...state,
            open: action.open,
            message: action.message,
        }
        default: {
            return state;
        }
    }
}