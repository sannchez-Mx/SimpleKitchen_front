import React, { Component } from "react";
import axios from "axios";
import Card from "../RecipeCard/card";
import UIkit from "uikit";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      busqueda: {},
      recipes: []
    };
  }
  handleChange = e => {
    const { busqueda } = this.state;
    let field = e.target.name;
    busqueda[field] = e.target.value;
    this.setState({ busqueda });
    //console.log(busqueda);
  };
  handleSearch = e => {
    e.preventDefault();
    const base_url =
      window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://simplekitchen.herokuapp.com";
    const { busqueda } = this.state;
    axios
      .post(`${base_url}/search/`, busqueda)
      .then(res => {
        this.setState({ recipes: res.data.items });
        //console.log(res.data.msg);
        UIkit.notification({
          message: res.data.msg,
          status: "success",
          pos: "top-right",
          timeout: 2500
        });
      })
      .catch(err => {
        //console.log("error busqueda", err.response.data.msg);
        UIkit.notification({
          message: err.response.data.msg,
          status: "danger",
          pos: "top-right",
          timeout: 2500
        });
      });
  };
  render() {
    let recipes = this.state.recipes;
    return (
      <div>
        <div className="areaSearch">
          <form onSubmit={this.handleSearch}>
            <p className="lemaSearch">¿QUÉ QUIERES COCINAR?</p>
            <input
              type="text"
              name="search"
              placeholder="Buscar.."
              onChange={this.handleChange}
            />
          </form>
        </div>
        <div className="texto">
          <p>
            <strong className="frase">
              Aprende a cocinar las mejores recetas
            </strong>{" "}
            de comida fáciles, recetas de comida mexicana, recetas de comida
            saludable de forma rápida y sencilla.
          </p>
        </div>
        <div id="recetasCard">
          {recipes.length > 0
            ? recipes.map((recipe, index) => (
                <Card recipe={recipe} key={index} user={recipe._user} />
              ))
            : ""}
        </div>
      </div>
    );
  }
}

export default Home;
