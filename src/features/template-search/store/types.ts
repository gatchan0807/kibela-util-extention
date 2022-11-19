export type FavoriteTemplateList = {
    ids: string[]
}

export type TemplateSearchSettings = {
    featureUsage: boolean
}

export type Template = DOMElement & {
    isFavorite: boolean,
    id: string
}

export type DOMElement = {
    title: string,
    href: string,
    index: number,
    rawElement: Element,
}