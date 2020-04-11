import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { ModalContext } from '../context/ModalContext';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 450,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Recipe = ({ recipe }) => {
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { infoRecipe, setIdRecipe, setInfoRecipe } = useContext(ModalContext);
    
    const showIngredients = infoRecipe => {
        let ingredients = [];

        for (let i = 1; i < 16; i++) {
            if (infoRecipe[`strIngredient${i}`]) {
                ingredients.push(
                    <li key={infoRecipe[`strIngredient${i}`]}>{infoRecipe[`strIngredient${i}`]}: {infoRecipe[`strMeasure${i}`]}</li>
                );
            }
        }
        return ingredients;
    };

    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{recipe.strDrink}</h2>
                <img className="card-img-top" src={recipe.strDrinkThumb} alt={recipe.strDrink} />
                
                <div className="card-body">
                    <button 
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() => {
                            setIdRecipe(recipe.idDrink);
                            handleOpen();
                        }}
                    >
                        See recipe
                    </button>
                    <Modal
                        open={open}
                        onClose={() => {
                            handleClose();
                            setIdRecipe(null);
                            setInfoRecipe({});
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{infoRecipe.strDrink}</h2>
                            <h3 className="mt-4">Instructions</h3>
                            <p>
                                {infoRecipe.strInstructions}
                            </p>
                            <img className="img-fluid my-4" src={infoRecipe.strDrinkThumb} alt={infoRecipe.strDrink}/>

                            <h3>Ingredients</h3>
                            <ul>
                                {showIngredients(infoRecipe)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

Recipe.propTypes = {
    recipe: PropTypes.object.isRequired,
};
 
export default Recipe;