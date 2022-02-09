export type TargetBlankSettings = {
    alwaysOpenOtherTab: boolean
    inKibelaLinkOpenSameTab: boolean
    excludeUrlList: string[]
}

export const getSettingsAboutTargetBlank: () => Promise<TargetBlankSettings> = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get("targetBlankSettings", rawResult => {
            const { targetBlankSettings } = rawResult
            if (!targetBlankSettings) {
                return reject(targetBlankSettings)
            }

            const result: TargetBlankSettings = {
                alwaysOpenOtherTab: targetBlankSettings.alwaysOpenOtherTab ?? false,
                inKibelaLinkOpenSameTab: targetBlankSettings.inKibelaLinkOpenSameTab ?? false,
                excludeUrlList: targetBlankSettings.excludeUrlList ?? []
            }
            return resolve(result)
        })
    })
}