import React from 'react';
import IngredientDetailsStyle from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import itemObj from '../utils/types';
import { useSelector, useDispatch } from 'react-redux';

const IngredientDetails = () => {
    const item = useSelector(store => store.ingredients.ingredient);

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


export default IngredientDetails