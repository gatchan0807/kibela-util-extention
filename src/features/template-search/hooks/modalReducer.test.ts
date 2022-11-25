import { Template } from "../store/types"
import { modalReducer, ReducerState } from "./modalReducer"

const defaultState: ReducerState = {
    templateList: [],
    visibleTemplateList: [],
    isFilterByFavorite: false,
    searchInput: "",
}

const TemplateList: Template[] = [
    { title: "テンプレート1", href: "/1", id: "workspace-xxxxx1", isFavorite: false, index: 1, rawElement: {} as Element },
    { title: "テンプレート2", href: "/2", id: "workspace-xxxxx2", isFavorite: false, index: 2, rawElement: {} as Element },
    { title: "テンプレート3", href: "/3", id: "workspace-xxxxx3", isFavorite: false, index: 3, rawElement: {} as Element },
    { title: "テンプレート4", href: "/4", id: "workspace-xxxxx4", isFavorite: true, index: 4, rawElement: {} as Element },
    { title: "テンプレート5", href: "/5", id: "workspace-xxxxx5", isFavorite: true, index: 5, rawElement: {} as Element },
    { title: "テンプレート6", href: "/6", id: "workspace-xxxxx6", isFavorite: false, index: 6, rawElement: {} as Element },
]

const ForSearchWordTemplateList: Template[] = [
    { title: "TITLE-template1", href: "/1", id: "workspace-xxxxx1", isFavorite: false, index: 1, rawElement: {} as Element },
    { title: "TITLE-TEMPLATE2", href: "/2", id: "workspace-xxxxx2", isFavorite: false, index: 2, rawElement: {} as Element },
    { title: "TITLE-Template3", href: "/3", id: "workspace-xxxxx3", isFavorite: false, index: 3, rawElement: {} as Element },
    { title: "TITLE-TeMpLaTe4", href: "/4", id: "workspace-xxxxx4", isFavorite: true, index: 4, rawElement: {} as Element },
    { title: "TITLE-テンプレート5", href: "/5", id: "workspace-xxxxx5", isFavorite: true, index: 5, rawElement: {} as Element },
    { title: "TITLE-てんぷれーと6", href: "/6", id: "workspace-xxxxx6", isFavorite: false, index: 6, rawElement: {} as Element },
]


describe('template-search > reducer > 値のセット', () => {
    test("テンプレート一覧データの初期化ができる", () => {
        const expected = {
            ...defaultState,
            templateList: TemplateList
        }

        const actual = modalReducer(defaultState, { type: "initializeTemplateList", payload: TemplateList })
        expect(actual).toEqual(expected)
    })

    test("テンプレート一覧データに任意の値の設定ができる", () => {
        const expected = {
            ...defaultState,
            templateList: TemplateList.slice(0, 3)
        }

        const actual = modalReducer(defaultState, { type: "setTemplateList", payload: TemplateList.slice(0, 3) })
        expect(actual).toEqual(expected)
    })

    test("お気に入りフィルターをON/OFFできる", () => {
        const expected1 = {
            ...defaultState,
            isFilterByFavorite: true
        }
        const actual1 = modalReducer(defaultState, { type: "setFilterByFavorite", payload: true })
        expect(actual1).toEqual(expected1)

        const expected2 = {
            ...defaultState,
            isFilterByFavorite: false
        }
        const actual2 = modalReducer(defaultState, { type: "setFilterByFavorite", payload: false })
        expect(actual2).toEqual(expected2)
    })

    test("検索用文字列を保持できる", () => {
        const expected1 = {
            ...defaultState,
            searchInput: "テンプレ"
        }
        const actual1 = modalReducer(defaultState, { type: "setSearchInput", payload: "テンプレ" })
        expect(actual1).toEqual(expected1)

        const expected2 = {
            ...defaultState,
            searchInput: "レート4"
        }
        const actual2 = modalReducer(defaultState, { type: "setSearchInput", payload: "レート4" })
        expect(actual2).toEqual(expected2)
    })

    test("画面描画用テンプレート一覧データを設定できる", () => {
        const expected = {
            ...defaultState,
            visibleTemplateList: TemplateList
        }
        const actual = modalReducer(defaultState, { type: "setVisibleTemplateList", payload: TemplateList })
        expect(actual).toEqual(expected)
    })
})

describe('template-search > reducer > 検索キーワードでのフィルタリング', () => {
    test("画面描画用テンプレート一覧データを1つだけ該当する検索ワードでフィルタリングできる", () => {
        const initialState = {
            ...defaultState,
            templateList: ForSearchWordTemplateList,
            visibleTemplateList: ForSearchWordTemplateList,
        }

        const expected = {
            ...defaultState,
            templateList: ForSearchWordTemplateList,
            visibleTemplateList: [ForSearchWordTemplateList[4]],
        }
        const actual = modalReducer(initialState, { type: "filterTemplateList", payload: "テンプレート5" })
        expect(actual).toEqual(expected)
    })

    test("画面描画用テンプレート一覧データをすべて該当する検索ワードでフィルタリングできる", () => {
        const initialState = {
            ...defaultState,
            templateList: ForSearchWordTemplateList,
            visibleTemplateList: ForSearchWordTemplateList,
        }

        const expected = {
            ...defaultState,
            templateList: ForSearchWordTemplateList,
            visibleTemplateList: ForSearchWordTemplateList,
        }
        const actual = modalReducer(initialState, { type: "filterTemplateList", payload: "TITLE" })
        expect(actual).toEqual(expected)
    })

    test("画面描画用テンプレート一覧データを1件も該当しない検索ワードでフィルタリングできる", () => {
        const initialState = {
            ...defaultState,
            templateList: ForSearchWordTemplateList,
            visibleTemplateList: ForSearchWordTemplateList,
        }

        const expected = {
            ...defaultState,
            templateList: ForSearchWordTemplateList,
            visibleTemplateList: [],
        }
        const actual = modalReducer(initialState, { type: "filterTemplateList", payload: "なにもないよ" })
        expect(actual).toEqual(expected)
    })

    test("画面描画用テンプレート一覧データを大文字小文字関係ない検索ワードでフィルタリングできる", () => {
        const initialState = {
            ...defaultState,
            templateList: ForSearchWordTemplateList,
            visibleTemplateList: ForSearchWordTemplateList,
        }

        const expected = {
            ...defaultState,
            templateList: ForSearchWordTemplateList,
            visibleTemplateList: ForSearchWordTemplateList.slice(0, 4),
        }
        const actual = modalReducer(initialState, { type: "filterTemplateList", payload: "tEMPLate" })
        expect(actual).toEqual(expected)
    })

    test("検索条件が入力されていない時に画面描画用テンプレート一覧データがそのまま出る", () => {
        const initialState = {
            ...defaultState,
            templateList: ForSearchWordTemplateList,
            visibleTemplateList: ForSearchWordTemplateList,
        }

        const expected = {
            ...defaultState,
            templateList: ForSearchWordTemplateList,
            visibleTemplateList: ForSearchWordTemplateList,
        }
        const actual = modalReducer(initialState, { type: "filterTemplateList", payload: "" })
        expect(actual).toEqual(expected)
    })
})

describe('template-search > reducer > お気に入り関連', () => {
    test("画面描画用テンプレート一覧データをお気に入りがあるものだけにフィルタリングできる", () => {
        const initialState = {
            ...defaultState,
            templateList: TemplateList,
            visibleTemplateList: TemplateList,
        }

        const expected = {
            ...defaultState,
            templateList: TemplateList,
            visibleTemplateList: [TemplateList[3], TemplateList[4]],
        }
        const actual = modalReducer(initialState, { type: "filterTemplateListByFavorite", payload: true })
        expect(actual).toEqual(expected)
    })

    test("お気に入りのみフィルターがOFFの場合はすべてのテンプレート一覧データが表示される", () => {
        const initialState = {
            ...defaultState,
            templateList: TemplateList,
            visibleTemplateList: TemplateList,
        }

        const expected = {
            ...defaultState,
            templateList: TemplateList,
            visibleTemplateList: TemplateList,
        }
        
        const actual = modalReducer(initialState, { type: "filterTemplateListByFavorite", payload: false })
        expect(actual).toEqual(expected)
    })

    test("テンプレート一覧データのお気に入り状態を更新できる", () => {
        const initialState = {
            ...defaultState,
            templateList: TemplateList
        }

        const expectedTemplateList = [...TemplateList]
        expectedTemplateList[2] = {
            title: "テンプレート3", href: "/3", id: "workspace-xxxxx3", isFavorite: true, index: 3, rawElement: {} as Element
        }

        const expected = {
            ...defaultState,
            templateList: expectedTemplateList
        }

        const actual = modalReducer(initialState, { type: "updateFavorite", payload: "workspace-xxxxx3" })
        expect(actual).toEqual(expected)
    })

    test("存在しないIDを指定した場合はテンプレート一覧データのお気に入り状態を更新しない", () => {
        const initialState = {
            ...defaultState,
            templateList: TemplateList
        }

        const expectedTemplateList = [...TemplateList]
        expectedTemplateList[2] = {
            title: "テンプレート3", href: "/3", id: "workspace-xxxxx3", isFavorite: false, index: 3, rawElement: {} as Element
        }

        const expected = {
            ...defaultState,
            templateList: expectedTemplateList
        }

        const actual = modalReducer(initialState, { type: "updateFavorite", payload: "workspace-abcde" })
        expect(actual).toEqual(expected)
    })
})