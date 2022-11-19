import React from 'react';
import * as SettingUI from './settings';

export const Popup: React.VFC = () => {
  return (
    <div className='popup-wrapper'>
      <SettingUI.TargetBlankSettings></SettingUI.TargetBlankSettings>
      <SettingUI.TemplateSearchSettings></SettingUI.TemplateSearchSettings>
    </div>
  )
};
