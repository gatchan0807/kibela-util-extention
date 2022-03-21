import { TargetBlankSettings } from "../types"

export const SELECTOR = {
    main: ".markdown-body a[href]",
    preview: ".previewBox .markdown-body a[href]",
    previewWrapper: ".previewBox > div",
}

export type DOMElement = {
    href: string,
    className: string,
    idName: string,
    isSameSiteLink: boolean,
    isUserMention: boolean,
    isAnchorLink: boolean,
    hasTargetBlank: boolean,
    setTargetBlankAttribute: (e: Element) => void,
    rawElement: Element,
}

export const convertDomElement = (elementList: NodeListOf<Element>) => {
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


export const getPreviewObserver = ({ settings, effectToDom }: { settings: TargetBlankSettings, effectToDom: Function }) => {
    return new MutationObserver(_ => {
        const rawElements = document.querySelectorAll(SELECTOR.preview)
        let elements: DOMElement[] = []

        if (rawElements) {
            elements = convertDomElement(rawElements)
        }

        effectToDom(elements, settings)
    })
}
