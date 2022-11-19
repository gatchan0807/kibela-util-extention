import { TemplateSearchSettings } from "../store/types"
import { convertDomElements, convertTemplate, getRawElements, mountModalToDom, SELECTOR } from "./domAdapter"

export const setTemplateSearch = (templateSearchSettings: TemplateSearchSettings) => {
    const triggerButton = document.querySelector(SELECTOR.triggerButton)
    if (triggerButton && templateSearchSettings.featureUsage) {
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
    return
}