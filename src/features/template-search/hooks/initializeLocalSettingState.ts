import { getSettingsAboutTemplateSearch } from "../store/getSettingsAboutTemplateSearch";
import { Action } from "./localSettingsReducer";

export const initializeLocalSettingState = async (dispatch: React.Dispatch<Action>) => {
    const templateSearchSettings = await getSettingsAboutTemplateSearch();
    dispatch({
        type: "setUseTemplateSearch",
        payload: templateSearchSettings.featureUsage,
    });
};