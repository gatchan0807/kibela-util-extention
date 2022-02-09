import React from 'react';

export const Settings: React.FC = () => {
  return (
    <div className="text-gray-800">
      <h2 className="text-lg border-b-2 border-cyan-500 pl-2">リンク先設定</h2>
      <div className="pt-2 text-base">
        <input
          className="mx-2"
          type="checkbox"
          name="always-open-another-tab"
          id="always-open-another-tab"
        />
        <label
          className="hover:cursor-pointer"
          htmlFor="always-open-another-tab"
        >
          デフォルトでリンクを別タブで開く
        </label>
      </div>
      <div className="pb-2 text-base">
        <input
          className="mx-2"
          type="checkbox"
          name="in-kibela-link-open-same-tab"
          id="in-kibela-link-open-same-tab"
        />
        <label
          className="leading-tight hover:cursor-pointer"
          htmlFor="in-kibela-link-open-same-tab"
        >
          Kibela内の別記事 / ユーザーページへのリンクは同じタブで開く
        </label>
      </div>
      <div className="w-11/12 mx-auto border-b border-gray-300">
        {/* spacer */}
      </div>
      <div className="py-2 text-base">
        <h3 className="text-base mb-4 pl-2 border-b border-cyan-500">
          例外指定
        </h3>
        <input
          className="block w-full px-2 mb-2 border border-cyan-500 rounded"
          type="text"
          name="url-pattern-form"
          id="url-pattern-form"
          placeholder="https://*.example.com/*"
        />
        <p className="text-xs text-cyan-600 leading-tight whitespace-nowrap">
          *リンク先のURLが
          <wbr />
          下記パターンに一致する場合は
          <wbr />
          別タブで開かない
        </p>
        <ul className="text-sm mt-2">
          <li className="ml-6 pb-1 list-disc">https://*.example.com/*</li>
          <li className="ml-6 pb-1 list-disc">https://*.example.com/*</li>
        </ul>
      </div>
    </div>
  );
};
