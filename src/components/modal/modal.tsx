import React, { useEffect, FC } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalStyle from '../modal/modal.module.css';
import ModalOverlay from './modal-overlay';

const modalRoot = document.getElementById("react-modals") as HTMLElement;

export interface IComponentProps {
    title?: string;
    closeModal: () => void;
    children: React.ReactNode;
}

const Modal: FC<IComponentProps> = ({ title, closeModal, children }) => {

    const closeModalWithKey = (e: KeyboardEvent) => {
        if (e.keyCode === 27) {
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
                <div className={`${ModalStyle.modal} p-10`} >
                    <header className={`${ModalStyle.modal__header}`}>
                        {title && <h1 className="text text_type_main-medium">{title}</h1>}
                        <CloseIcon type="primary" onClick={closeModal} />
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


export default Modal