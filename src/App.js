import React from 'react';
import Header from './components/Header';
import Form from './components/Form';

import CategoriesProvider from './context/CategoriesContext';
import RecipesProvider from './context/RecipesContext';
import RecipeList from './components/RecipeList';

function App() {
  return (
    <CategoriesProvider>
      <RecipesProvider>
        <Header />

        <div className="container mt-5">
          <div className="row">
            <Form />
          </div>
          <RecipeList />
        </div>
      </RecipesProvider>
    </CategoriesProvider>
  );
}

export default App;
