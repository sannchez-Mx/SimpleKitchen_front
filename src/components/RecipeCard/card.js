import React from "react";
import { Link } from "react-router-dom";

const Card = ({ user, recipe, index }) => (
  <div key={index} id="cardReceta" className="uk-card uk-card-default">
      <div className="uk-card-body">
        <img
          className="cardUserImage"
          src={user.profilePicture}
          alt={user.name}
        />
        <div>
          <span className="uk-card-title">
            <Link to={`/recipeDetail/${recipe._id}`}>{recipe.name}</Link>
            <em className="cardName">{user.name}</em>
          </span>
        </div>
      </div>
      <div className="cardDescipcion">
        <p>{recipe.description}</p>
      </div>
      <div className="uk-card-media-bottom">
        <img
          className="imageCardRecipe"
          src={recipe.images[0]}
          alt={user.username}
        />
      </div>
    </div>
);

export default Card;
