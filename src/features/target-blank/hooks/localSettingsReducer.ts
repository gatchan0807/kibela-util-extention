import { ExcludeUrl } from "../types";

type ActionType = 'setAlwaysOpenOtherTab' | 'setInKibelaLinkOpenSameTab'

type Action = {
    type: ActionType;
    payload?: unknown
};

export type State = {
    alwaysOpenOtherTab: boolean;
    inKibelaLinkOpenSameTab: boolean;
    excludeUrlInput: string;
    excludeUrlList: ExcludeUrl[];
    excludeUrlInputValidation: string;
};

export const localSettingsReducer = (state: State, action: Action): State => {
    if (action.type === "setAlwaysOpenOtherTab") {
        const bool = typeof action.payload === "boolean" ? action.payload : false
        return {
            ...state,
            alwaysOpenOtherTab: bool
        }
    }
    if (action.type === "setInKibelaLinkOpenSameTab") {
        const bool = typeof action.payload === "boolean" ? action.payload : false
        return {
            ...state,
            inKibelaLinkOpenSameTab: bool
        }
    }
    return state;
};
