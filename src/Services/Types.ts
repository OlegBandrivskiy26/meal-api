export interface Meal{
   idMeal: string;
   strMeal: string;
   strCategory: string;
   strArea: string;
   strInstructions: string;
   strMealThumb: string;
   strYoutube: string;
   strIngradient1: string;
   strIngradient2: string;
   strIngradient3: string;
   strIngradient4: string;
   strIngradient5: string;
   strIngradient6: string;
   strIngradient7: string;
   strIngradient8: string;
   strIngradient9: string;
   strIngradient10: string;
   strIngradient11: string;
   strIngradient12: string;
   strIngradient13: string;
   strIngradient14: string;
   strIngradient15: string;
   strIngradient16: string;
   strIngradient17: string;
   strIngradient18: string;
   strIngradient19: string;
   strIngradient20: string;
   strMeasure1: string;
   strMeasure2: string;
   strMeasure3: string;
   strMeasure4: string;
   strMeasure5: string;
   strMeasure6: string;
   strMeasure7: string;
   strMeasure8: string;
   strMeasure9: string;
   strMeasure10: string;
   strMeasure11: string;
   strMeasure12: string;
   strMeasure13: string;
   strMeasure14: string;
   strMeasure15: string;
   strMeasure16: string;
   strMeasure17: string;
   strMeasure18: string;
   strMeasure19: string;
   strMeasure20: string;

}
export interface MealResponse{
    meal: Meal[];
}
export interface MealsProps{
    likedMeals: Meal[];
    toggleFavorite: (meal: Meal) => void;
}