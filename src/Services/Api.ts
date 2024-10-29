import { MealResponse } from "./types";

export const fetchMeals =  async (): Promise<MealResponse> =>{
    const response =  await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    if(!response.ok){
        throw new Error('Network response was not ok');
    }
    return response.json();
}