import React, { Component } from "react";
import axios from "axios";
import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { isLoggedIn, Deletefavorites } from "../../service";

class FavoritesRecipes extends Component {
  constructor() {
    super();
    this.state = {
      recipesFav: [],
      code: {}
    };
  }
  componentWillMount() {
    const token = localStorage.getItem("token");
    let { recipesFav } = this.state;
    const base_url =
      window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://simplekitchen.herokuapp.com";
    if (token) {
      let user = JSON.parse(localStorage.getItem("user"));
      isLoggedIn(this.props.history);
      axios
        .get(`${base_url}/favorite/allFavorites/${user._id}`)
        .then(res => {
          recipesFav = res.data.items;
          this.setState({ recipesFav });
        })
        .catch(err => {
          console.log("recetas error", err);
        });
      this.setState({ user });
    } else {
      this.props.history.push("/login");
    }
  }

  getId = id => {
    let ID = id;
    let { code } = this.state;
    code = ID;
    this.setState({ code });
    //console.log(code)
  };

  handleDeleteFavorites = () => {
    let { code } = this.state;
    Deletefavorites(code);
  };

  render() {
    let favorites = this.state.recipesFav;
    return (
      <div>
        <div id="headerFavorites">
          <FontAwesomeIcon id="corazonIcon" icon={faHeart} />
          <strong id="count">
            {favorites.length}
          </strong>
          <h1 className="favoritesText">Favoritos</h1>
        </div>
        <hr className="uk-divider-icon" />
        <div className="listaReceta">
          <ul className="uk-list uk-list-striped">
            {favorites.length > 0 ? (
              favorites.map((item, index) => (
                <li key={index}>
                  <Link to={`/recipeDetail/${item._recipe._id}`}>
                    {item._recipe.name}
                    <em name="id" style={{ display: "none" }}>
                      {item._id}
                    </em>
                  </Link>
                  <FontAwesomeIcon
                    uk-tooltip="Eliminar receta"
                    className="listIcon"
                    id="iconLapiz"
                    icon={faHeartBroken}
                    uk-toggle="target: #my-id"
                    onClick={() => this.getId(item._id)}
                  />
                  <div id="my-id" uk-modal="true">
                    <div className="uk-modal-dialog uk-modal-body">
                      <h4
                        className="modal-title"
                        style={{ textAlign: "center", color: "red" }}
                      >
                        Seguro que quieres borrar de favoritos{" "}
                        {item._recipe.name}{" "}
                      </h4>
                      <div style={{ textAlign: "center" }}>
                        <button
                          className="uk-modal-close"
                          type="button"
                          id="buttonCancel"
                        >
                          Cancelar
                        </button>
                        <button
                          id="buttonFavorites"
                          className="modal-submit"
                          type="button"
                          onClick={this.handleDeleteFavorites}
                        >
                          Borrar receta
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div>
                <strong className="listaVacia">Aún no tienes favoritos</strong>
              </div>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default FavoritesRecipes;
