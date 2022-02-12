import { ExcludeUrl } from "../types";

type ActionType = 'setAlwaysOpenOtherTab' | 'setInKibelaLinkOpenSameTab' | 'setExcludeUrlInputValidation' | 'setExcludeUrlInput' | "setExcludeUrlList"

export type Action = {
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
        const payloadBoolean = typeof action.payload === "boolean" ? action.payload : false
        return {
            ...state,
            alwaysOpenOtherTab: payloadBoolean
        }
    }
    if (action.type === "setInKibelaLinkOpenSameTab") {
        const payloadBoolean = typeof action.payload === "boolean" ? action.payload : false
        return {
            ...state,
            inKibelaLinkOpenSameTab: payloadBoolean
        }
    }
    if (action.type === "setExcludeUrlInputValidation") {
        const payloadString = typeof action.payload === "string" ? action.payload : ""
        return {
            ...state,
            excludeUrlInputValidation: payloadString
        }
    }
    if (action.type === "setExcludeUrlInput") {
        const payloadString = typeof action.payload === "string" ? action.payload : ""
        return {
            ...state,
            excludeUrlInput: payloadString
        }
    }
    if (action.type === "setExcludeUrlList") {
        const payloadArray = Array.isArray(action.payload) ? action.payload : []
        return {
            ...state,
            excludeUrlList: payloadArray
        }
    }
    return state;
};
