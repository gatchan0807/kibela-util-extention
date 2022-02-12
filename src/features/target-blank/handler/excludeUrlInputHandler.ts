import { Action, State } from "../hooks/localSettingsReducer";
import { ExcludeUrl } from "../types";
import { sha256, getSettingsAboutTargetBlank } from "../utils";

export const excludeUrlInputHandler = async (e: React.KeyboardEvent, { dispatch, localSettings }: { dispatch: React.Dispatch<Action>, localSettings: State }) => {
    if (e.key === 'Enter') {
        if (
            !localSettings.excludeUrlInput.match(/^https?:\/\/[-_.a-zA-Z0-9/:]+/g)
        ) {
            dispatch({ type: 'setExcludeUrlInputValidation', payload: 'https://から始まるURLの記法で入力してください' });
            return;
        }

        const { host } = new URL(localSettings.excludeUrlInput);
        const id = await sha256(host);
        if (localSettings.excludeUrlList.find((item) => item.id === id)) {
            dispatch({ type: 'setExcludeUrlInputValidation', payload: 'すでに同じ例外ドメインが登録済みです' });
            return;
        }

        const targetBlankSettings = await getSettingsAboutTargetBlank();
        const urlList: ExcludeUrl[] = targetBlankSettings.excludeUrlList ?? [];

        urlList.push({ url: localSettings.excludeUrlInput, id, host });

        dispatch({ type: 'setExcludeUrlList', payload: urlList });
        dispatch({ type: 'setExcludeUrlInputValidation', payload: '' });
        dispatch({ type: 'setExcludeUrlInput', payload: '' });
    }
};