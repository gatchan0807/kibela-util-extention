import React from 'react';
import styled from 'styled-components';
import { Template } from '../../contentScripts/setTemplateSearch';

const TemplateListWrapper = styled.ul`
  border: 1px solid #e6e6e6;
  height: 40rem;
  width: 90%;
  margin: 0 auto 2rem;
  overflow: scroll;
`;

const TemplateWrapper = styled.li`
  border-bottom: 1px solid #e6e6e6;
  padding: 1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

const TemplateTitle = styled.a`
  color: #4d4d4d !important;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

export const TemplateList = (props: { templates: Template[] }) => {
  return (
    <TemplateListWrapper>
      {props.templates.map((t) => (
        <TemplateTitle
          key={t.id}
          href={t.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TemplateWrapper>
            <span>{t.title}</span>
            <button onClick={(e) => e.preventDefault()}>
              {t.isFavorite ? '★' : '☆'}
            </button>
          </TemplateWrapper>
        </TemplateTitle>
      ))}
    </TemplateListWrapper>
  );
};
