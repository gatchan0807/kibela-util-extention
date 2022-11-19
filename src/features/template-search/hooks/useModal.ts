import { useReducer, useEffect } from "react";
import { setFavoriteTemplateListToChromeStorage } from "../store/setFavoriteTemplateListToChromeStorage";
import { Template } from "../store/types";
import { modalReducer, ReducerState } from "./modalReducer";

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

    const [modal, dispatch] = useReducer(modalReducer, initialState);

    // memo: 子要素のお気に入りボタン押下にフックして、テンプレート一覧のアップデート
    const updateId = (id: string) => {
        dispatch({ type: 'updateFavorite', payload: id });
        dispatch({ type: 'filterTemplateList', payload: modal.searchInput });
    };

    const setSearchInput = (value: string) => {
        dispatch({ type: 'setSearchInput', payload: value });
    }

    const toggleFavoriteFilter = (value: boolean) => {
        dispatch({ type: "setFilterByFavorite", payload: value })
    }

    // memo: 初期化
    useEffect(() => {
        dispatch({ type: 'initializeTemplateList', payload: props.templates });
    }, []);

    // memo: 検索ワードに基づいて表示リストのフィルタリング + アップデート
    useEffect(() => {
        dispatch({ type: 'filterTemplateList', payload: modal.searchInput });
    }, [modal.searchInput]);

    // memo: Chrome StorageへのIDリストの保存
    useEffect(() => {
        setFavoriteTemplateListToChromeStorage({
            ids: modal.templateList.filter((t) => t.isFavorite).map((t) => t.id),
        });
    }, [modal.templateList]);

    return {
        modal,
        updateId,
        setSearchInput,
        toggleFavoriteFilter,
    }
}