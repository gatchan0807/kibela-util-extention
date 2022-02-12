import { TargetBlankSettings } from "../types"
import { domElements } from "./domAdapter"

export const setTargetBlank = (settings: TargetBlankSettings) => {
    domElements.forEach(element => {
        if (!settings.alwaysOpenOtherTab) {
            return
        }
        if (settings.inKibelaLinkOpenSameTab && (element.isUserMention || element.isSameSiteLink)) {
            return
        }
        if (element.isAnchorLink) {
            return
        }
        element.setTargetBlankAttribute(element.rawElement)
    })
}