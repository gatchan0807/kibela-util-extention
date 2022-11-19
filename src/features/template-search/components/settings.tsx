import React, { useEffect, useReducer } from 'react';
import { initializeLocalSettingState } from '../hooks/initializeLocalSettingState';
import { localSettingsReducer, UIState } from '../hooks/localSettingsReducer';

export const Settings: React.FC = () => {
  const initialState: UIState = {
    featureSwitch: true,
  };

  const [localSettings, dispatch] = useReducer(localSettingsReducer, initialState);

  useEffect(() => {
    initializeLocalSettingState(dispatch);
  }, []);

  return (
    <div className="text-gray-800">
      <h2 className="pl-2 text-lg border-b-2 border-cyan-500">
        テンプレート検索機能
      </h2>
      <div className="pt-2 text-base">
        <input
          className="mx-2"
          type="checkbox"
          name="use-template-search"
          id="use-template-search"
          checked={localSettings.featureSwitch}
          onChange={() => dispatch({type: "setUseTemplateSearch", payload: !localSettings.featureSwitch})}
        />
        <label className="hover:cursor-pointer" htmlFor="use-template-search">
          テンプレート検索機能を使う
        </label>
      </div>
    </div>
  )
};
