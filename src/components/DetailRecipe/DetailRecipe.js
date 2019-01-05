import React, { Component } from "react";
import axios from "axios";
import {
  faClock,
  faSignal,
  faStar,
  faHeart
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Comment from "../CommentCard/Comment";
import UIkit from "uikit";

class DetailRecipe extends Component {
  constructor() {
    super();
    this.state = {
      recipe: {},
      user: {},
      images: [],
      userLog: {},
      comment: {
        rating: 1
      },
      comments: [],
      dataUser: {}
    };
  }
  componentWillMount() {
    let userLog = this.props.state.user;
    this.setState({ userLog });
    const base_url =
      window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://simplekitchen.herokuapp.com";
    const { id } = this.props.match.params;
    axios
      .get(`${base_url}/recipe/recipeDetail/${id}`)
      .then(res => {
        //console.log("recipe data ===>", res.data.recipe[0].images);
        this.setState({ recipe: res.data.recipe[0] });
        this.setState({ user: res.data.recipe[0]._user });
        this.setState({ images: res.data.recipe[0].images });
      })
      .catch(err => {
        console.log("Error recipe detail =====> ", err);
      });

    axios.get(`${base_url}/comment/allComments/${id}`).then(res => {
      //console.log("comentarios ==>", res.data.Comments);
      this.setState({ comments: res.data.Comments });
    });
  }
  handleChange = e => {
    const { comment } = this.state;
    let field = e.target.name;
    comment[field] = e.target.files ? e.target.files[0] : e.target.value;
    this.setState({ comment });
    //console.log(comment);
  };

  handleSubmitComment = () => {
    const base_url =
      window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://simplekitchen.herokuapp.com";
    const { id } = this.props.match.params;
    let { comment, userLog } = this.state;
    comment._user = userLog._id;
    //console.log("Comentari=====>", comment);
    axios
      .post(`${base_url}/comment/new/${id}`, comment)
      .then(res => {
        //console.log("comment axios ===>", res)
        UIkit.notification({
          message: res.data.msg,
          status: "success",
          pos: "top-right",
          timeout: 5000
        });
      })
      .catch(err => {
        console.log("comment axios error =====> ", err);
      });
  };

  handleFavorites = () => {
    const base_url =
      window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://simplekitchen.herokuapp.com";
    const { id } = this.props.match.params;
    let { comment, userLog } = this.state;
    comment._user = userLog._id;
    axios.post(`${base_url}/favorite/new/${id}`, comment)
    .then(res => {
      UIkit.notification({
        message: res.data.msg,
        status: "success",
        pos: "top-right",
        timeout: 2000
      });
    })
    .catch(err => {
      UIkit.notification({
        message: err,
        status: "warning",
        pos: "top-right",
        timeout: 2500
      });
    });
  };

  handleModalImage = () => {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementById("myImg");
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    img.onclick = function() {
      modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
    };

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    };
  };

  render() {
    const { recipe, user, comments, images } = this.state;
    let user1 = this.props.state.user;
    const token = localStorage.getItem("token");
    return (
      <div>
        <div className="detalleReceta">
          <div className="recipeHeader">
            {token ? (
              <FontAwesomeIcon
                id="heartIcon"
                icon={faHeart}
                uk-tooltip="Agregar a favoritos"
                onClick={this.handleFavorites}
              />
            ) : (
              <FontAwesomeIcon
                id="heartIcon"
                icon={faHeart}
                uk-tooltip="Inicia sesión para agregar a favoritos"
              />
            )}
            <img
              id="imageHeaderRecipe"
              src={images[0]}
              alt="foto de referencia"
            />
            <h1 className="recipeName">{recipe.name}</h1>
          </div>
          <div
            className="uk-position-relative uk-visible-toggle uk-light"
            uk-slider="true"
          >
            <ul
              id="sliderImages"
              className="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@m uk-grid"
            >
              {images.length > 0 ? (
                images.map((image, index) => (
                  <li key={index}>
                    <div className="uk-panel">
                      <img
                        onClick={this.handleModalImage}
                        id="myImg"
                        src={image}
                        alt={user.username}
                      />
                      <div className="uk-position-center uk-panel">
                        <h1>{index + 1}</h1>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div style={{ textAlign: "center" }}>
                  <strong>
                    El usuario no subió ninguna imagen o foto de referecia
                  </strong>
                </div>
              )}
            </ul>
            <div id="myModal" className="modal">
              <span className="close">&times;</span>
              <img className="modal-content" id="img01" alt="" />
              <div id="caption" />
            </div>
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
            <p id="commentModal" className="uk-modal-title">
              Haz un comentario {user1.name}
            </p>
            <form onSubmit={this.handleSubmitComment}>
              <FontAwesomeIcon icon={faStar} />
              Calificación
              <select
                id="ratingInput"
                className="inputDificultad"
                name="rating"
                onChange={this.handleChange}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
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
            comments.map((comment, index) => (
              <Comment comentario={comment} user={comment._user} key={index} />
            ))
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
