import { DOMElement, TargetBlankSettings } from "../types"
import { convertDomElement, SELECTOR } from "./domAdapter"
import { effectsDom } from "./effectsDom";

export const setTargetBlank = (settings: TargetBlankSettings) => {
    const rawElements = document.querySelectorAll(SELECTOR.main)
    let elements: DOMElement[] = []

    if (rawElements) {
        elements = convertDomElement(rawElements)
    }

    effectsDom({ elements, settings })
}