import { Action } from "../hooks/localSettingsReducer";
import { ExcludeUrl } from "../types";
import { getSettingsAboutTargetBlank, setChromeStorage } from "../utils";

export const excludeUrlDeleteHandler = async (id: string, { dispatch }: { dispatch: React.Dispatch<Action> }) => {
    const targetBlankSettings = await getSettingsAboutTargetBlank();
    const urlList = (targetBlankSettings.excludeUrlList as ExcludeUrl[]) ?? [];
    const deletedUrlList = urlList.filter((urlItem) => urlItem.id !== id);

    dispatch({ type: 'setExcludeUrlList', payload: deletedUrlList });
    setChromeStorage({
        ...targetBlankSettings,
        excludeUrlList: deletedUrlList,
    });
};