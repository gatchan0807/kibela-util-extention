import { domElements } from "./domAdapter"
import { TargetBlankSettings } from "./getSettingsAboutTargetBlank"

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