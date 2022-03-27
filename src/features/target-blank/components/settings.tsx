import React, { useEffect, useReducer } from 'react';
import { excludeUrlDeleteHandler, excludeUrlInputHandler } from '../handler';
import { localSettingsReducer, State } from '../hooks/localSettingsReducer';
import { initializeState, setChromeStorage } from '../utils';

export const Settings: React.FC = () => {
  const initState: State = {
    alwaysOpenOtherTab: true,
    inKibelaLinkOpenSameTab: false,
    isOpenOtherTabInPreview: true,
    excludeUrlInput: '',
    excludeUrlList: [],
    excludeUrlInputValidation: '',
  };

  const [localSettings, dispatch] = useReducer(localSettingsReducer, initState);

  useEffect(() => {
    initializeState(dispatch);
  }, []);

  useEffect(() => {
    setChromeStorage({
      alwaysOpenOtherTab: localSettings.alwaysOpenOtherTab,
      inKibelaLinkOpenSameTab: localSettings.inKibelaLinkOpenSameTab,
      isOpenOtherTabInPreview: localSettings.isOpenOtherTabInPreview,
      excludeUrlList: localSettings.excludeUrlList,
    });
  }, [
    localSettings.alwaysOpenOtherTab,
    localSettings.inKibelaLinkOpenSameTab,
    localSettings.isOpenOtherTabInPreview,
    localSettings.excludeUrlList,
  ]);

  return (
    <div className="text-gray-800">
      <h2 className="pl-2 text-lg border-b-2 border-cyan-500">リンク先設定</h2>
      <div className="pt-2 text-base">
        <input
          className="mx-2"
          type="checkbox"
          name="always-open-another-tab"
          id="always-open-another-tab"
          checked={localSettings.alwaysOpenOtherTab}
          onChange={() =>
            dispatch({
              type: 'setAlwaysOpenOtherTab',
              payload: !localSettings.alwaysOpenOtherTab,
            })
          }
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
          checked={localSettings.inKibelaLinkOpenSameTab}
          onChange={() =>
            dispatch({
              type: 'setInKibelaLinkOpenSameTab',
              payload: !localSettings.inKibelaLinkOpenSameTab,
            })
          }
        />
        <label
          className="leading-tight hover:cursor-pointer"
          htmlFor="in-kibela-link-open-same-tab"
        >
          Kibela内の別記事 / ユーザーページへのリンクは同じタブで開く
        </label>
      </div>
      <div className="mx-auto w-11/12 border-b border-gray-300">
        {/* spacer */}
      </div>
      <div className="py-2 text-base">
        <h3 className="pl-2 mb-4 text-base border-b border-cyan-500">
          例外ドメイン指定
        </h3>
        <input
          className="block px-2 mb-2 w-full rounded border border-cyan-500"
          type="text"
          name="url-pattern-form"
          id="url-pattern-form"
          value={localSettings.excludeUrlInput}
          onChange={(e) =>
            dispatch({ type: 'setExcludeUrlInput', payload: e.target.value })
          }
          onKeyPress={(e) =>
            excludeUrlInputHandler(e, { localSettings, dispatch })
          }
          placeholder="https://example.com/"
        />
        <p className="pb-2 text-xs leading-tight text-red-700 whitespace-nowrap">
          {localSettings.excludeUrlInputValidation}
        </p>
        <p className="text-xs leading-tight text-cyan-600 whitespace-nowrap">
          *リンク先のドメインが
          <wbr />
          下記パターンに一致する場合は
          <wbr />
          別タブで開かない
        </p>
        <ul className="mt-2 text-sm">
          {localSettings.excludeUrlList.map(({ url, id }) => (
            <li className="pb-1 ml-6 list-disc" key={id} data-id={id}>
              {url}
              <button
                className="px-4 ml-2 text-white bg-cyan-600 hover:bg-cyan-500 rounded-md"
                onClick={() => excludeUrlDeleteHandler(id, { dispatch })}
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
