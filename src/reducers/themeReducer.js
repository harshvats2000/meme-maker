import { THEME_TOGGLER } from '../actions/types'

const initialState = {
    theme: 'dark'
}
export default function(state = initialState, action) {
    switch(action.type) {
        case THEME_TOGGLER: 
        return {
            ...state,
            theme: action.payload
        }
        default:
        return state;
    }
}