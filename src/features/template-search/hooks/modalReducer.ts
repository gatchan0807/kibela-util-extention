import { Template } from "../store/types";

export type Action =
    { type: 'setTemplateList', payload: Template[] } |
    { type: 'setIdList', payload: string[] }

export type UIState = {
    templateList: Template[],
    ids: string[]
}

export const modalReducer = (state: UIState, action: Action): UIState => {
    if (action.type === "setIdList") {
        return {
            ...state,
            ids: action.payload,
        }
    }
    return state;
};