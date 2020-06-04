import { FETCH_TAGPAGE_SHAYARIS } from '../actions/types'

const initialState = {
    tagPageShayaris: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_TAGPAGE_SHAYARIS:
        return {
            ...state,
            tagPageShayaris: action.payload
        }
        default: 
        return state;
    }
}