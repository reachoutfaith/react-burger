import React, { useEffect } from 'react';
import ModalStyle from '../modal/modal-overlay.module.css';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {

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


    return (
        <div onClick={() => { props.closeModal() }} className={`${ModalStyle.modal__overlay}`}>
            <Modal onClick={props.closeModal} title={props.title} details={props.info} component={props.component}></Modal>
        </div>
    )
}

const itemPropTypes = PropTypes.shape({
    title: PropTypes.string,
    component: PropTypes.string,
    info: PropTypes.object,
    closeModal: PropTypes.func
});


ModalOverlay.propTypes = {
    props: PropTypes.objectOf(itemPropTypes)
};


export default ModalOverlay