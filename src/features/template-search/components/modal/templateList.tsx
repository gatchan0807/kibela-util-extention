import React from 'react';
import styled from 'styled-components';
import { Template } from '../../store/types';

const TemplateListWrapper = styled.ul`
  border: 1px solid #e6e6e6;
  height: 40rem;
  width: 90%;
  margin: 0 auto 2rem;
  overflow: scroll;
`;

const TemplateContents = styled.div`
  display: flex;
`;

const TemplateWrapper = styled.a`
  color: #4d4d4d !important;
  font-weight: bold;
  border-bottom: 1px solid #e6e6e6;
  padding: 1rem;
  display: block;
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
    text-decoration: none;
  }
`;

const TemplateTitle = styled.span`
  &:hover {
    text-decoration: underline;
  }
`;

const FavoriteButton = styled.button`
  margin: 0 0 0 auto;
  border: 1px solid #e6e6e6;
  background-color: white;
  border-radius: 4px;

  &:hover {
    background-color: #f1f9ff;
  }

  &[data-is-favorite='true'] {
    color: #1f73b7;
  }

  &[data-is-favorite='true']:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

export const TemplateList = (props: {
  templates: Template[];
  visibleTemplates: Template[];
  dispatchTemplateId: (id: string) => void;
}) => {
  return (
    <TemplateListWrapper>
      {props.visibleTemplates.map((t) => (
        <li key={t.id}>
          <TemplateWrapper
            href={t.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TemplateContents>
              <TemplateTitle>{t.title}</TemplateTitle>
              <FavoriteButton
                onClick={(e) => {
                  e.preventDefault();
                  props.dispatchTemplateId(t.id);
                }}
                data-is-favorite={t.isFavorite}
              >
                {t.isFavorite ? '★' : '☆'}
              </FavoriteButton>
            </TemplateContents>
          </TemplateWrapper>
        </li>
      ))}
    </TemplateListWrapper>
  );
};
