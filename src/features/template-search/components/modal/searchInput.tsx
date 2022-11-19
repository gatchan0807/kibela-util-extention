import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  width: 90%;
  margin: 0 auto 1rem;
`;

const SwitchWrapper = styled.div`
  margin: 1rem 0 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

// see: https://nextui.org/docs/components/switch#default
// memo: 上記 NextUI のスタイルをほぼコピペで固定値にして流用している
const SwitchBackground = styled.div`
  margin-left: 1rem;
  width: 48px;
  height: 28px;
  cursor: pointer;
  background-color: #e6e6e6;
  border-radius: 9999px;
  border: 1px solid #e6e6e6;
  position: relative;

  &[data-checked='true'] {
    background-color: #1f73b7;
  }
`;

const SwitchInner = styled.span`
  width: 19px;
  height: 19px;
  display: block;
  border-radius: 9999px;
  border: 1px solid #e6e6e6;
  background-color: #fff;
  position: absolute;
  top: calc(50% - 26px * 0.36);
  left: 0px;
  transform: translateX(3.2px);
  transition: transform 0.25s ease 0s, width 0.2s ease 0s;

  &[data-checked='true'] {
    transform: translateX(22px);
  }
`;

export const SearchInput = (props: {
  input: string;
  isFilterByFavorite: boolean;
  setInput: (input: string) => void;
  toggleFavoriteFilter: (input: boolean) => void;
}) => {
  return (
    <InputWrapper>
      <input
        onChange={(e) => {
          props.setInput(e.target.value);
        }}
        value={props.input}
        type="text"
        placeholder="検索ワード"
      />
      <SwitchWrapper>
        <span>お気に入りのみ</span>
        <SwitchBackground
          onClick={() => {
            props.toggleFavoriteFilter(!props.isFilterByFavorite);
          }}
          data-checked={props.isFilterByFavorite}
        >
          <SwitchInner data-checked={props.isFilterByFavorite}></SwitchInner>
        </SwitchBackground>
      </SwitchWrapper>
    </InputWrapper>
  );
};
