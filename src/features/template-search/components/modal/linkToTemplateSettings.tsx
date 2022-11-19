import React from 'react';
import styled from 'styled-components';

const Link = styled.a``;

export const LinkToTemplateSettings = () => {
  return (
    <Link
      href="/team/settings/note_templates"
      target="_blank"
      rel="noopener noreferrer"
    >
      テンプレートの追加・編集はこちら
    </Link>
  );
};
