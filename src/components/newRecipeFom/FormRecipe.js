import React, { Component } from "react";
import { isLoggedIn, EditRecipe } from "../../service";
import { faClock, faSignal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

class FormRecipe extends Component {
  constructor() {
    super();
    this.state = {
      form: {
        difficulty: "Fácil"
      },
      editRecipe: {}
    };
  }
  componentWillMount() {
    const token = localStorage.getItem("token");
    token ? isLoggedIn(this.props.history) : this.props.history.push("/login");
    if (this.props.match.path === "/editRecipe/:id") {
      const base_url =
        window.location.hostname === "localhost"
          ? "http://localhost:3000"
          : "https://simplekitchen.herokuapp.com";
      const { id } = this.props.match.params;
      axios.get(`${base_url}/recipe/recipeDetail/${id}`).then(res => {
        this.setState({ editRecipe: res.data.recipe[0] });
      });
    }
  }

    handleEditRecipe = () => {
      const { id } = this.props.match.params;
      EditRecipe(this.props.state.form, this.props.history, id)
    };

  render() {
    let user = this.props.state.user;
    let { editRecipe } = this.state;
    return (
      <div className="formRecipe">
        {this.props.match.path === "/new-recipe/:id" ? (
          <form onSubmit={this.props.handleNewRecipe}>
            <div className="formRecipeHeader">
              <h1>Sube tu receta</h1>
              <div className="areaImages">
                <div className="upload">
                  <img
                    id="imageArea"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Circle-icons-camera.svg/480px-Circle-icons-camera.svg.png"
                    alt="camera icon"
                  />
                  <input
                    id="uploadImages"
                    name="images"
                    type="file"
                    onChange={this.props.handleChangeRecipe}
                    multiple
                  />
                </div>
                <div className="uploadText">Agrega una foto</div>
              </div>
              <input
                className="inputName"
                name="name"
                type="text"
                onChange={this.props.handleChangeRecipe}
                placeholder="Escribe el título aquí"
              />
            </div>
            <div className="areaInputTime">
              <FontAwesomeIcon icon={faClock} />
              <input
                className="inputTime"
                name="time"
                type="number"
                onChange={this.props.handleChangeRecipe}
                placeholder="Tiempo en minutos"
              />
              <FontAwesomeIcon icon={faSignal} />
              <select
                className="inputDificultad"
                name="difficulty"
                onChange={this.props.handleChangeRecipe}
              >
                <option>Fácil</option>
                <option>Media</option>
                <option>Avanzada</option>
              </select>
            </div>
            <hr className="uk-divider-icon" />
            <textarea
              style={{ border: "1px solid #cbcbcb", fontSize: "14px" }}
              name="description"
              rows="4"
              cols="40"
              onChange={this.props.handleChangeRecipe}
              placeholder="Cuéntanos un poco más sobre tu receta"
            />
            <hr id="hr" className="uk-divider-icon" />
            <div className="imageUser">
              <img id="imageUser" src={user.profilePicture} alt={user.name} />
              <p>{user.name}</p>
            </div>
            <div>
              <p className="ingredientes">Ingredientes</p>
              <input
                className="inputPorciones"
                name="servings"
                type="number"
                onChange={this.props.handleChangeRecipe}
                placeholder="Porciones"
              />
              <textarea
                style={{ border: "1px solid #cbcbcb", fontSize: "14px" }}
                name="ingredients"
                rows="4"
                cols="40"
                onChange={this.props.handleChangeRecipe}
                placeholder="Escribe los ingredientes de tu receta"
              />
              <hr className="uk-divider-icon" />
              <p className="ingredientes">Preparación</p>
              <textarea
                style={{ border: "1px solid #cbcbcb", fontSize: "14px" }}
                name="preparation"
                rows="4"
                cols="40"
                onChange={this.props.handleChangeRecipe}
                placeholder="Escribe los pasos. Ejemplo: Lava y desinfecta frutas y verduras"
              />
            </div>
            <button id="buttonRecipe" type="submit" className="uk-button">
              Subir receta
            </button>
          </form>
        ) : (
          <form onSubmit={this.handleEditRecipe}>
            <div className="formRecipeHeader">
              <h1>Edita tu receta</h1>
              <div className="areaImages">
                <div className="upload">
                  <img
                    id="imageArea"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Circle-icons-camera.svg/480px-Circle-icons-camera.svg.png"
                    alt="camera icon"
                  />
                  <input
                    id="uploadImages"
                    name="images"
                    type="file"
                    onChange={this.props.handleChangeRecipe}
                    multiple
                  />
                </div>
                <div className="uploadText">Actuliza tus foto</div>
              </div>
              <input
                className="inputName"
                name="name"
                type="text"
                onChange={this.props.handleChangeRecipe}
                placeholder={editRecipe.name}
              />
            </div>
            <div className="areaInputTime">
              <FontAwesomeIcon icon={faClock} />
              <input
                className="inputTime"
                name="time"
                type="number"
                onChange={this.props.handleChangeRecipe}
                placeholder={editRecipe.time}
              />
              <FontAwesomeIcon icon={faSignal} />
              <select
                className="inputDificultad"
                name="difficulty"
                onChange={this.props.handleChangeRecipe}
              >
                <option>Fácil</option>
                <option>Media</option>
                <option>Avanzada</option>
              </select>
            </div>
            <hr className="uk-divider-icon" />
            <textarea
              style={{ border: "1px solid #cbcbcb", fontSize: "14px" }}
              name="description"
              rows="4"
              cols="40"
              onChange={this.props.handleChangeRecipe}
              placeholder={editRecipe.description}
            />
            <hr id="hr" className="uk-divider-icon" />
            <div className="imageUser">
              <img id="imageUser" src={user.profilePicture} alt={user.name} />
              <p>{user.name}</p>
            </div>
            <div>
              <p className="ingredientes">Ingredientes</p>
              <input
                className="inputPorciones"
                name="servings"
                type="number"
                onChange={this.props.handleChangeRecipe}
                placeholder={editRecipe.servings}
              />
              <textarea
                style={{ border: "1px solid #cbcbcb", fontSize: "14px" }}
                name="ingredients"
                rows="4"
                cols="40"
                onChange={this.props.handleChangeRecipe}
                placeholder={editRecipe.ingredients}
              />
              <hr className="uk-divider-icon" />
              <p className="ingredientes">Preparación</p>
              <textarea
                style={{ border: "1px solid #cbcbcb", fontSize: "14px" }}
                name="preparation"
                rows="4"
                cols="40"
                onChange={this.props.handleChangeRecipe}
                placeholder={editRecipe.preparation}
              />
            </div>
            <button id="buttonRecipe" type="submit" className="uk-button">
              Editar receta
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default FormRecipe;
