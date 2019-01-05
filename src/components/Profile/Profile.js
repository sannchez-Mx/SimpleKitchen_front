import React, { Component } from "react";
import { isLoggedIn, DeleteRecipe } from "../../service";
import {
  faTrashAlt,
  faPen,
  faUtensils
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { Recipes } from "../../service";
import { Link } from "react-router-dom";
import axios from "axios";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      recipe: [],
      code: {}
    };
  }
  componentWillMount() {
    const token = localStorage.getItem("token");
    let { recipe } = this.state;
    const base_url =
      window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://simplekitchen.herokuapp.com";
    if (token) {
      let user = JSON.parse(localStorage.getItem("user"));
      isLoggedIn(this.props.history);
      axios
        .get(`${base_url}/recipe/recipes/${user._id}`)
        .then(res => {
          recipe = res.data.items;
          this.setState({ recipe });
        })
        .catch(err => {
          console.log("recetas error", err);
        });
      this.setState({ user });
    } else {
      this.props.history.push("/login");
    }
  }

  handleClick = e => {
    e.preventDefault();
    document.getElementById("upload").click();
  };

  getId = id => {
    let ID = id;
    let { code } = this.state;
    code = ID;
    this.setState({ code });
    //console.log(code)
  };
  handleDeleteRecipe = () => {
    let { code } = this.state;
    DeleteRecipe(code);
  };

  render() {
    let { user, recipe } = this.state;
    return (
      <div>
        <div className="perfilPortadaImage">
          <div className="container">
            <img
              className="perfilImage"
              src={user.profilePicture}
              alt={user.username}
            />
            <div className="overlay">
              <form onChange={this.props.handleUpdateProfilePicture}>
                <input
                  name="profilePicture"
                  id="upload"
                  type="file"
                  onChange={this.props.handleChange}
                />
              </form>
              <span id="upload_link" onClick={this.handleClick}>
                Editar
              </span>
              ​
            </div>
          </div>
          <div className="perfilName">
            <span>{user.name}</span>
          </div>
        </div>
        <div>
          <Link className=" editUser" to={`/edit/${user._id}`}>
            Editar perfil
          </Link>
        </div>
        <div className="perfilInfo">
          <strong>Username: </strong>
          <p>{user.username}</p>
        </div>
        <div className="perfilInfo">
          <strong>Email: </strong>
          <p>{user.email}</p>
        </div>
        <div className="subirReceta">
          <Link to={`/new-recipe/${user._id}`}>
            <button className="botonReceta">
              <FontAwesomeIcon icon={faUtensils} /> Subir una receta
            </button>
          </Link>
        </div>
        <div className="perfilReceta">
          <strong>Mis recetas</strong>
          <hr className="uk-divider-icon" />
        </div>
        <div className="listaReceta">
          <ul className="uk-list uk-list-striped">
            {recipe.length > 0 ? (
              recipe.map((item, index) => (
                <li key={index}>
                  <Link to={`/recipeDetail/${item._id}`}>
                    {item.name}
                    <em name="id" style={{ display: "none" }}>
                      {item._id}
                    </em>
                  </Link>
                  <FontAwesomeIcon
                    uk-tooltip="Eliminar receta"
                    className="listIcon"
                    id="iconLapiz"
                    icon={faTrashAlt}
                    uk-toggle="target: #my-id"
                    onClick={() => this.getId(item._id)}
                  />
                  <Link to={`/editRecipe/${item._id}`}>
                    <FontAwesomeIcon
                      uk-tooltip="Editar receta"
                      className="listIcon"
                      icon={faPen}
                    />
                  </Link>
                  <div id="my-id" uk-modal="true">
                    <div className="uk-modal-dialog uk-modal-body">
                      <h4
                        className="modal-title"
                        style={{ textAlign: "center", color: "red"}}
                      >
                        Seguro que quieres borrar {item.name}{" "}
                      </h4>
                      <div style={{ textAlign: "center" }}>
                        <button className="uk-modal-close" type="button" id="buttonCancel">
                          Cancelar
                        </button>
                        <button className="modal-submit" type="button" onClick={this.handleDeleteRecipe} id="buttonFavorites">
                          Borrar receta
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div>
                <strong className="listaVacia">Aún no tienes recetas</strong>
              </div>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Profile;
