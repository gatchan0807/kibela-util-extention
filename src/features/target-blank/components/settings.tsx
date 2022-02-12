import React, { useEffect, useReducer, useState } from 'react';
import { localSettingsReducer, State } from '../hooks/localSettingsReducer';
import { ExcludeUrl } from '../types';
import {
  getSettingsAboutTargetBlank,
  setChromeStorage,
  sha256,
} from '../utils';


export const Settings: React.FC = () => {
  const initialExcludeUrlList: ExcludeUrl[] = [];
  const [alwaysOpenOtherTab, setAlwaysOpenOtherTab] = useState(true);
  const [inKibelaLinkOpenSameTab, setInKibelaLinkOpenSameTab] = useState(false);
  const [excludeUrlInput, setExcludeUrlInput] = useState('');
  const [excludeUrlList, setExcludeUrlList] = useState(initialExcludeUrlList);
  const [excludeUrlInputValidation, setExcludeUrlInputValidation] =
    useState('');

  const initState: State = {
    alwaysOpenOtherTab: true,
    inKibelaLinkOpenSameTab: false,
    excludeUrlInput: '',
    excludeUrlList: [],
    excludeUrlInputValidation: '',
  };

  const [localSettings, dispatch] = useReducer(localSettingsReducer, initState);

  const excludeUrlInputHandler = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!excludeUrlInput.match(/^https?:\/\/[-_.a-zA-Z0-9\/:]+/g)) {
        setExcludeUrlInputValidation(
          'https://から始まるURLの記法で入力してください'
        );
        return;
      }

      const { host } = new URL(excludeUrlInput);
      const id = await sha256(host);
      if (excludeUrlList.find((item) => item.id === id)) {
        setExcludeUrlInputValidation('すでに同じ例外ドメインが登録済みです');
        return;
      }

      const targetBlankSettings = await getSettingsAboutTargetBlank();
      const urlList: ExcludeUrl[] = targetBlankSettings.excludeUrlList ?? [];

      urlList.push({ url: excludeUrlInput, id, host });

      setExcludeUrlList(urlList);
      setExcludeUrlInputValidation('');
      setExcludeUrlInput('');
    }
  };

  const excludeUrlDeleteHandler = async (id: string) => {
    const targetBlankSettings = await getSettingsAboutTargetBlank();
    const urlList = (targetBlankSettings.excludeUrlList as ExcludeUrl[]) ?? [];
    const deletedUrlList = urlList.filter((urlItem) => urlItem.id !== id);

    setExcludeUrlList(deletedUrlList);
    setChromeStorage({
      ...targetBlankSettings,
      excludeUrlList: deletedUrlList,
    });
  };

  useEffect(() => {
    (async () => {
      const targetBlankSettings = await getSettingsAboutTargetBlank();
      setAlwaysOpenOtherTab(targetBlankSettings.alwaysOpenOtherTab);
      setInKibelaLinkOpenSameTab(targetBlankSettings.inKibelaLinkOpenSameTab);
      setExcludeUrlList(targetBlankSettings.excludeUrlList);
    })();
  }, []);

  useEffect(() => {
    setChromeStorage({
      inKibelaLinkOpenSameTab,
      alwaysOpenOtherTab,
      excludeUrlList,
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
          例外ドメイン指定
        </h3>
        <input
          className="block w-full px-2 mb-2 border border-cyan-500 rounded"
          type="text"
          name="url-pattern-form"
          id="url-pattern-form"
          value={excludeUrlInput}
          onChange={(e) => setExcludeUrlInput(e.target.value)}
          onKeyPress={(e) => excludeUrlInputHandler(e)}
          placeholder="https://example.com/"
        />
        <p className="pb-2 text-xs text-red-700 leading-tight whitespace-nowrap">
          {excludeUrlInputValidation}
        </p>
        <p className="text-xs text-cyan-600 leading-tight whitespace-nowrap">
          *リンク先のドメインが
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
