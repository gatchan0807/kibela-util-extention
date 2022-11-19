import React from 'react';
import { render } from 'react-dom';
import { Template } from '../../store/types';
import { Modal } from './modal';

export const MountModal = (templates: Template[]) => {
  const modalWrapper = document.querySelector('#modal-wrapper');

  if (!modalWrapper) {
    const body = document.querySelector('#main') ?? new Element();
    const div = document.createElement('div');
    div.setAttribute('id', 'modal-wrapper');
    body.appendChild(div);
    render(
      <Modal templates={templates ?? []} toggleModal={MountModal}></Modal>,
      div
    );

    const dropdown =
      document.querySelector('.postButtonDropdownContainer') ?? new Element();
    dropdown.setAttribute('style', 'display: none;');
  } else {
    modalWrapper.parentNode?.removeChild(modalWrapper);
  }
};
