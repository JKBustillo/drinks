import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RecipesContext = createContext();

const RecipesProvider = (props) => {
    const [recipes, setRecipes] = useState([]);
    const [searchRecipes, setSearchRecipes] = useState({
        ingredient: '',
        category: ''
    });
    const [consult, setConsult] = useState(false);

    const { ingredient, category } = searchRecipes;

    useEffect(() => {
        if (consult) {
            const getRecipes = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}&c=${category}`;
                
                const response = await axios.get(url);
                setRecipes(response.data.drinks);
            };
            getRecipes();
        }
    }, [searchRecipes]);

    return (
        <RecipesContext.Provider
            value={{
                setSearchRecipes,
                setConsult
            }}
        >
            {props.children}
        </RecipesContext.Provider>
    );
}
 
export default RecipesProvider;