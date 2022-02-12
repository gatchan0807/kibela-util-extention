import { ExcludeUrl } from "../types";

export type Action = {
    type: '';
};

export type State = {
    alwaysOpenOtherTab: boolean;
    inKibelaLinkOpenSameTab: boolean;
    excludeUrlInput: string;
    excludeUrlList: ExcludeUrl[];
    excludeUrlInputValidation: string;
};

export const localSettingsReducer = (state: State, action: Action): State => {
    return state;
};
