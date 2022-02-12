import React, { useEffect, useState } from 'react';

type ExcludeUrl = {
  id: string;
  url: string;
};

const sha256 = async (text: string) => {
  const uint8 = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', uint8);
  return Array.from(new Uint8Array(digest))
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('');
};

export const Settings: React.FC = () => {
  const initialExcludeUrlList: ExcludeUrl[] = [];
  const [alwaysOpenOtherTab, setAlwaysOpenOtherTab] = useState(true);
  const [inKibelaLinkOpenSameTab, setInKibelaLinkOpenSameTab] = useState(false);
  const [excludeUrlInput, setExcludeUrlInput] = useState('');
  const [excludeUrlList, setExcludeUrlList] = useState(initialExcludeUrlList);
  const [excludeUrlInputValidation, setExcludeUrlInputValidation] =
    useState('');

  const excludeUrlInputHandler = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const id = await sha256(excludeUrlInput);

      if (!excludeUrlInput.match(/^https\:\/\/[\*\w-]+\.[\*\w-]+[\*\w\/-]*/)) {
        setExcludeUrlInputValidation(
          'https://から始まるURLの記法で入力してください'
        );
        return;
      }
      if (excludeUrlList.find((item) => item.id === id)) {
        setExcludeUrlInputValidation('すでに同じ例外パターンが登録済みです');
        return;
      }

      chrome.storage.sync.get('targetBlankSettings', async (rawResult) => {
        const { targetBlankSettings } = rawResult;
        const urlList: ExcludeUrl[] = targetBlankSettings.excludeUrlList ?? [];

        urlList.push({ url: excludeUrlInput, id });

        setExcludeUrlList(urlList);
        setExcludeUrlInputValidation('');
        setExcludeUrlInput('');
      });
    }
  };

  const excludeUrlDeleteHandler = (id: string) => {
    chrome.storage.sync.get('targetBlankSettings', async (rawResult) => {
      const { targetBlankSettings } = rawResult;
      let urlList = (targetBlankSettings.excludeUrlList as ExcludeUrl[]) ?? [];

      const selectedIndex = urlList.findIndex((urlItem) => urlItem.id === id);
      delete urlList[selectedIndex];
      urlList = urlList.filter(Boolean);

      setExcludeUrlList(urlList);
      chrome.storage.sync.set({
        targetBlankSettings: {
          ...targetBlankSettings,
          excludeUrlList: urlList,
        },
      });
    });
  };

  useEffect(() => {
    chrome.storage.sync.get('targetBlankSettings', (rawResult) => {
      const { targetBlankSettings } = rawResult;
      setAlwaysOpenOtherTab(targetBlankSettings.alwaysOpenOtherTab);
      setInKibelaLinkOpenSameTab(targetBlankSettings.inKibelaLinkOpenSameTab);
      setExcludeUrlList(targetBlankSettings.excludeUrlList);
    });
  }, []);

  useEffect(() => {
    chrome.storage.sync.get('targetBlankSettings', (rawResult) => {
      const { targetBlankSettings } = rawResult;

      chrome.storage.sync.set({
        targetBlankSettings: {
          ...targetBlankSettings,
          inKibelaLinkOpenSameTab,
          alwaysOpenOtherTab,
          excludeUrlList,
        },
      });
    });
  }, [alwaysOpenOtherTab, inKibelaLinkOpenSameTab, excludeUrlList]);

  return (
    <div className="text-gray-800">
      <h2 className="text-lg border-b-2 border-cyan-500 pl-2">リンク先設定</h2>
      <div className="pt-2 text-base">
        <input
          className="mx-2"
          type="checkbox"
          name="always-open-another-tab"
          id="always-open-another-tab"
          checked={alwaysOpenOtherTab}
          onChange={() => setAlwaysOpenOtherTab(!alwaysOpenOtherTab)}
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
          checked={inKibelaLinkOpenSameTab}
          onChange={() => setInKibelaLinkOpenSameTab(!inKibelaLinkOpenSameTab)}
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
          value={excludeUrlInput}
          onChange={(e) => setExcludeUrlInput(e.target.value)}
          onKeyPress={(e) => excludeUrlInputHandler(e)}
          placeholder="https://*.example.com/*"
        />
        <p className="pb-2 text-xs text-red-700 leading-tight whitespace-nowrap">
          {excludeUrlInputValidation}
        </p>
        <p className="text-xs text-cyan-600 leading-tight whitespace-nowrap">
          *リンク先のURLが
          <wbr />
          下記パターンに一致する場合は
          <wbr />
          別タブで開かない
        </p>
        <ul className="text-sm mt-2">
          {excludeUrlList.map(({ url, id }) => (
            <li className="ml-6 pb-1 list-disc" key={id} data-id={id}>
              {url}
              <button
                className="bg-cyan-600 text-white px-4 ml-2 rounded-md hover:bg-cyan-500"
                onClick={(_) => excludeUrlDeleteHandler(id)}
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
