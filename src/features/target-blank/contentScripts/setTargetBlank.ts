import { TargetBlankSettings } from "../types"
import { domElements } from "./domAdapter"

export const setTargetBlank = (settings: TargetBlankSettings) => {
    const excludeUrlList = settings.excludeUrlList.map(excludeUrl => excludeUrl.host)

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
        try {
            const { host } = new URL(element.href)
            if (excludeUrlList.includes(host)) {
                return
            }
        } catch (e) { }
        element.setTargetBlankAttribute(element.rawElement)
    })
}