import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) => {
    const [idRecipe, setIdRecipe] = useState(null);
    const [infoRecipe, setInfoRecipe] = useState({});

    useEffect(() => {
        const getRecipe = async () => {
            if (!idRecipe) return;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;
            const response = await axios.get(url);

            setInfoRecipe(response.data.drinks[0]);
        };
        getRecipe();
    }, [idRecipe]);

    return (
        <ModalContext.Provider
            value={{
                infoRecipe,
                setIdRecipe,
                setInfoRecipe
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );
}
 
export default ModalProvider;