import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import Meals from "./components/Meals";
import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import InfoPage from "./components/InfoPage";
import { useState } from "react";
import { Meal } from "./services/types";
import Favorite from "./components/Favorite";

function App() {
  const queryClient = new QueryClient();
  const [likedMeals, setLikedMeals] = useState<Meal[]>([]);

  const toggleFavorite = (meal: Meal) => {
    setLikedMeals((prevLikedMeals) => {
      const isLiked = prevLikedMeals.some((likedMeal) => likedMeal.idMeal === meal.idMeal);
      if (isLiked) {
        return prevLikedMeals.filter((likedMeal) => likedMeal.idMeal !== meal.idMeal);
      } else {
        return [...prevLikedMeals, meal];
      }
    });
  };

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Header/>
        <Routes>
          <Route
            path="/"
            element={<Meals likedMeals={likedMeals} toggleFavorite={toggleFavorite} />}
          />
          <Route path="/infoPage" element={<InfoPage />} />
          <Route path="/favorite" element={<Favorite likedMeals={likedMeals} toggleFavorite={toggleFavorite}/>}/>
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
