import React, { useEffect, FC } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalStyle from '../modal/modal.module.css';
import PropTypes from 'prop-types';
import ModalOverlay from './modal-overlay';

const modalRoot = document.getElementById("react-modals") as HTMLElement;

export interface IComponentProps {
    title?: string;
    closeModal: Function,
    children: React.ReactNode;
}

const Modal: FC<IComponentProps> = ({ title, closeModal, children }) => {

    const closeModalWithKey = (event: any) => {
        if (event.keyCode === 27) {
            closeModal()
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", closeModalWithKey, false);

        return () => {
            document.removeEventListener("keydown", closeModalWithKey, false);
        };
    }, []);


    return ReactDOM.createPortal(
        (
            <div className={`${ModalStyle.modal__wrapper}`}>
                <ModalOverlay closeModal={closeModal}></ModalOverlay>
                <div className={`${ModalStyle.modal} p-10`} onClick={(e: any) => { e.stopPropagation() }}>
                    <header className={`${ModalStyle.modal__header}`}>
                        {title && <h1 className="text text_type_main-medium">{title}</h1>}
                        <CloseIcon type="primary" onClick={() => { closeModal() }} />
                    </header>
                    <main className={`${ModalStyle.modal__card}`}>
                        {children}
                    </main>
                </div>
            </div>
        ),
        modalRoot
    );
}


Modal.propTypes = {
    children: PropTypes.node.isRequired,
    closeModal: PropTypes.func.isRequired,
    title: PropTypes.string
};


export default Modal