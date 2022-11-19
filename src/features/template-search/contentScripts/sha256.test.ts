import { sha256 } from "./sha256";

describe('util > sha256', () => {

    test('sha256 関数が空文字を元に複数回呼んでも同じIDを出力できる', async () => {
        const expected = await sha256("")
        const actual = await sha256("")

        expect(expected).toEqual(actual)
    })

    test('sha256 関数が同じテンプレート名を元に複数回呼んでも同じIDを出力できる', async () => {
        const expected = await sha256("テンプレート1")
        const actual = await sha256("テンプレート1")

        expect(expected).toEqual(actual)
    })

    test('sha256 関数が異なるテンプレート名を元に複数回呼ぶと異なるIDを出力できる', async () => {
        const expected = await sha256("テンプレート1")
        const actual = await sha256("テンプレート2")

        expect(expected).not.toEqual(actual)
    })
})