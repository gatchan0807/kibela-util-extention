import { TargetBlankSettings } from "../types"

export const getSettingsAboutTargetBlank: () => Promise<TargetBlankSettings> = () => {
    return new Promise((resolve) => {
        chrome.storage.sync.get("targetBlankSettings", rawResult => {
            const { targetBlankSettings } = rawResult

            const result: TargetBlankSettings = targetBlankSettings ? {
                alwaysOpenOtherTab: targetBlankSettings.alwaysOpenOtherTab ?? false,
                inKibelaLinkOpenSameTab: targetBlankSettings.inKibelaLinkOpenSameTab ?? false,
                excludeUrlList: targetBlankSettings.excludeUrlList ?? []
            } : {
                alwaysOpenOtherTab: false,
                inKibelaLinkOpenSameTab: false,
                excludeUrlList: []
            }
            return resolve(result)
        })
    })
}