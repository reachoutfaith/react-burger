import React from 'react';
import ReactDOM from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/OrderDetails';
import ModalStyle from '../modal/modal-overlay.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {

    return ReactDOM.createPortal(
        (
            <div className={`${ModalStyle.modal} p-10`}>
                <header className={`${ModalStyle.modal__header}`}>
                    {props.title && <h1 className="text text_type_main-medium">{props.title}</h1>}
                    <CloseIcon type="primary" onClick={props.onClick} />
                </header>

                <main className={`${ModalStyle.modal__card}`}>
                    {props.component === 'ingredient' ? <IngredientDetails item={props.details} /> : <OrderDetails />}

                </main>
            </div>
        ),
        modalRoot
    );
}


const itemPropTypes = PropTypes.shape({
    title: PropTypes.string,
    component: PropTypes.string,
    details: PropTypes.object,
    onClick: PropTypes.func
});


Modal.propTypes = {
    props: PropTypes.objectOf(itemPropTypes)
};


export default Modal