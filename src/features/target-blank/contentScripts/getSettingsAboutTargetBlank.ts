export type TargetBlankSettings = {
    alwaysOpenAnotherTab: boolean
    inKibelaLinkOpenSameTab: boolean
    excludeUrlList: string[]
}

export const getSettingsAboutTargetBlank: () => Promise<TargetBlankSettings> = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get("targetBlankSettings", rawResult => {
            if (!rawResult) {
                return reject(rawResult)
            }

            const result: TargetBlankSettings = {
                alwaysOpenAnotherTab: rawResult["alwaysOpenAnotherTab"] === "true",
                inKibelaLinkOpenSameTab: rawResult["inKibelaLinkOpenSameTab"] === "true",
                excludeUrlList: rawResult["excludeUrlList"] ?? []
            }
            return resolve(result)
        })
    })
}