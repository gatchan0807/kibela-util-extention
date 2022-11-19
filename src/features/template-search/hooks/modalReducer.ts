import { Template } from "../store/types";

export type Action =
    { type: 'initializeTemplateList', payload: Template[] } |
    { type: 'setTemplateList', payload: Template[] } |
    { type: 'setFilterByFavorite', payload: boolean } |
    { type: 'setSearchInput', payload: string } |
    { type: 'setVisibleTemplateList', payload: Template[] } |
    { type: 'filterTemplateList', payload: string } |
    { type: 'updateFavorite', payload: string } |
    { type: 'filterTemplateListByFavorite', payload: boolean }

export type ReducerState = {
    templateList: Template[],
    visibleTemplateList: Template[],
    isFilterByFavorite: boolean,
    searchInput: string,
}

export const modalReducer = (state: ReducerState, action: Action): ReducerState => {
    if (action.type === "initializeTemplateList" || action.type === "setTemplateList") {
        return {
            ...state,
            templateList: action.payload
        }
    }
    if (action.type === "setFilterByFavorite") {
        return {
            ...state,
            isFilterByFavorite: action.payload,
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
        return {
            ...state,
            visibleTemplateList: filterTemplateList({ templateList: state.templateList, condition: action.payload })
        }
    }
    if (action.type === "updateFavorite") {
        return {
            ...state,
            templateList: updateFavorite({ templateList: state.templateList, id: action.payload })
        }
    }
    if (action.type === "filterTemplateListByFavorite") {
        return {
            ...state,
            visibleTemplateList: action.payload ? state.visibleTemplateList.filter(t => t.isFavorite) : state.visibleTemplateList
        }
    }
    return state;
};

const filterTemplateList = ({ templateList, condition }: { templateList: Template[], condition: string }): Template[] => {
    if (condition.length <= 0) {
        return templateList
    }

    return templateList.filter((t) => {
        return (
            t.title.indexOf(condition) !== -1 ||
            t.title.toUpperCase().indexOf(condition.toUpperCase()) !== -1 ||
            t.title.toLowerCase().indexOf(condition.toLowerCase()) !== -1
        );
    });
}

const updateFavorite = ({ templateList, id }: { templateList: Template[], id: string }): Template[] => {
    const index = templateList.findIndex((t) => t.id === id);
    if (!templateList[index]) return templateList

    const updated = {
        ...templateList[index],
        isFavorite: !templateList[index].isFavorite,
    };
    const updatedTemplates = [...templateList];
    updatedTemplates[index] = updated;

    return updatedTemplates
}