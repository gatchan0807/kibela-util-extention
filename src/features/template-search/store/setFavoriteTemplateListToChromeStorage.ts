import { FavoriteTemplateList } from "./types";

export const setFavoriteTemplateListToChromeStorage = async ({
    ids
}: FavoriteTemplateList) => {
    await chrome.storage.sync.set({
        favoriteTemplateList: {
            ids
        },
    });
};
