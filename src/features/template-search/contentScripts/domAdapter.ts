export const SELECTOR = {
    triggerButton: "div.headerNavigation-postButton a.is-button-withDropdown-rightPart",
    templateContainer: "div",
}

export type DOMElement = {
    href: string,
    className: string,
    idName: string,
    rawElement: Element,
}

export const convertDomElement = (elementList: NodeListOf<Element>): DOMElement[] => {
    return []
}