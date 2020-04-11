import React, { useContext, useState } from 'react';
import { CategoriesContext } from '../context/CategoriesContext';
import { RecipesContext } from '../context/RecipesContext';

const Form = () => {
    const [search, setSearch] = useState({
        ingredient: '',
        category: ''
    });
    const { categories } = useContext(CategoriesContext);
    const { setSearchRecipes } = useContext(RecipesContext);

    const handleChange = e => {
        setSearch({
            ...search, [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setSearchRecipes(search);
    };

    return (
        <form className="col-12" onSubmit={handleSubmit}>
            <fieldset className="text-center">
                <legend>Search for Drinks by Category or Ingredient</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input
                        name="ingredient"
                        className="form-control"
                        type="text"
                        placeholder="Search by Ingredient"
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        name="category"
                        className="form-control"
                        onChange={handleChange}
                    >
                        <option value="">-- Select category --</option>
                        {categories.map(category => (
                            <option
                                key={category.strCategory}
                                value={category.strCategory}
                            >
                                {category.strCategory}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <input
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Search for drinks"
                    />
                </div>
            </div>
        </form>
    );
}
 
export default Form;