import { getFavoriteTemplateList } from "../store/getFavoriteTemplateList";
import { Action } from "./modalReducer";

export const initializeModalState = async (dispatch: React.Dispatch<Action>) => {
    const favoriteTemplateList = await getFavoriteTemplateList();
    dispatch({
        type: "setIdList",
        payload: favoriteTemplateList.ids
    });
};