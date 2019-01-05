import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  faSignOutAlt,
  faBook,
  faHeart,
  faUtensils,
  faCog,
  faSignInAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class NavBar extends Component {
  render() {
    let user = this.props.state.user;
    const token = localStorage.getItem("token");
    return (
      <nav
        className="uk-margin-nav uk-navbar-container uk-margin"
        uk-navbar="true"
      >
        <div className="uk-navbar-left">
          <Link className="uk-navbar-item uk-logo" to={`/`}>
            SimpleKitchen
          </Link>
          {token ? (
            <button
            id="button-default"
              className="uk-button uk-button-default"
              type="button"
              uk-toggle="target: #offcanvas-flip"
            >
              <img src={user.profilePicture} alt={user.username} />
            </button>
          ) : (
            <button
              id="button-default"
              className="uk-button uk-button-default"
              type="button"
              uk-toggle="target: #offcanvas-flip"
            >
              &#9776;
            </button>
          )}
        </div>
        <div id="offcanvas-flip" uk-offcanvas="flip: true; overlay: true">
          <div className="uk-offcanvas-bar">
            <button
              className="uk-offcanvas-close"
              type="button"
              uk-close="true"
            />
            {token ? (
              <div className="navProfile">
                <img
                  className="NavProfileImage"
                  src={user.profilePicture}
                  alt={user.username}
                />
                <strong><Link to={`/profile`}>{user.username}</Link></strong>
              </div>
            ) : (
              <h4>
                <Link to={`/login`}>
                  <FontAwesomeIcon icon={faSignInAlt} /> Ingresa
                </Link>
              </h4>
            )}
            {token ? (
              <h4>
                <Link to={`/favorites/${user._id}`}>
                <FontAwesomeIcon icon={faHeart} /> Favoritos
                </Link>
              </h4>
            ) : (
              ""
            )}
            {token ? (
              <h4>
                <Link to={`/new-recipe/${user._id}`}>
                  <FontAwesomeIcon icon={faUtensils} /> Subir una receta
                </Link>
              </h4>
            ) : (
              ""
            )}
            {/* <h4>
              <FontAwesomeIcon icon={faCalendarDay} /> Hoy
            </h4> */}
            <h4>
              <Link to={`/allRecipes`}>
                <FontAwesomeIcon icon={faBook} /> Recetas
              </Link>
            </h4>
            {token ? (
              <h4>
                <Link to={`/edit/${user._id}`}>
                  <FontAwesomeIcon icon={faCog} /> Editar perfil
                </Link>
              </h4>
            ) : (
              ""
            )}
            {token ? (
              <h4 onClick={this.props.handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión
              </h4>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
