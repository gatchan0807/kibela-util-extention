export type TargetBlankSettings = {
    alwaysOpenOtherTab: boolean
    inKibelaLinkOpenSameTab: boolean
    isOpenOtherTabInPreview: boolean
    excludeUrlList: ExcludeUrl[]
}

export type ExcludeUrl = {
    id: string;
    url: string;
    host: string;
};

export type DOMElement = {
    href: string,
    className: string,
    idName: string,
    isSameSiteLink: boolean,
    isUserMention: boolean,
    isAnchorLink: boolean,
    hasTargetBlank: boolean,
    setTargetBlankAttribute: (e: Element) => void,
    rawElement: Element,
}

export type EffectsDomFunction = ({ elements, settings }: { elements: DOMElement[], settings: TargetBlankSettings }) => void
