import { sha256 } from "./sha256";

describe('util > sha256', () => {

    test('sha256 関数が空文字を元に複数回呼んでも同じIDを出力できる', async () => {
        const expected = await sha256("")
        const actual = await sha256("")

        expect(expected).toEqual(actual)
    })

    test('sha256 関数が同じhost名を元に複数回呼んでも同じIDを出力できる', async () => {
        const expected = await sha256("example.com")
        const actual = await sha256("example.com")

        expect(expected).toEqual(actual)
    })

    test('sha256 関数が異なるhost名を元に複数回呼ぶと異なるIDを出力できる', async () => {
        const expected = await sha256("example.com")
        const actual = await sha256("a.example.com")

        expect(expected).not.toEqual(actual)
    })
})