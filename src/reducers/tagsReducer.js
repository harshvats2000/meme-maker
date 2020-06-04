import { FETCH_TAGS } from '../actions/types'

const initialState = {
    tags: [],
    totalShayaris: 0
}
export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_TAGS:
        return {
            ...state,
            tags: action.payload[0],
            totalShayaris: action.payload[1]
        }
        default: 
        return state
    }
} 