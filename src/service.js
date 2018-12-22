import axios from "axios";

const base_url = "http://localhost:3000";

export const Signup = (user, history) => {
  axios
    .post(`${base_url}/auth/signup`, user)
    .then(res => {
      alert(res.data.msg);
      console.log(res);
      history.push("/profile");
    })
    .catch(err => {
      console.log("Error Signup =====> ", err.response.data.msg);
      let errMsg = err.response.data.msg;
      document.getElementById("errMsg").innerHTML = errMsg;
    });
};

export const loginService = (user, history) => {
  axios
    .post(`${base_url}/auth/login`, user)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert(res.data.msg);
      window.location.reload();
      history.push("/profile");
    })
    .catch(err => {
      console.log("Error login =====> ", err.data);
      let errMsg = err.response.data.msg;
      document.getElementById("errMsg").innerHTML = errMsg;
    });
};

export const editUser = (user, id, history) => {
  axios
    .post(`${base_url}/profile/edit/${id}`, user)
    .then(res => {
      alert(res.data.msg);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      history.push("/profile");
    })
    .catch(err => {
      console.log("Error actualizar =====> ", err.response.data.msg);
      let errMsg = err.response.data.msg;
      document.getElementById("errMsg").innerHTML = errMsg;
    });
};

export const isLoggedIn = history => {
  const token = localStorage.getItem("token");
  axios
    .get(`${base_url}/auth/loggedin`, {
      headers: {
        "x-access-token": token
      }
    })
    .then(res => {
      console.log("Valid token", res.data);
    })
    .catch(err => {
      alert(err.response.data.msg);
      localStorage.clear();
      history.push("/login");
    });
};

export const ProfilePicture = (user, id) => {
  console.log(user);
  let formData = new FormData();
  Object.keys(user).forEach(key => {
    formData.append(key, user[key]);
  });
  axios
    .patch(`${base_url}/profile/profilePicture/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(res => {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.reload();
      alert(res.data.msg);
      console.log("foto de usuario actualizada", res.data.user);
    });
};

export const NewRecipe = (form, history, id) => {

  let formData = new FormData();

  console.log("perro",form)

  if(form.images){
    for(let file of form.images){
      formData.append("images", file)
    }
    delete form.images
  }
  for(let k in form){
    formData.append(k, form[k])
  }
  axios
    .post(`${base_url}/recipe/new/${id}`, formData, form, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(res => {
      alert(res.data.msg);
      console.log(res);
      history.push("/profile");
      window.location.reload();
    })
    .catch(err => {
      console.log("Error new  recipe =====> ", err.response.data);
      let errMsg = err.response.data.msg;
      document.getElementById("errMsg").innerHTML = errMsg;
    });
};

export const Logout = history => {
  localStorage.clear();
  alert("Nos vemos luego");
  history.push("/login");
};
