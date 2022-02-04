import React from 'react';
import browser from 'webextension-polyfill';
import * as SettingUI from './settings';

export const Popup: React.VFC = () => {
  const handleClick = () => {
    browser.tabs.create({ url: 'https://example.com/' });
  };

  // a button to open example.com
  return (
    <div className='popup-wrapper'>
      <SettingUI.TargetBlankSettings></SettingUI.TargetBlankSettings>
      <hr />
      <button onClick={handleClick}>Button</button>
    </div>
  )
};
