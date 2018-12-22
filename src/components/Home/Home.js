import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div>
        <div className="areaSearch">
          <form>
            <p className="lemaSearch">¿QUÉ QUIERES COCINAR?</p>
            <input type="text" name="search" placeholder="Buscar.." />
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
      </div>
    );
  }
}

export default Home;
