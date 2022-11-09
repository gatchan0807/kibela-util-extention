export type FavoriteTemplateList = {
    ids: string[]
}

export const getFavoriteTemplateList: () => Promise<FavoriteTemplateList> = () => {
    return new Promise((resolve) => {
        chrome.storage.sync.get("favoriteTemplateList", rawResult => {
            const { favoriteTemplateList } = rawResult

            const result: FavoriteTemplateList = favoriteTemplateList ? {
                ids: favoriteTemplateList ?? [],
            } : {
                ids: []
            }
            return resolve(result)
        })
    })
}