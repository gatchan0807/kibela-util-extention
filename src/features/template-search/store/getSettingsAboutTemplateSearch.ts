import { TemplateSearchSettings } from "./types"

export const getSettingsAboutTemplateSearch: () => Promise<TemplateSearchSettings> = () => {
    return new Promise((resolve) => {
        chrome.storage.sync.get("templateSearchSettings", rawResult => {
            const { templateSearchSettings } = rawResult

            const result: TemplateSearchSettings = templateSearchSettings ? {
                featureUsage: templateSearchSettings.featureUsage ?? true,
            } : {
                featureUsage: true
            }
            return resolve(result)
        })
    })
}