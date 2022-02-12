import React from 'react';
import browser from 'webextension-polyfill';
import * as SettingUI from './settings';

export const Popup: React.VFC = () => {
  return (
    <div className='popup-wrapper'>
      <SettingUI.TargetBlankSettings></SettingUI.TargetBlankSettings>
    </div>
  )
};
