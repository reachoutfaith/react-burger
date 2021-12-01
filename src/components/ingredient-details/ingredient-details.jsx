import React, { useEffect, useMemo } from 'react';
import IngredientDetailsStyle from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import itemObj from '../utils/types';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Redirect, useLocation } from 'react-router-dom';

const IngredientDetails = () => {

    const { id } = useParams();
    const data = useSelector((store) => store.ingredients.ingredients);
    const isLoading = useSelector((store) => store.ingredients)

    const currentIngredient = useMemo(() => {
        return data.find(item => item._id === id);
    }, [data]);


    if (!isLoading) {
        return null
    }

    if (!currentIngredient) {
        return <div>Wait a little bit</div>
    }

    return (
        <div className={IngredientDetailsStyle.container} >
            <img className={`${IngredientDetailsStyle.image} mb-4`} src={currentIngredient["image_large"]} alt={currentIngredient.name} />
            <h1 className={`${IngredientDetailsStyle.title} text text_type_main-large`}>{currentIngredient.name}</h1>
            <div className={`${IngredientDetailsStyle.nutrients} mt-8`}>
                <div className={`${IngredientDetailsStyle.nutrient__column} ml-3 mr-3`}>
                    <span className={`${IngredientDetailsStyle.text} text text_type_main-default text_color_inactive`}>Калории</span>
                    <span className={`${IngredientDetailsStyle.text} text text_type_digits-default text_color_inactive`}>{currentIngredient.calories}</span>
                </div>
                <div className={`${IngredientDetailsStyle.nutrient__column} ml-3 mr-3`}>
                    <span className={`${IngredientDetailsStyle.text} text text_type_main-default text_color_inactive`}>Белки, г</span>
                    <span className={`${IngredientDetailsStyle.text} text text_type_digits-default text_color_inactive`}>{currentIngredient.proteins}</span>
                </div>
                <div className={`${IngredientDetailsStyle.nutrient__column} ml-3 mr-3`}>
                    <span className={`${IngredientDetailsStyle.text} text text_type_main-default text_color_inactive`}>Жиры, г</span>
                    <span className={`${IngredientDetailsStyle.text} text text_type_digits-default text_color_inactive`}>{currentIngredient.fat}</span>
                </div>
                <div className={`${IngredientDetailsStyle.nutrient__column} ml-3 mr-3`}>
                    <span className={`${IngredientDetailsStyle.text} text text_type_main-default text_color_inactive`}>Углеводы, г</span>
                    <span className={`${IngredientDetailsStyle.text} text text_type_digits-default text_color_inactive`}>{currentIngredient.carbohydrates}</span>
                </div>
            </div>
        </div>
    )
}


export default IngredientDetails