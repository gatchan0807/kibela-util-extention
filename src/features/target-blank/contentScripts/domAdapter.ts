import { TargetBlankSettings } from "../types"

type TargetType = "main" | "preview"
export const SELECTOR: { [key in TargetType]: string } = {
    main: ".markdown-body a[href]",
    preview: ".previewBox > div"
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
    return new MutationObserver(records => {
        const [_before, after] = records
        const firstChild = after.addedNodes[0] as Element

        if (firstChild && firstChild.classList.contains("markdown-body")) {
            const rawElements = firstChild.querySelectorAll("a[href]")
            let elements: DOMElement[] = []

            if (rawElements) {
                elements = convertDomElement(rawElements)
            }
            
            effectToDom(elements, settings)
        } else if (firstChild && firstChild.classList.contains("previewBox-placeholder")) {
            console.log("preview disable");
        }
    })
}
