import React from 'react';
import styled from 'styled-components';
import { Template } from '../../contentScripts/setTemplateSearch';

const CloseButton = styled.button`
  color: black;
  background: white;
  margin: 0 0 0 auto;
`;

const TitleHeader = styled.div`
  display: flex;
  width: 100%;
`;

export const Title = (props: {
  toggleModal: (templates: Template[]) => void;
}) => {
  return (
    <TitleHeader>
      <h2>テンプレート一覧</h2>
      <CloseButton
        onClick={() => {
          props.toggleModal([]);
        }}
      >
        ×
      </CloseButton>
    </TitleHeader>
  );
};
