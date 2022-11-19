import React from 'react';
import styled from 'styled-components';
import { Template } from '../../store/types';

const CloseButton = styled.button`
  color: #888888;
  background: white;
  margin: 0 0 0 auto;
  border: 0;
  padding: 0px 6px;
  font-size: 24px;
  line-height: 0;
  height: 32px;
  cursor: pointer;
`;

const TitleHeader = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
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
