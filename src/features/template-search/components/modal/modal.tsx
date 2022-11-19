import React from 'react';
import styled from 'styled-components';
import { useModal } from '../../hooks/useModal';
import { Template } from '../../store/types';
import { LinkToTemplateSettings } from './linkToTemplateSettings';
import { SearchInput } from './searchInput';
import { TemplateList } from './templateList';
import { Title } from './title';

const Background = styled.div`
  position: absolute;
  background: black;
  width: 100vw;
  height: 100%;
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
  top: 15vh;
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
  const { property, handlers } = useModal(props);

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
          input={property.searchInput}
          isFilterByFavorite={property.isFilterByFavorite}
          setInput={handlers.setSearchInput}
          toggleFavoriteFilter={handlers.toggleFavoriteFilter}
        ></SearchInput>
        <TemplateList
          templates={property.templateList}
          visibleTemplates={property.visibleTemplateList}
          dispatchTemplateId={handlers.toggleFavorite}
        ></TemplateList>
        <LinkToTemplateSettings></LinkToTemplateSettings>
      </Wrapper>
    </ModalWrapper>
  );
};
