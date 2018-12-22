import React, { Component } from "react";
import "./styles/App.css";
import "./styles/Profile.css";
import "./styles/Nav.css";
import "./styles/Form.css";
import "./styles/DetailRecipe.css";
import "./styles/FormEdit.css";
import "./styles/FormNewRecipe.css";
import "./styles/cardRecipe.css";
import './styles/home.css';
import {withRouter} from 'react-router-dom';
import Router from "./Router";
import NavBar from "./components/Nav/Nav";
import {Logout, loginService, Signup, NewRecipe, editUser, ProfilePicture} from './service';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      form: {
        difficulty: "Fácil",
      }
    };
  }

  handleLogin = e => {
    e.preventDefault();
    let {user} = this.state;
    loginService(user, this.props.history, );
    this.setState({user})
  };

  handleSignup = e => {
    e.preventDefault();
    const {user} = this.state;
    Signup(this.state.user, this.props.history);
    this.setState({user})
  };

  handleEditUser = e => {
    e.preventDefault();
    const {user} = this.state;
    editUser(user, user._id, this.props.history)
    this.setState({user})
    console.log("usuario editado", user);
  }

  handleUpdateProfilePicture = e => {
    e.preventDefault();
    const {user} = this.state;
    ProfilePicture(user, user._id)
  }

  handleNewRecipe = e => {
    e.preventDefault();
    const {form} = this.state.form;
    console.log("new recipe", form);
    NewRecipe(this.state.form, this.props.history, this.state.user._id)
  }

  handleLogout = () => {
    let {user} = this.state;
    user={}
    Logout(this.props.history);
    this.setState({user})
  };

  handleChange = e => {
    const { user } = this.state;
    let field = e.target.name;
    user[field] = e.target.files ? e.target.files[0] : e.target.value;
    this.setState({ user });
    //console.log(user);
  };
  
  handleChangeRecipe = e => {
    const { form } = this.state;
    let field = e.target.name;
    form[field] = e.target.files ? e.target.files : e.target.value;
    this.setState({ form });
    console.log("form new receta", form);
  };

  handleRedirect = () => {
    this.props.history.push("/login");
  };

  componentWillMount(){
    let user = JSON.parse(localStorage.getItem("user"));
    user ? this.setState({user}) : this.props.history.push("/");
  }
  render() {
    return (
      <div className="App">
        <NavBar state={this.state} handleLogout={this.handleLogout}/>
        <Router 
          state={this.state}
          handleLogin={this.handleLogin}
          handleNewRecipe={this.handleNewRecipe}
          handleSignup={this.handleSignup}
          handleChange={this.handleChange}
          handleChangeRecipe={this.handleChangeRecipe}
          handleEditUser={this.handleEditUser}
          handleUpdateProfilePicture={this.handleUpdateProfilePicture}
        />
      </div>
    );
  }
}

export default withRouter(App);
