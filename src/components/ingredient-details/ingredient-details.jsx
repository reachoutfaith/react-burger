import React, { useMemo } from 'react';
import IngredientDetailsStyle from './ingredient-details.module.css';
<<<<<<< Updated upstream
import PropTypes from 'prop-types';
import itemObj from '../utils/types';

const IngredientDetails = (props) => {
    const item = props;
=======
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Redirect, useLocation } from 'react-router-dom';

const IngredientDetails = () => {
    const item = useSelector(store => store.ingredients.ingredient);
    const location = useLocation();
    const { id } = useParams();
    const data = useSelector((store) => store.ingredients.ingredients);

    const currentIngredient = useMemo(() => {
        return data.find(item => item._id === id);
    }, [data]);


    if (!item || !currentIngredient) {
        return null
    }

    if (!item && !currentIngredient) {
        return <Redirect to='/' />
    };
>>>>>>> Stashed changes

    return (
        <>
            <div className={IngredientDetailsStyle.container} style={{ height: `${!location.state?.fromSite && '80vh'}` }}>
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
        </>
    )
}

<<<<<<< Updated upstream

IngredientDetails.propTypes = {
    item: PropTypes.objectOf(itemObj)
};


=======
>>>>>>> Stashed changes
export default IngredientDetails