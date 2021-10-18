import React from 'react';
import ModalOverlayStyle from '../modal/modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {
    return (
        <div onClick={() => { props.closeModal() }} className={`${ModalOverlayStyle.modal__overlay}`}>
            {props.children}
        </div>
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.node.isRequired,
    closeModal: PropTypes.func.isRequired
};



export default ModalOverlay