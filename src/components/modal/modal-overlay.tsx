import React, { FC } from 'react';
import ModalOverlayStyle from '../modal/modal-overlay.module.css';

export interface IComponentProps {
    closeModal: Function
}

const ModalOverlay: FC<IComponentProps> = ({ closeModal }) => {

    return (
        <div onClick={() => closeModal()} className={`${ModalOverlayStyle.modal__overlay}`} />
    )
}


export default ModalOverlay