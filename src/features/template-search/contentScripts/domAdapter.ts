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

export const mountModalToDom = (elements: Element[] | null) => {
    if (elements === null) {
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