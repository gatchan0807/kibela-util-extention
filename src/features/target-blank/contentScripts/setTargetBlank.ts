import { domElements } from "./domAdapter"
import { TargetBlankSettings } from "./getSettingsAboutTargetBlank"

export const setTargetBlank = (settings: TargetBlankSettings) => {
    domElements.forEach(element => {
        if (element.isAnchorLink) {
            return
        }
        element.setTargetBlankAttribute(element.rawElement)
    })
}