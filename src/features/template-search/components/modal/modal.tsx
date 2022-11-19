import React from 'react';
import styled from 'styled-components';
import { useModal } from '../../hooks/useModal';
import { Template } from '../../store/types';
import { SearchInput } from './searchInput';
import { TemplateList } from './templateList';
import { Title } from './title';

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

type Props = {
  templates: Template[];
  toggleModal: (array: Template[]) => void;
};

export const Modal: React.FC<Props> = (props: Props) => {
  const { modal, updateId, setSearchInput, toggleFavoriteFilter } = useModal(props);

  return (
    <ModalWrapper>
      <Background
        onClick={() => {
          props.toggleModal([]);
        }}
      ></Background>
      <Wrapper>
        <Title toggleModal={props.toggleModal}></Title>
        <SearchInput
          input={modal.searchInput}
          isFilterByFavorite={modal.isFilterByFavorite}
          setInput={setSearchInput}
          toggleFavoriteFilter={toggleFavoriteFilter}
        ></SearchInput>
        <TemplateList
          templates={modal.templateList}
          visibleTemplates={modal.visibleTemplateList}
          dispatchTemplateId={updateId}
        ></TemplateList>
      </Wrapper>
    </ModalWrapper>
  );
};
