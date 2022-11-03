export type Action =
    { type: 'setUseTemplateSearch', payload: boolean }


export type UIState = {
    featureSwitch: boolean;
};

export const localSettingsReducer = (state: UIState, action: Action): UIState => {
    if (action.type === "setUseTemplateSearch") {
        return {
            ...state,
            featureSwitch: action.payload,
        }
    }
    return state;
};
