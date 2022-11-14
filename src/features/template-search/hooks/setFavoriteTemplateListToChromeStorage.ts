import { FavoriteTemplateList } from "./getFavoriteTemplateList";

export const setFavoriteTemplateListToChromeStorage = async ({
    ids
}: FavoriteTemplateList) => {
    chrome.storage.sync.set({
        favoriteTemplateList: {
            ids
        },
    });

};
