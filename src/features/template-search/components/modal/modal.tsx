import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Template } from '../../contentScripts/setTemplateSearch';
import { setFavoriteTemplateListToChromeStorage } from '../../hooks/setFavoriteTemplateListToChromeStorage';
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
  const [templates, setTemplates] = useState(props.templates);
  const [visibleTemplates, setVisibleTemplates] = useState(props.templates);
  const [input, setInput] = useState('');

  const updateId = (id: string) => {
    const index = templates.findIndex((t) => t.id === id);

    if (templates[index]) {
      const updated = {
        ...templates[index],
        isFavorite: !templates[index].isFavorite,
      };
      const updatedTemplates = [...templates];
      updatedTemplates[index] = updated;
      setTemplates(updatedTemplates);

      if (input.length > 0) {
        const filtered = updatedTemplates.filter((t) => {
          return (
            t.title.indexOf(input) !== -1 ||
            t.title.toUpperCase().indexOf(input.toUpperCase()) !== -1 ||
            t.title.toLowerCase().indexOf(input.toLowerCase()) !== -1
          );
        });
        setVisibleTemplates(filtered);
      }
    }
  };

  useEffect(() => {
    setFavoriteTemplateListToChromeStorage({
      ids: templates.filter((t) => t.isFavorite).map((t) => t.id),
    });
  }, [templates]);

  useEffect(() => {
    if (input.length > 0) {
      const filtered = templates.filter((t) => {
        return (
          t.title.indexOf(input) !== -1 ||
          t.title.toUpperCase().indexOf(input.toUpperCase()) !== -1 ||
          t.title.toLowerCase().indexOf(input.toLowerCase()) !== -1
        );
      });
      setVisibleTemplates(filtered);
    } else {
      setVisibleTemplates(templates);
    }
  }, [input]);

  return (
    <ModalWrapper>
      <Background
        onClick={() => {
          props.toggleModal([]);
        }}
      ></Background>
      <Wrapper>
        <Title toggleModal={props.toggleModal}></Title>
        <SearchInput input={input} setInput={setInput}></SearchInput>
        <TemplateList
          templates={templates}
          visibleTemplates={visibleTemplates}
          dispatchTemplateId={updateId}
        ></TemplateList>
      </Wrapper>
    </ModalWrapper>
  );
};
