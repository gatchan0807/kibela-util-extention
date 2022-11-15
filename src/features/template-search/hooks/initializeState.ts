import { Action } from "./localSettingsReducer";
import { getSettingsAboutTemplateSearch } from "../store/getSettingsAboutTemplateSearch";

export const initializeState = async (dispatch: React.Dispatch<Action>) => {
    const templateSearchSettings = await getSettingsAboutTemplateSearch();
    dispatch({
        type: "setUseTemplateSearch",
        payload: templateSearchSettings.featureUsage,
    });
};