import React, { useEffect, useReducer } from 'react';
import { excludeUrlDeleteHandler, excludeUrlInputHandler } from '../handler';
import { localSettingsReducer, State } from '../hooks/localSettingsReducer';
import { initializeState, setChromeStorage } from '../utils';

export const Settings: React.FC = () => {
  const initState: State = {
    alwaysOpenOtherTab: true,
    inKibelaLinkOpenSameTab: false,
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
      excludeUrlList: localSettings.excludeUrlList,
    });
  }, [
    localSettings.alwaysOpenOtherTab,
    localSettings.inKibelaLinkOpenSameTab,
    localSettings.excludeUrlList,
  ]);

  return (
    <div className="text-gray-800">
      <h2 className="text-lg border-b-2 border-cyan-500 pl-2">リンク先設定</h2>
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
          value={localSettings.excludeUrlInput}
          onChange={(e) =>
            dispatch({ type: 'setExcludeUrlInput', payload: e.target.value })
          }
          onKeyPress={(e) =>
            excludeUrlInputHandler(e, { localSettings, dispatch })
          }
          placeholder="https://example.com/"
        />
        <p className="pb-2 text-xs text-red-700 leading-tight whitespace-nowrap">
          {localSettings.excludeUrlInputValidation}
        </p>
        <p className="text-xs text-cyan-600 leading-tight whitespace-nowrap">
          *リンク先のドメインが
          <wbr />
          下記パターンに一致する場合は
          <wbr />
          別タブで開かない
        </p>
        <ul className="text-sm mt-2">
          {localSettings.excludeUrlList.map(({ url, id }) => (
            <li className="ml-6 pb-1 list-disc" key={id} data-id={id}>
              {url}
              <button
                className="bg-cyan-600 text-white px-4 ml-2 rounded-md hover:bg-cyan-500"
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
