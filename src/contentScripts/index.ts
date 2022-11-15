import { setTargetBlank, startPreviewBoxObserve } from "../features/target-blank/contentScripts"
import { getSettingsAboutTargetBlank } from "../features/target-blank/utils/getSettingsAboutTargetBlank";
import { setTemplateSearch } from "../features/template-search/contentScripts";
import { getSettingsAboutTemplateSearch } from "../features/template-search/store/getSettingsAboutTemplateSearch";

(async () => {
    console.log("Running 木べら！！");

    const targetBlankSettings = await getSettingsAboutTargetBlank()
    if (targetBlankSettings.isOpenOtherTabInPreview) {
        startPreviewBoxObserve(targetBlankSettings)
    }
    await setTargetBlank(targetBlankSettings)

    const templateSearchSettings = await getSettingsAboutTemplateSearch()
    await setTemplateSearch(templateSearchSettings)
})()