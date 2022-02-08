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
export const domElements: DOMElement[] = []

const allATag = document.querySelectorAll(".markdown-body a[href]")
const setTargetBlankAttribute = (element: Element) => {
    element.setAttribute("target", "_blank")
    element.setAttribute("rel", "noopener noreferrer")
}

allATag.forEach(e => {
    const className = e.getAttribute("class") ?? ""
    const isAnchorLink = className.includes("anchor")
    const isUserMention = className.includes("user-mention")
    const isSameSiteLink = className.includes("entry-titleWithIcon")

    domElements.push({
        href: e.getAttribute("href") ?? "",
        className: e.getAttribute("class") ?? "",
        idName: e.getAttribute("id") ?? "",
        hasTargetBlank: e.getAttribute("target") === "_blank",
        isSameSiteLink,
        isUserMention,
        isAnchorLink,
        setTargetBlankAttribute,
        rawElement: e,
    })
})
