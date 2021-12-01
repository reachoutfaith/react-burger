import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalStyle from '../modal/modal.module.css';
import PropTypes from 'prop-types';
import ModalOverlay from './modal-overlay';

const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {

    const closeModal = (event) => {
        if (event.keyCode === 27) {
            props.closeModal()
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", closeModal, false);

        return () => {
            document.removeEventListener("keydown", closeModal, false);
        };
    }, []);


    return ReactDOM.createPortal(
        (
            <div className={`${ModalStyle.modal__wrapper}`}>
                <ModalOverlay closeModal={props.closeModal}></ModalOverlay>
                <div className={`${ModalStyle.modal} p-10`} onClick={(e) => { e.stopPropagation() }}>
                    <header className={`${ModalStyle.modal__header}`}>
                        {props.title && <h1 className="text text_type_main-medium">{props.title}</h1>}
                        <CloseIcon type="primary" onClick={() => { props.closeModal() }} />
                    </header>
                    <main className={`${ModalStyle.modal__card}`}>
                        {props.children}
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