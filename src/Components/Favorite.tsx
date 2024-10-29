import React from 'react'
import '../styles/Favorite.css'
import { MealsProps } from '../services/types'
import { NavLink, useNavigate } from 'react-router-dom'

const Favorite: React.FC<MealsProps> = ({likedMeals, toggleFavorite}) => {
    const navigate = useNavigate();

    const ingredientCounts: Record<string, number> = {};

    likedMeals.forEach((meal) => {
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}` as keyof typeof meal] as string;
            const measure = meal[`strMeasure${i}` as keyof typeof meal] as string;

            if (ingredient) {
                const key = `${ingredient} ${measure}`.trim();
                ingredientCounts[key] = (ingredientCounts[key] || 0) + 1;
            }
        }
    });
    if(likedMeals.length === 0){
        return(
            <div className="empty__state">
                You have not added any recipes  <NavLink to="/">    Add some recipes</NavLink>
            </div>
        )
    }

  return (
    <section className='favorite'>
        <div className="cart__container">
            {likedMeals.map((meal) => (
                <div className="cart" key={meal.idMeal}>
                <img src={meal.strMealThumb} alt={meal.strMeal} className="cart__img"/>
                <div className="cart__content">
                    <h1 className="cart__title">{meal.strMeal}</h1>
                    <p className="instructions">{meal.strInstructions}</p>
                    <div className="cart__btn__container">
                    <button className="load__more" onClick={() => navigate('/infoPage', {state: meal})}>Read more</button>
                        <button className="heart" onClick={() => toggleFavorite(meal)}>
                            {likedMeals.some((likedMeal) => likedMeal.idMeal === meal.idMeal) ? "♥" : "♡"}
                        </button>
                    </div>
                </div>
            </div>
            ))}
        </div>
        <div className='hr'></div>
        <div className="ingradients__container">
            <h1 className="ingradients__title">List of ingradients:</h1>
            <ul>
                    {Object.entries(ingredientCounts).map(([ingredient, count]) => (
                        <li key={ingredient}>{`${ingredient}: ${count}`}</li>
                    ))}
                </ul>
        </div>
    </section>
  )
}

export default Favorite
