import { TargetBlankSettings } from "../types"
import { convertDomElement, DOMElement, getPreviewObserver, SELECTOR } from "./domAdapter"

export const setTargetBlank = (settings: TargetBlankSettings) => {
    const observer = getPreviewObserver({ settings, effectToDom })
    const previewBox = document.querySelector(SELECTOR.preview);

    if (previewBox) {
        observer.observe(previewBox, {
            childList: true,
        })
    }

    const rawElements = document.querySelectorAll(SELECTOR.main)
    let elements: DOMElement[] = []

    if (rawElements) {
        elements = convertDomElement(rawElements)
    }

    effectToDom(elements, settings)
}

const effectToDom = (elements: DOMElement[], settings: TargetBlankSettings) => {
    const excludeUrlList = settings.excludeUrlList.map(excludeUrl => excludeUrl.host)

    elements.forEach(element => {
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