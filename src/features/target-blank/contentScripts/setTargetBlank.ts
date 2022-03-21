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
            const href = element.isUserMention || element.isSameSiteLink ? `${location.origin}${element.href}` : element.href
            const { host } = new URL(href)
            if (excludeUrlList.includes(host)) {
                return
            }
        } catch (e) {
            console.error("Caused URL:", element.href);
            console.error(e);
        }
        element.setTargetBlankAttribute(element.rawElement)
    })
}