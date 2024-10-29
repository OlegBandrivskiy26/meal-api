import { useLocation } from "react-router-dom";
import { Meal } from "../services/types";
import "../styles/InfoPage.css";

const InfoPage = () => {
    const location = useLocation();
    const meal = location.state as Meal;
    const listIngradients = [];

    for(let i = 1; i < 20; i++){
        const ingradient = (meal as any)[`strIngredient${i}`];
        const measure = (meal as any)[`strMeasure${i}`];
        if(ingradient !== "" && measure !== ""){
            listIngradients.push(<h5 key={i}> {ingradient} {measure},</h5>)
        }
        
    }
    return (
        <section className="info">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="info__img"/>
            <div className="info__content__container">
                <h1 className="title__info">{meal.strMeal}</h1>
                <h3 className="category__info"><span>Category: </span>{meal.strCategory} <br /> <span>Area: </span> {meal.strArea}</h3>
                <p className="instructions__info"><span>Instructions: </span>{meal.strInstructions}</p>
                <p className="ingradients__info"><span>Ingradients: </span>{listIngradients}</p>
                <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer"><button className="btn__youtube" >Watch video</button></a>
            </div>
        </section>
    )
}

export default InfoPage
