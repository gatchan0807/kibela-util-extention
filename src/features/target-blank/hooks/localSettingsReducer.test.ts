import { localSettingsReducer, State } from "./localSettingsReducer"

describe('target-blank > reducer', () => {
    let initialState: State = {
        alwaysOpenOtherTab: false,
        inKibelaLinkOpenSameTab: false,
        excludeUrlInput: "",
        excludeUrlList: [],
        excludeUrlInputValidation: "",
    }

    beforeEach(() => {
        initialState = {
            alwaysOpenOtherTab: false,
            inKibelaLinkOpenSameTab: false,
            excludeUrlInput: "",
            excludeUrlList: [],
            excludeUrlInputValidation: "",
        }
    })

    test("alwaysOpenOtherTab のみBooleanの値で更新する", () => {
        const expected1: State = {
            ...initialState,
            alwaysOpenOtherTab: false
        }

        const actual1 = localSettingsReducer(initialState, { type: "setAlwaysOpenOtherTab", payload: false })
        expect(actual1).toEqual(expected1)

        const expected2 = {
            ...initialState,
            alwaysOpenOtherTab: true
        }
        const actual2 = localSettingsReducer(initialState, { type: "setAlwaysOpenOtherTab", payload: true })
        expect(actual2).toEqual(expected2)
    })

    test("inKibelaLinkOpenSameTab のみBooleanの値で更新する", () => {
        const expected1: State = {
            ...initialState,
            inKibelaLinkOpenSameTab: false
        }

        const actual1 = localSettingsReducer(initialState, { type: "setInKibelaLinkOpenSameTab", payload: false })
        expect(actual1).toEqual(expected1)

        const expected2: State = {
            ...initialState,
            inKibelaLinkOpenSameTab: true
        }
        const actual2 = localSettingsReducer(initialState, { type: "setInKibelaLinkOpenSameTab", payload: true })
        expect(actual2).toEqual(expected2)
    })

    test("excludeUrlInput のみString（URL）の値で更新する", () => {
        const expected1: State = {
            ...initialState,
            excludeUrlInput: ""
        }

        const actual1 = localSettingsReducer(initialState, { type: "setExcludeUrlInput", payload: "" })
        expect(actual1).toEqual(expected1)

        const expected2: State = {
            ...initialState,
            excludeUrlInput: "https://example.com"
        }
        const actual2 = localSettingsReducer(initialState, { type: "setExcludeUrlInput", payload: "https://example.com" })
        expect(actual2).toEqual(expected2)
    })

    test("excludeUrlInputValidation のみString（エラー文言）の値で更新する", () => {
        const expected1: State = {
            ...initialState,
            excludeUrlInputValidation: ""
        }

        const actual1 = localSettingsReducer(initialState, { type: "setExcludeUrlInputValidation", payload: "" })
        expect(actual1).toEqual(expected1)

        const expected2: State = {
            ...initialState,
            excludeUrlInputValidation: "https://から始まるURLの記法で入力してください"
        }
        const actual2 = localSettingsReducer(initialState, { type: "setExcludeUrlInputValidation", payload: "https://から始まるURLの記法で入力してください" })
        expect(actual2).toEqual(expected2)

        const expected3: State = {
            ...initialState,
            excludeUrlInputValidation: "すでに同じ例外ドメインが登録済みです"
        }
        const actual3 = localSettingsReducer(initialState, { type: "setExcludeUrlInputValidation", payload: "すでに同じ例外ドメインが登録済みです" })
        expect(actual3).toEqual(expected3)
    })

    test("excludeUrlList のみExcludeUrl型の配列の値で更新する", () => {
        const expected1: State = {
            ...initialState,
            excludeUrlList: []
        }

        const actual1 = localSettingsReducer(initialState, {
            type: "setExcludeUrlList", payload: []
        })
        expect(actual1).toEqual(expected1)

        const expected2: State = {
            ...initialState,
            excludeUrlList: [
                { id: "", url: "", host: "" }
            ]
        }
        const actual2 = localSettingsReducer(initialState, {
            type: "setExcludeUrlList", payload: [
                { id: "", url: "", host: "" }
            ]
        })
        expect(actual2).toEqual(expected2)

        const expected3: State = {
            ...initialState,
            excludeUrlList: [{
                id: "id1",
                url: "https://example.com",
                host: "example.com"
            }]
        }
        const actual3 = localSettingsReducer(initialState, {
            type: "setExcludeUrlList", payload: [
                { id: "id1", url: "https://example.com", host: "example.com" }
            ]
        })
        expect(actual3).toEqual(expected3)
    })


})