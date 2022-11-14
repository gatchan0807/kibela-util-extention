import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  width: 90%;
  margin: 0 auto 2rem;
`;

export const SearchInput = (props: {input: string, setInput: (input: string)=> void}) => {
  return (
    <InputWrapper>
      <input onChange={(e) => {props.setInput(e.target.value)}} value={props.input} type="text" placeholder='検索ワード' />
    </InputWrapper>
  );
};
