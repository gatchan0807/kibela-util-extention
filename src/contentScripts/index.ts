import { getSettingsAboutTargetBlank, setTargetBlank } from "../features/target-blank/contentScripts"

;(async () => {
    console.log("hello")

    const settings = await getSettingsAboutTargetBlank()
    await setTargetBlank(settings)
})()