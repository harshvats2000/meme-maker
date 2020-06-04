import { THEME_TOGGLER } from './types'

export const themeToggler = (theme) => dispatch => {
    const toggled_theme = theme === 'light' ? 'dark' : 'light'
    dispatch({
        type: THEME_TOGGLER,
        payload: toggled_theme
    })
}