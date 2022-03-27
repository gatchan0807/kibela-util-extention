import { TargetBlankSettings } from "../types"

export const getSettingsAboutTargetBlank: () => Promise<TargetBlankSettings> = () => {
    return new Promise((resolve) => {
        chrome.storage.sync.get("targetBlankSettings", rawResult => {
            const { targetBlankSettings } = rawResult

            const result: TargetBlankSettings = targetBlankSettings ? {
                alwaysOpenOtherTab: targetBlankSettings.alwaysOpenOtherTab ?? true,
                inKibelaLinkOpenSameTab: targetBlankSettings.inKibelaLinkOpenSameTab ?? false,
                isOpenOtherTabInPreview: targetBlankSettings.isOpenOtherTabInPreview ?? true,
                excludeUrlList: targetBlankSettings.excludeUrlList ?? [],
            } : {
                alwaysOpenOtherTab: true,
                inKibelaLinkOpenSameTab: false,
                isOpenOtherTabInPreview: true,
                excludeUrlList: [],
            }
            return resolve(result)
        })
    })
}