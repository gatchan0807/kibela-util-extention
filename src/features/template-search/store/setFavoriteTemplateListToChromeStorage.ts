import { FavoriteTemplateList } from "./getFavoriteTemplateList";

export const setFavoriteTemplateListToChromeStorage = async ({
    ids
}: FavoriteTemplateList) => {
    await chrome.storage.sync.set({
        favoriteTemplateList: {
            ids
        },
    });
};
