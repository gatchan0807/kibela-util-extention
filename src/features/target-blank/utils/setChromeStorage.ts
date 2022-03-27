import { TargetBlankSettings } from "../types";
import { getSettingsAboutTargetBlank } from "./getSettingsAboutTargetBlank";

export const setChromeStorage = async ({
    inKibelaLinkOpenSameTab,
    alwaysOpenOtherTab,
    excludeUrlList,
    isOpenOtherTabInPreview,
}: TargetBlankSettings) => {
    const targetBlankSettings = await getSettingsAboutTargetBlank();

    chrome.storage.sync.set({
        targetBlankSettings: {
            ...targetBlankSettings,
            inKibelaLinkOpenSameTab,
            isOpenOtherTabInPreview,
            alwaysOpenOtherTab,
            excludeUrlList,
        },
    });
};
