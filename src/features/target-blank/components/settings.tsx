import React from "react"

export const Settings: React.FC = () => {
    return (
        <div>
            <input type="checkbox" name="always-open-another-tab" id="always-open-another-tab" checked />
            <label htmlFor="always-open-another-tab">デフォルトでリンクを別タブで開く</label>
            <hr />
            <div>
                <label htmlFor="url-pattern-form">URLが下記パターンに一致する場合は別タブで開かない</label>
                <input type="text" name="url-pattern-form" id="url-pattern-form" placeholder="https://*.example.com/*" />
                <ul>
                    <li>https://*.example.com/*</li>
                </ul>
            </div>
        </div>
    )
}