import React, { Component } from "react";
import {
  faUser,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import SignUp from "../Sign_Up_Form/Sign_Form";
import {Link} from 'react-router-dom';
import {isLoggedIn} from '../../service'

class FormEdit extends Component {
  componentWillMount() {
    const token = localStorage.getItem("token");
    token ? isLoggedIn(this.props.history) : this.props.history.push("/login");
  }
  render() {
      let user = this.props.state.user
    return (
      <div className="formEdit">
        <h1>Edita tu perfil</h1>
        <form onSubmit={this.props.handleEditUser}>
          <SignUp
            name="username"
            type="text"
            handleChange={this.props.handleChange}
            placeholder={user.username}
            icon={faUser}
          />
          <SignUp
              name="name"
              type="text"
              handleChange={this.props.handleChange}
              placeholder={user.name}
              icon={faUser}
            />
            <SignUp
              name="email"
              type="email"
              handleChange={this.props.handleChange}
              placeholder={user.email}
              icon={faEnvelope}
            />
            <div>
            <button className=" formEditButton uk-button uk-button-default">
              <Link to={`/profile`}>Regresar</Link>
            </button>
             <button type="submit" className=" formEditButton uk-button uk-button-default">
              Editar perfil
            </button>
            </div>
        </form>
      </div>
    );
  }
}

export default FormEdit;
