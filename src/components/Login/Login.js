import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faUnlockAlt,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';
import { library } from "@fortawesome/fontawesome-svg-core";
import SignUp from "../Sign_Up_Form/Sign_Form";

library.add(faUser, faEnvelope, faUnlockAlt);

class Login extends Component {
  render() {
    return (
      <div>
        <h1 id="tituloForm">Inicia sesión</h1>
        {/* <div className="uk-alert-danger">
          <p id="errMsg"></p>
          </div> */}
        <form onSubmit={this.props.handleLogin}>
          <SignUp
            name="username"
            type="text"
            icon={faUser}
            placeholder="Nombre de usuario"
            handleChange={this.props.handleChange}
          />
          <SignUp
            name="password"
            type="password"
            icon={faUnlockAlt}
            placeholder="Contraseña"
            handleChange={this.props.handleChange}
          />
          <p>
            No tienes cuenta?&nbsp;
            <Link to={`/registro`}>
              <FontAwesomeIcon icon={faUserPlus} /> Registrate
            </Link>
          </p>
          <button
            type="submit"
            className=" formButton uk-button uk-button-default">
            Ingresar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
