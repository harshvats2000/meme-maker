import { combineReducers } from 'redux'
import homeShayariReducer from './homeShayariReducer'
import tagPageShayariReducer from './tagPageShayariReducer'
import poetPageShayariReducer from './poetPageShayariReducer'
import snackbarReducer from './snackbarReducer'
import tagsReducer from './tagsReducer'
import themeReducer from './themeReducer'

export default combineReducers({
    homePageShayaris: homeShayariReducer,
    tagPageShayaris: tagPageShayariReducer,
    poetPageShayaris: poetPageShayariReducer,
    snackbar: snackbarReducer,
    tags: tagsReducer,
    theme: themeReducer
})