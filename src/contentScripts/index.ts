import { setTargetBlank } from "../features/target-blank/contentScripts"
import { getSettingsAboutTargetBlank } from "../features/target-blank/utils/getSettingsAboutTargetBlank";

(async () => {
    console.log("hello")

    const settings = await getSettingsAboutTargetBlank()
    await setTargetBlank(settings)
})()