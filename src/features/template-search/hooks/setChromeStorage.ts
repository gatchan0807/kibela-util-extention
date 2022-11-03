import { getSettingsAboutTemplateSearch, TemplateSearchSettings } from "./getSettingsAboutTemplateSearch";

export const setChromeStorage = async ({
    featureUsage
}: TemplateSearchSettings) => {
    const templateSearchSettings = await getSettingsAboutTemplateSearch();

    chrome.storage.sync.set({
        templateSearchSettings: {
            ...templateSearchSettings,
            featureUsage
        },
    });
};
