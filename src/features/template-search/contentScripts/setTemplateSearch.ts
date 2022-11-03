import { TemplateSearchSettings } from "../hooks/getSettingsAboutTemplateSearch"
import { convertDomElement, DOMElement, SELECTOR } from "./domAdapter"

export const setTemplateSearch = (templateSearchSettings: TemplateSearchSettings) => {
    const rawTriggerButton = document.querySelector(SELECTOR.triggerButton)
    if (rawTriggerButton) {
        // memo: 元のボタンのイベントリスナは削除するのがちょっと大変なので、元のイベント実行とそれに伴うDOM表示は許容する予定
        rawTriggerButton.addEventListener("click", () => { 
            console.log("clicked") 
        })
    }

    const rawElements = document.querySelectorAll(SELECTOR.templateContainer)
    let elements: DOMElement[] = []

    if (rawElements) {
        elements = convertDomElement(rawElements)
    }
    console.log(templateSearchSettings)
    return
}