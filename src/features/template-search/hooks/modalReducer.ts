import { Template } from "../store/types";

export type Action =
    { type: 'initializeTemplateList', payload: Template[] } |
    { type: 'setTemplateList', payload: Template[] } |
    { type: 'setIdList', payload: string[] } |
    { type: 'setSearchInput', payload: string } |
    { type: 'setVisibleTemplateList', payload: Template[] } |
    { type: 'filterTemplateList', payload: string } |
    { type: 'updateFavorite', payload: string }

export type ReducerState = {
    templateList: Template[],
    visibleTemplateList: Template[],
    ids: string[],
    searchInput: string,
}

export const modalReducer = (state: ReducerState, action: Action): ReducerState => {
    if (action.type === "initializeTemplateList" || action.type === "setTemplateList") {
        return {
            ...state,
            templateList: action.payload
        }
    }
    if (action.type === "setIdList") {
        return {
            ...state,
            ids: action.payload,
        }
    }
    if (action.type === "setSearchInput") {
        return {
            ...state,
            searchInput: action.payload,
        }
    }
    if (action.type === "setVisibleTemplateList") {
        return {
            ...state,
            visibleTemplateList: action.payload
        }
    }
    if (action.type === "filterTemplateList") {
        return filterTemplateList({ state, condition: action.payload })
    }
    if (action.type === "updateFavorite") {
        return updateFavorite({ state, id: action.payload })
    }
    return state;
};

const filterTemplateList = ({ state, condition }: { state: ReducerState, condition: string }): ReducerState => {
    if (condition.length <= 0) {
        return {
            ...state,
            visibleTemplateList: state.templateList
        }
    }

    const filtered = state.templateList.filter((t) => {
        return (
            t.title.indexOf(condition) !== -1 ||
            t.title.toUpperCase().indexOf(condition.toUpperCase()) !== -1 ||
            t.title.toLowerCase().indexOf(condition.toLowerCase()) !== -1
        );
    });

    return {
        ...state,
        visibleTemplateList: filtered
    }
}

const updateFavorite = ({ state, id }: { state: ReducerState, id: string }): ReducerState => {
    const { templateList } = state;
    const index = templateList.findIndex((t) => t.id === id);
    if (!templateList[index]) return { ...state }

    const updated = {
        ...templateList[index],
        isFavorite: !templateList[index].isFavorite,
    };
    const updatedTemplates = [...templateList];
    updatedTemplates[index] = updated;

    return {
        ...state,
        templateList: updatedTemplates
    }
}