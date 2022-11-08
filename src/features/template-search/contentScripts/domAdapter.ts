export const SELECTOR = {
    triggerButton: "div.headerNavigation-postButton a.is-button-withDropdown-rightPart",
    templateContainer: "div.postButtonDropdownContainer",
}

export type DOMElement = {
    href: string,
    className: string,
    idName: string,
    rawElement: Element,
}

export const convertDomElements = (elementList: NodeListOf<Element>): DOMElement[] | null => {
    return []
}

export const mountModalToDom = (elements: Element[] | null) => {
    if (elements === null) {
        // render error message
        return
    } 

    // render modal
    return 
}

export const getRawElements = (): Promise<NodeListOf<Element>|null> => {
    return new Promise(
        (resolve, reject) => {
            setTimeout(() => {
                const rawElements = document.querySelectorAll(SELECTOR.templateContainer)
                if (rawElements.length > 0) {
                    resolve(rawElements)
                } else {
                    reject(null)
                }
            }, 100)
        }
    )
}