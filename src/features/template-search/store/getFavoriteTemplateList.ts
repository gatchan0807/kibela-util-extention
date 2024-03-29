import { FavoriteTemplateList } from "./types"

export const getFavoriteTemplateList: () => Promise<FavoriteTemplateList> = () => {
    return new Promise((resolve) => {
        chrome.storage.sync.get("favoriteTemplateList", rawResult => {
            const { favoriteTemplateList } = rawResult

            const result: FavoriteTemplateList = favoriteTemplateList ? {
                ids: favoriteTemplateList.ids ?? [],
            } : {
                ids: []
            }
            return resolve(result)
        })
    })
}