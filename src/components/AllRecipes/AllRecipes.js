import React, { Component } from "react";
import axios from "axios";
import Card from "../RecipeCard/card";
import {
  faUtensils
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from 'react-router-dom';

class AllRecipes extends Component {
  constructor() {
    super();
    this.state = {
      recipes: []
    };
  }
  componentWillMount() {
    const base_url = "http://localhost:3000";
    axios
      .get(`${base_url}/recipe/allRecipes`)
      .then(res => {
        this.setState({ recipes: res.data.items });
        // this.setState({ user: res.data.recipe[0]._user });
      })
      .catch(err => {
        console.log("Error recipe detail =====> ", err);
      });
  }
  render() {
    let user = this.props.state.user._id
    let recipes = this.state.recipes;
    return (
      <div className="uk-child-width-1-2@m" uk-grid="true">
        <h1>Recetas</h1>
        <p>Cocina algo diferente todos los días</p>
        <div className="subirReceta">
          <Link to={`/new-recipe/${user}`}>
            <button className="botonReceta">
              <FontAwesomeIcon icon={faUtensils} /> Sube una receta
            </button>
          </Link>
        </div>
        {recipes.length > 0 ? recipes.map((recipe, index) => (
          <Card recipe={recipe} key={index} user={recipe._user}/>
        )) : <div className="nada"><h1>Aún no hay recetas que mostrar</h1></div>
      }
      </div>
    );
  }
}

export default AllRecipes;
