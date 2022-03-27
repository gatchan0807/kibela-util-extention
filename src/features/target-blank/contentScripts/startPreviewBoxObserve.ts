import { TargetBlankSettings } from "../types";
import { SELECTOR, getPreviewObserver } from "./domAdapter";
import { effectsDom } from "./effectsDom";

export const startPreviewBoxObserve = (settings: TargetBlankSettings) => {
    const previewBox = document.querySelector(SELECTOR.previewWrapper);

    if (previewBox) {
        const observer = getPreviewObserver({ settings, effectsDom })
        observer.observe(previewBox, {
            childList: true,
            subtree: true
        })
    }
}