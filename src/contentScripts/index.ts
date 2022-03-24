import { setTargetBlank } from "../features/target-blank/contentScripts"
import { startPreviewBoxObserve } from "../features/target-blank/contentScripts/startPreviewBoxObserve";
import { getSettingsAboutTargetBlank } from "../features/target-blank/utils/getSettingsAboutTargetBlank";

(async () => {
    console.log("Running 木べら！！ on feature of TargetBlank");
    
    const settings = await getSettingsAboutTargetBlank()
    startPreviewBoxObserve(settings)
    await setTargetBlank(settings)
})()