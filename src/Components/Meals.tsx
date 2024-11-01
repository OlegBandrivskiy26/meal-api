import { FormControl, InputLabel, Select, MenuItem, Pagination} from "@mui/material"
import "../styles/Meal.css"
import { UseQueryResult, useQuery } from "@tanstack/react-query"
import { fetchMeals } from "../services/api"
import { Meal, MealsProps } from "../services/types"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const Meals: React.FC<MealsProps> = ({likedMeals, toggleFavorite}) => {

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [debounceSearchTerm, setDebounceSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [category, setCategory] = useState<string>("");
    const navigate = useNavigate();
    const postPerPage:number = 6;

    useEffect(() =>{
        const timer =  setTimeout(() => {
            setDebounceSearchTerm(searchTerm);
        }, 500)

        return () => clearTimeout(timer);
    }, [searchTerm])


    const {data, error, isLoading}: UseQueryResult<{meals: Meal[]}, Error> = useQuery({
        queryKey: ['meals'],
        queryFn: fetchMeals,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    if (isLoading) return <p className="empty__state">Loading...</p>
    if (error instanceof Error) return <p className="empty__state">Error: {error.message}</p>

    const meals =  data?.meals || [];
    const filteredMeals = meals.filter((meal) =>
        meal.strMeal.toLowerCase().includes(debounceSearchTerm.toLowerCase())
        &&
        (category === "" || meal.strCategory === category)
    );

    const postsAmount = Math.ceil(filteredMeals.length / postPerPage)
    const lastPostIndex:number = currentPage * postPerPage;
    const firstPostIndex:number = lastPostIndex - postPerPage;
    const currentPosts: Meal[] = filteredMeals.slice(firstPostIndex, lastPostIndex);



    
    return (
        <section className="meals">
            <div className="filtration__container">
                <FormControl className="form__controll">
                    <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={category}
                    label="Category"
                    onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'Seafood'}>Seafood</MenuItem>
                        <MenuItem value={'Side'}>Side</MenuItem>
                        <MenuItem value={'Vegetarian'}>Vegetarian</MenuItem>
                        <MenuItem value={'Beef'}>Beef</MenuItem>
                        <MenuItem value={'Pork'}>Pork</MenuItem>
                        <MenuItem value={'Pasta'}>Pasta</MenuItem>
                        <MenuItem value={'Dessert'}>Dessert</MenuItem>
                        <MenuItem value={'Miscellaneous'}>Miscellaneous</MenuItem>
                        <MenuItem value={'Lamb'}>Lamb</MenuItem>
                        <MenuItem value={'Chiken'}>Chicken</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="content__container">
                <div className="search__container">
                    <input 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text" 
                    placeholder="Search..."
                    />
                </div>
                <div className="carts__container">
                    { currentPosts.length === 0 ? (
                        <h1>Nothing to show </h1>
                    ) : (
                        currentPosts.map((meal) => (
                            <div className="cart" key={meal.idMeal}>
                                <img src={meal.strMealThumb} alt={meal.strMeal} className="cart__img"/>
                                <div className="cart__content">
                                    <h1 className="cart__title">{meal.strMeal}</h1>
                                    <h3>• {meal.strArea} • {meal.strCategory}</h3>
                                    <div className="cart__btn__container">
                                        <button className="load__more" onClick={() => navigate('/infoPage', {state: meal})}>Read more</button>
                                        <button className="heart" onClick={() => toggleFavorite(meal)}>
                                            {likedMeals.some((likedMeal) => likedMeal.idMeal === meal.idMeal) ? "♥" : "♡"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    
                </div>
                <div className="pagination__container">
                    <Pagination 
                    count={postsAmount}
                    page={currentPage}
                    onChange={(_, page) => setCurrentPage(page)} 
                    variant="outlined" 
                    shape="rounded"
                    color="primary"
                    />
                </div>
            </div>
        </section>
    )
}

export default Meals
