import { DOMElement, EffectsDomFunction, TargetBlankSettings } from "../types"

export const SELECTOR = {
    main: ".markdown-body a[href]",
    preview: ".previewBox .markdown-body a[href]",
    previewWrapper: ".previewBox > div",
}

export const convertDomElement = (elementList: NodeListOf<Element>): DOMElement[] => {
    const temporaryList: DOMElement[] = []
    elementList.forEach(e => {
        const className = e.getAttribute("class") ?? ""
        const isAnchorLink = className.includes("anchor")
        const isUserMention = className.includes("user-mention")
        const isSameSiteLink = className.includes("entry-titleWithIcon")

        temporaryList.push({
            href: e.getAttribute("href") ?? "",
            className: e.getAttribute("class") ?? "",
            idName: e.getAttribute("id") ?? "",
            hasTargetBlank: e.getAttribute("target") === "_blank",
            isSameSiteLink,
            isUserMention,
            isAnchorLink,
            rawElement: e,
            setTargetBlankAttribute: (element: Element) => {
                element.setAttribute("target", "_blank")
                element.setAttribute("rel", "noopener noreferrer")
            },
        })
    })

    return temporaryList
}

export const getPreviewObserver = ({ settings, effectsDom }: { settings: TargetBlankSettings, effectsDom: EffectsDomFunction }) => {
    return new MutationObserver(_ => {
        const rawElements = document.querySelectorAll(SELECTOR.preview)
        let elements: DOMElement[] = []

        if (rawElements) {
            elements = convertDomElement(rawElements)
        }

        effectsDom({ elements, settings })
    })
}
