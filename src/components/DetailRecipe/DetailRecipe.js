import React, { Component } from "react";
import axios from "axios";
import { faClock, faSignal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class DetailRecipe extends Component {
  constructor() {
    super();
    this.state = {
      recipe: {},
      user: {},
      comment: {},
      comments: []
    };
  }
  componentWillMount() {
    this.setState({ userId : this.props.state.user._id})
    const base_url = "http://localhost:3000";
    const { id } = this.props.match.params;
    axios
      .get(`${base_url}/recipe/recipeDetail/${id}`)
      .then(res => {
        this.setState({ recipe: res.data.recipe[0] });
        this.setState({ user: res.data.recipe[0]._user });
      })
      .catch(err => {
        console.log("Error recipe detail =====> ", err);
      });
  }
  handleChange = e => {
    const { comment } = this.state;
    let field = e.target.name;
    comment[field] = e.target.files ? e.target.files[0] : e.target.value;
    this.setState({ comment });
    console.log(comment);
  };

  handleSubmitComment = (e) =>{
    e.preventDefault();
    const base_url = "http://localhost:3000";
    const { id } = this.props.match.params;
    axios.post(`${base_url}/comment/new/${id}`, this.state, this.state.comment)
    .then(res => {
      console.log("commen axios ===>", res)
    })
    .catch(err => {
      console.log("commen axios error =====> ", err);
    });
  }
  render() {
    const { recipe, user, comments} = this.state;
    let user1 = this.props.state.user;
    const token = localStorage.getItem("token");
    return (
      <div>
        <div className="detalleReceta">
          <div className="recipeHeader">
            <h1 className="recipeName">{recipe.name}</h1>
          </div>
          <div>
            <span className="infoMinutos">
              <FontAwesomeIcon icon={faClock} /> {recipe.time} minutos
            </span>
            <span className="infoDificultad">
              <FontAwesomeIcon icon={faSignal} /> {recipe.difficulty}
            </span>
          </div>
          <hr className="uk-divider-icon" />
          <div className="infoDescripcion">
            {recipe.description}
            <br />
            Conoce más sobre {user.name}
          </div>
          <hr id="hr2" className="uk-divider-icon" />
          <div className="infoUser">
            <img
              className="imageUserInfo"
              src={user.profilePicture}
              alt={user.username}
            />
            <p className="infoUserName">{user.name}</p>
          </div>
          <div>
            <span className="ingredientes">Ingredientes :</span>
            <span className="infoPorciones">{recipe.servings} Porciones</span>
          </div>
          <div>{recipe.ingredients}</div>
          <hr className="uk-divider-icon" />
          <div className="areaPreparacion">
            <p className="ingredientes">Preparación :</p>
            <div className="infoPreparacion">{recipe.preparation}</div>
          </div>
        </div>
        <hr className="uk-divider-icon" />
        {!token ? (
          <button
            id="mybtn"
            uk-tooltip="Inicia sesión para comentar"
            className="button"
          >
            <span>Comentar </span>
          </button>
        ) : (
          <button className="button" uk-toggle="target: #modal-example">
            <span>Comentar </span>
          </button>
        )}
        <div id="modal-example" uk-modal="true">
          <div className="uk-modal-dialog uk-modal-body">
            <p className="uk-modal-title">Haz un comentario {user1.name}</p>
            <form onSubmit={this.handleSubmitComment}>
            <textarea
              style={{ border: "1px solid #cbcbcb", fontSize: "14px" }}
              name="comment"
              rows="4"
              cols="32"
              onChange={this.handleChange}
              placeholder="Añade un comentario..."
            />
            <p className="uk-text-right">
              <button className="uk-button uk-button-primary" type="submit">
                Comentar
              </button>
            </p>
            </form>
          </div>
        </div>
        <div className="commentArea">
          <h1>Comentarios</h1>
          {comments.length > 0 ? (
            comments.map((comment, index) => <h1>{comment.comment}</h1>)
          ) : (
            <p>
              <strong>Aún no hay comentarios</strong>
              <br /> se el primero en comentar
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default DetailRecipe;
