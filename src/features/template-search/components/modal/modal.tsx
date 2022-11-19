import React, { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import { modalReducer, ReducerState } from '../../hooks/modalReducer';
import { setFavoriteTemplateListToChromeStorage } from '../../store/setFavoriteTemplateListToChromeStorage';
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
  const [templates, setTemplates] = useState(props.templates);

  const initialState: ReducerState = {
    ids: [],
    searchInput: '',
    templateList: props.templates,
    visibleTemplateList: props.templates,
  };

  const [modal, dispatch] = useReducer(modalReducer, initialState);

  // memo: 子要素のお気に入りボタン押下にフックして、テンプレート一覧のアップデート
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

      const input = modal.searchInput;
      if (input.length > 0) {
        const filtered = updatedTemplates.filter((t) => {
          return (
            t.title.indexOf(input) !== -1 ||
            t.title.toUpperCase().indexOf(input.toUpperCase()) !== -1 ||
            t.title.toLowerCase().indexOf(input.toLowerCase()) !== -1
          );
        });
        dispatch({ type: 'setVisibleTemplateList', payload: filtered });
      } else {
        dispatch({ type: 'setVisibleTemplateList', payload: updatedTemplates });
      }
    }
  };

  // memo: Chrome StorageへのIDリストの保存
  useEffect(() => {
    setFavoriteTemplateListToChromeStorage({
      ids: templates.filter((t) => t.isFavorite).map((t) => t.id),
    });
  }, [templates]);

  // memo: 初期化
  useEffect(() => {
    dispatch({ type: 'initializeTemplateList', payload: props.templates });
  }, []);

  // memo: 検索ワードに基づいて表示リストのフィルタリング + アップデート
  useEffect(() => {
    const input = modal.searchInput;
    if (input.length > 0) {
      const filtered = templates.filter((t) => {
        return (
          t.title.indexOf(input) !== -1 ||
          t.title.toUpperCase().indexOf(input.toUpperCase()) !== -1 ||
          t.title.toLowerCase().indexOf(input.toLowerCase()) !== -1
        );
      });
      dispatch({ type: 'setVisibleTemplateList', payload: filtered });
    } else {
      dispatch({ type: 'setVisibleTemplateList', payload: templates });
    }
  }, [modal.searchInput]);

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
          setInput={(value) => {
            dispatch({ type: 'setSearchInput', payload: value });
          }}
        ></SearchInput>
        <TemplateList
          templates={templates}
          visibleTemplates={modal.visibleTemplateList}
          dispatchTemplateId={updateId}
        ></TemplateList>
      </Wrapper>
    </ModalWrapper>
  );
};
