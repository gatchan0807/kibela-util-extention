import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { render } from 'react-dom';

const Background = styled.div`
  position: absolute;
  background: black;
  width: 100vw;
  height: 100vh;
  opacity: 0.5;
  z-index: 10;
  top: 0;
  left: 0;
`;

const ModalWrapper = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  background: white;
  opacity: 1;
  z-index: 100;
  position: absolute;
  left: 25%;
  width: 50%;
  top: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 24px;
`;

const CloseButton = styled.button`
  color: black;
  background: white;
  margin: 0 0 0 auto;
`;

const TitleHeader = styled.div`
  display: flex;
  width: 100%;
`

const Modal = () => {
  return (
    <ModalWrapper>
      <>
        <Background
          onClick={() => {
            MountModal();
          }}
        ></Background>
        <Wrapper>
          <TitleHeader>
            <h2>テンプレート一覧</h2>
            <CloseButton
              onClick={() => {
                MountModal();
              }}
            >
              ×
            </CloseButton>
          </TitleHeader>
        </Wrapper>
      </>
    </ModalWrapper>
  );
};

export const MountModal = () => {
  const modalWrapper = document.querySelector('#modal-wrapper');

  if (!modalWrapper) {
    const body = document.querySelector('#main') ?? new Element();
    const div = document.createElement('div');
    div.setAttribute('id', 'modal-wrapper');
    body.appendChild(div);

    render(<Modal></Modal>, div);
  } else {
    modalWrapper.parentNode?.removeChild(modalWrapper);
  }
};
