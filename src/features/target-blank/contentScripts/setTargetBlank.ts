import { domElements } from "./domAdapter"

export const setTargetBlank = (settings = {}) => {
    domElements.forEach(element => {
        if (element.isAnchorLink) {
            return
        }
        element.setTargetBlankAttribute(element)
    })
}