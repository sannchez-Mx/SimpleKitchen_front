import React from 'react';
import {Switch, Route} from "react-router-dom";
import Home from './components/Home/Home';
import SignUp from './components/Sign_Up/SignUp';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import NotFound from './404';
import FormRecipe from './components/newRecipeFom/FormRecipe';
import FormEdit from './components/FormEditUser/FormEdit'
import DetailRecipe from './components/DetailRecipe/DetailRecipe';
import AllRecipes from './components/AllRecipes/AllRecipes';
import FavoritesRecipes from './components/Favorites/Favorites';

const Router = ({state, handleLogin, handleNewRecipe, handleChangeRecipe, handleChange, handleSignup,
handleEditUser, handleUpdateProfilePicture}) => (
    <Switch>
    
    <Route exact path='/' render={(props) => (
        <Home state={state} {...props} />)} />
    <Route exact path='/login' render={(props) => (
      <Login handleLogin={handleLogin} handleChange={handleChange} {...props} />)} />
    <Route exact path='/registro' render={(props) => (
      <SignUp handleSignup={handleSignup} handleChange={handleChange} {...props} />)} />
    <Route exact path='/profile' render={(props) => (
      <Profile   handleUpdateProfilePicture={handleUpdateProfilePicture} handleChange={handleChange} state={state} {...props} />)} />
    <Route exact path='/new-recipe/:id' render={(props) => (
      <FormRecipe handleNewRecipe={handleNewRecipe} handleChangeRecipe={handleChangeRecipe} state={state} {...props} />)} />
    <Route exact path='/editRecipe/:id' render={(props) => (
      <FormRecipe handleNewRecipe={handleNewRecipe} handleChangeRecipe={handleChangeRecipe} state={state} {...props} />)} />
    <Route exact path='/edit/:id' render={(props) => (
      <FormEdit handleEditUser={handleEditUser} handleChange={handleChange} state={state} {...props} />)} />
    <Route exact path='/recipeDetail/:id' render={(props) => (
      <DetailRecipe state={state} {...props} />)} />
    <Route exact path='/allRecipes' render={(props) => (
      <AllRecipes state={state} {...props} />)} />
    <Route exact path='/favorites/:id' render={(props) => (
      <FavoritesRecipes state={state} {...props} />)} />
    <Route exact path='*' component={NotFound} />

    </Switch>
);

export default Router;