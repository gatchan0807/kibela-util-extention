import { getSettingsAboutTemplateSearch } from "./getSettingsAboutTemplateSearch";
import { TemplateSearchSettings } from "./types";

export const setTemplateSearchSettingsToChromeStorage = async ({
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
