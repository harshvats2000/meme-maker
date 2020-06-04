import { setCORS } from 'google-translate-api-browser'

export const translateToEnglish = (content) => {
        const translate = setCORS("https://cors-anywhere.herokuapp.com/");
        return (
            translate(content, { to: "en" })
        )
}

export const translateToUrdu = (content) => {
        const translate = setCORS("https://cors-anywhere.herokuapp.com/");
        return (
            translate(content, { to: "ur" })
        )
}