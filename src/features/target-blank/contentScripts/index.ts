export const allATag = document.querySelectorAll(".markdown-body a[href]")
export const domElement: DOMElement[] = []

export type DOMElement = {
    element: Element,
    href: string,
    className: string,
    idName: string,
    isSameSiteLink: boolean,
    isUserMention: boolean,
    isAnchorLink: boolean,
}

allATag.forEach(e => {
    const className = e.getAttribute("class") ?? ""
    const isAnchorLink = className.includes("anchor")
    const isUserMention = className.includes("user-mention")
    const isSameSiteLink = className.includes("entry-titleWithIcon")

    domElement.push({
        href: e.getAttribute("href") ?? "",
        className: e.getAttribute("class") ?? "",
        idName: e.getAttribute("id") ?? "",
        isSameSiteLink, 
        isUserMention,
        isAnchorLink,
        element: e,
    })
})
