import { FETCH_HOMEPAGE_SHAYARIS } from '../actions/types'

const initialState = {
    homePageShayaris: [],
    fetching: true
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_HOMEPAGE_SHAYARIS:
        return {
            ...state,
            homePageShayaris: action.payload[0],
            fetching: action.payload[1]
        }
        default: 
        return state;
    }
}