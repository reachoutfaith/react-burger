import React from 'react';
import ModalOverlayStyle from '../modal/modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {

    return (
        <div onClick={() => { props.closeModal() }} className={`${ModalOverlayStyle.modal__overlay}`} />
    )
}

ModalOverlay.propTypes = {
    closeModal: PropTypes.func
};



export default ModalOverlay