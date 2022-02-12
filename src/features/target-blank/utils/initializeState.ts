import { Action } from "../hooks/localSettingsReducer";
import { getSettingsAboutTargetBlank } from "./getSettingsAboutTargetBlank";

export const initializeState = async (dispatch: React.Dispatch<Action>) => {
    const targetBlankSettings = await getSettingsAboutTargetBlank();
    dispatch({
        type: 'setAlwaysOpenOtherTab',
        payload: targetBlankSettings.alwaysOpenOtherTab,
    });
    dispatch({
        type: 'setInKibelaLinkOpenSameTab',
        payload: targetBlankSettings.inKibelaLinkOpenSameTab,
    });
    dispatch({
        type: 'setExcludeUrlList',
        payload: targetBlankSettings.excludeUrlList,
    });
};