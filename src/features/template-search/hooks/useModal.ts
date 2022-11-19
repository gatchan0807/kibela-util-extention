import React, { useReducer, useEffect } from "react";
import { setFavoriteTemplateListToChromeStorage } from "../store/setFavoriteTemplateListToChromeStorage";
import { Template } from "../store/types";
import { Action, modalReducer, ReducerState } from "./modalReducer";

type Props = {
    templates: Template[];
    toggleModal: (array: Template[]) => void;
};

export const useModal = (props: Props) => {
    const initialState: ReducerState = {
        isFilterByFavorite: false,
        searchInput: '',
        templateList: props.templates,
        visibleTemplateList: props.templates,
    };

    const [property, dispatch] = useReducer(modalReducer, initialState);
    const handlers = createHandlers(property, dispatch)

    // memo: 初期化
    useEffect(() => {
        dispatch({ type: 'initializeTemplateList', payload: props.templates });
    }, []);

    // memo: 検索ワードに基づいて表示リストのフィルタリング + アップデート
    useEffect(() => {
        dispatch({ type: 'filterTemplateList', payload: property.searchInput });
        dispatch({ type: "filterTemplateListByFavorite", payload: property.isFilterByFavorite })
    }, [property.searchInput, property.isFilterByFavorite]);

    // memo: Chrome StorageへのIDリストの保存
    useEffect(() => {
        setFavoriteTemplateListToChromeStorage({
            ids: property.templateList.filter((t) => t.isFavorite).map((t) => t.id),
        });
    }, [property.templateList]);

    return {
        property,
        handlers,
    }
}

const createHandlers = (property: ReducerState, dispatch: React.Dispatch<Action>) => {
    const setSearchInput = (value: string) => {
        dispatch({ type: 'setSearchInput', payload: value });
    }

    const toggleFavorite = (id: string) => {
        dispatch({ type: 'updateFavorite', payload: id });
        dispatch({ type: 'filterTemplateList', payload: property.searchInput });
        dispatch({ type: "filterTemplateListByFavorite", payload: property.isFilterByFavorite })
    };

    const toggleFavoriteFilter = (value: boolean) => {
        dispatch({ type: "setFilterByFavorite", payload: value })
    }

    return {
        toggleFavorite,
        setSearchInput,
        toggleFavoriteFilter
    }
}