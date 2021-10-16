import React from 'react';
import IngredientDetailsStyle from './ingredient-details.module.css';
import PropTypes from 'prop-types';

const IngredientDetails = (props) => {
    const item = props.item

    return (
        <>
            <img className={`${IngredientDetailsStyle.image} mb-4`} src={item["image_large"]} alt={item.name} />
            <h1 className={`${IngredientDetailsStyle.title} text text_type_main-large`}>{item.name}</h1>
            <div className={`${IngredientDetailsStyle.nutrients} mt-8`}>
                <div className={`${IngredientDetailsStyle.nutrient__column} ml-3 mr-3`}>
                    <span className={`${IngredientDetailsStyle.text} text text_type_main-default text_color_inactive`}>Калории</span>
                    <span className={`${IngredientDetailsStyle.text} text text_type_digits-default text_color_inactive`}>{item.calories}</span>
                </div>
                <div className={`${IngredientDetailsStyle.nutrient__column} ml-3 mr-3`}>
                    <span className={`${IngredientDetailsStyle.text} text text_type_main-default text_color_inactive`}>Белки, г</span>
                    <span className={`${IngredientDetailsStyle.text} text text_type_digits-default text_color_inactive`}>{item.proteins}</span>
                </div>
                <div className={`${IngredientDetailsStyle.nutrient__column} ml-3 mr-3`}>
                    <span className={`${IngredientDetailsStyle.text} text text_type_main-default text_color_inactive`}>Жиры, г</span>
                    <span className={`${IngredientDetailsStyle.text} text text_type_digits-default text_color_inactive`}>{item.fat}</span>
                </div>
                <div className={`${IngredientDetailsStyle.nutrient__column} ml-3 mr-3`}>
                    <span className={`${IngredientDetailsStyle.text} text text_type_main-default text_color_inactive`}>Углеводы, г</span>
                    <span className={`${IngredientDetailsStyle.text} text text_type_digits-default text_color_inactive`}>{item.carbohydrates}</span>
                </div>
            </div>
        </>
    )
}

const itemPropTypes = PropTypes.shape({
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    fat: PropTypes.number,
    image: PropTypes.string,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    proteins: PropTypes.number,
    type: PropTypes.string,
    __v: PropTypes.number,
    _id: PropTypes.string,
});


IngredientDetails.propTypes = {
    props: PropTypes.objectOf(itemPropTypes)
};


export default IngredientDetails