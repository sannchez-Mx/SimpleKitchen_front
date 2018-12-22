import React, { Component } from "react";
import {
  faUser,
  faEnvelope,
  faUnlockAlt,
  faSignInAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SignUp from "../Sign_Up_Form/Sign_Form";
import { Link } from "react-router-dom";

class Sign_Up extends Component {
  render() {
    return (
      <div>
        <div>
          <div id="tituloForm">
            <h3 className="tituloForm">Regístrate o inicia sesión.</h3>
          </div>
          <div className="uk-alert-danger">
          <p id="errMsg"></p>
          </div>
          <form onSubmit={this.props.handleSignup}>
            <SignUp
              name="username"
              type="text"
              handleChange={this.props.handleChange}
              placeholder="Nombre de usuario"
              icon={faUser}
            />
            <SignUp
              name="name"
              type="text"
              handleChange={this.props.handleChange}
              placeholder="Nombre"
              icon={faUser}
            />
            <SignUp
              name="email"
              type="email"
              handleChange={this.props.handleChange}
              placeholder="ejemplo@live.com"
              icon={faEnvelope}
            />
            <SignUp
              name="password"
              type="password"
              handleChange={this.props.handleChange}
              placeholder="Contraseña"
              icon={faUnlockAlt}
            />
            <SignUp
              name="confirmPassword"
              type="password"
              handleChange={this.props.handleChange}
              placeholder="Repite tu contraseña"
              icon={faUnlockAlt}
            />
            <p>
              Ya tienes cuenta?&nbsp;
              <Link to={`/login`}>
                <FontAwesomeIcon icon={faSignInAlt} /> Iniciar sesión
              </Link>
            </p>
            <button type="submit" className=" formButton uk-button uk-button-default">
              Registrarme
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Sign_Up;
