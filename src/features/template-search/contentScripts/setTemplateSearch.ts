import { TemplateSearchSettings } from "../hooks/getSettingsAboutTemplateSearch"
import { convertDomElements, convertTemplate, DOMElement, getRawElements, mountModalToDom, SELECTOR } from "./domAdapter"

export type Template = DOMElement & {
    isFavorite: boolean,
    id: string
}

export const setTemplateSearch = (templateSearchSettings: TemplateSearchSettings) => {
    const triggerButton = document.querySelector(SELECTOR.triggerButton)
    if (triggerButton) {
        // memo: 元のボタンのイベントリスナは削除するのがちょっと大変なので、元のイベント実行とそれに伴うDOM表示は許容する予定
        triggerButton.addEventListener("click", async () => {
            const rawElements = await (async () => {
                try {
                    return await getRawElements()
                } catch (e) {
                    return null
                }
            })()

            if (rawElements) {
                const elements = convertDomElements(rawElements)
                const templates = await convertTemplate(elements)

                mountModalToDom(templates) 
            } else {
                // todo: mountModalToDom(null) 
            }
        })
    }
    console.log(templateSearchSettings)
    return
}