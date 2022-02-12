export type TargetBlankSettings = {
    alwaysOpenOtherTab: boolean
    inKibelaLinkOpenSameTab: boolean
    excludeUrlList: ExcludeUrl[]
}

export type ExcludeUrl = {
    id: string;
    url: string;
};
