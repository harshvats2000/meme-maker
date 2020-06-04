import { FETCH_POETPAGE_SHAYARIS } from '../actions/types'

const initialState = {
    sher: [],
    ghazal: [],
    poems: [],
    pic_url: '',
    fetching: true
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_POETPAGE_SHAYARIS:
        return {
            ...state,
            sher: action.payload[0],
            ghazal: action.payload[1],
            poems: action.payload[2],
            pic_url: action.payload[3],
            fetching: action.payload[4]
        }
        default: 
        return state;
    }
}