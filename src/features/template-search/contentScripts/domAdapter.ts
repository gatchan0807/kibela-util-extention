export const SELECTOR = {
    triggerButton: "div.headerNavigation-postButton a.is-button-withDropdown-rightPart",
    templateContainer: "div.postButtonDropdownContainer ul.postButtonDropdown-list:nth-child(2) > li > a",
}

export type DOMElement = {
    title: string,
    href: string,
    index: number,
    rawElement: Element,
}

export type Template = DOMElement & {
    isFavorite: boolean,
    id: string
}

export const convertDomElements = (elementList: NodeListOf<Element>): DOMElement[] => {
    const result: DOMElement[] = []
    let index = 0
    elementList.forEach(element => {
        index++
        // 一番最後のリンクはテンプレート管理ページヘのリンクなので除外
        if (index >= elementList.length) return

        result.push({
            title: element.textContent ?? "[ERROR] 情報取得失敗",
            href: element.getAttribute("href") ?? "/",
            index,
            rawElement: element
        })
    })

    return result
}

export const convertTemplate = (elements: DOMElement[]): Template[] => {
    return elements.map(element => {
        // todo: set template id based title and workspace id(subdomain)
        // todo: get favorite templates from chrome storage 
        // todo: set isFavorite
        return { ...element, isFavorite: false, id: "" }
    })
}

export const mountModalToDom = (templates: Template[] | null) => {
    if (templates === null) {
        // render error message
        return
    }

    // render modal
    return
}

export const getRawElements = (): Promise<NodeListOf<Element> | null> => {
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