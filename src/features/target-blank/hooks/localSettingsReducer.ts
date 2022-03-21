import { ExcludeUrl } from "../types";

export type Action =
    { type: 'setAlwaysOpenOtherTab', payload: boolean } |
    { type: 'setInKibelaLinkOpenSameTab', payload: boolean } |
    { type: 'setExcludeUrlInputValidation', payload: string } |
    { type: 'setExcludeUrlInput', payload: string } |
    { type: "setExcludeUrlList", payload: ExcludeUrl[] }


export type State = {
    alwaysOpenOtherTab: boolean;
    inKibelaLinkOpenSameTab: boolean;
    excludeUrlInput: string;
    excludeUrlList: ExcludeUrl[];
    excludeUrlInputValidation: string;
};

export const localSettingsReducer = (state: State, action: Action): State => {
    if (action.type === "setAlwaysOpenOtherTab") {
        return {
            ...state,
            alwaysOpenOtherTab: action.payload
        }
    }
    if (action.type === "setInKibelaLinkOpenSameTab") {
        return {
            ...state,
            inKibelaLinkOpenSameTab: action.payload
        }
    }
    if (action.type === "setExcludeUrlInputValidation") {
        return {
            ...state,
            excludeUrlInputValidation: action.payload
        }
    }
    if (action.type === "setExcludeUrlInput") {
        return {
            ...state,
            excludeUrlInput: action.payload
        }
    }
    if (action.type === "setExcludeUrlList") {
        return {
            ...state,
            excludeUrlList: action.payload
        }
    }
    return state;
};
