import axios from "axios";
import UIkit from "uikit";

const base_url =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://simplekitchen.herokuapp.com";

export const Signup = (user, history) => {
  axios
    .post(`${base_url}/auth/signup`, user)
    .then(res => {
      UIkit.notification({
        message: res.data.msg,
        status: "success",
        pos: "top-right",
        timeout: 2000
      });
      //console.log(res);
      history.push("/profile");
    })
    .catch(err => {
      //console.log("Error Signup =====> ", err.response.data.msg);
      UIkit.notification({
        message: err.response.data.msg,
        status: "warning",
        pos: "top-right",
        timeout: 2000
      });
    });
};

export const loginService = (user, history) => {
  axios
    .post(`${base_url}/auth/login`, user)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      UIkit.notification({
        message: res.data.msg,
        status: "success",
        pos: "top-right",
        timeout: 5000
      });
      window.location.reload();
      history.push("/profile");
    })
    .catch(err => {
      //console.log("Error login =====> ", err.data);
      UIkit.notification({
        message: err.response.data.msg,
        status: "danger",
        pos: "top-right",
        timeout: 5000
      });
    });
};

export const editUser = (user, id, history) => {
  axios
    .post(`${base_url}/profile/edit/${id}`, user)
    .then(res => {
      UIkit.notification({
        message: res.data.msg,
        status: "success",
        pos: "top-right",
        timeout: 5000
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      history.push("/profile");
    })
    .catch(err => {
      //console.log("Error actualizar =====> ", err.response.data.msg);
      UIkit.notification({
        message: err.response.data.msg,
        status: "danger",
        pos: "top-right",
        timeout: 5000
      });
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
      UIkit.notification({
        message: err.response.data.msg,
        status: "warning",
        pos: "top-right",
        timeout: 2000
      });
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
      UIkit.notification({
        message: res.data.msg,
        status: "success",
        pos: "top-right",
        timeout: 5000
      });
      window.location.reload();
      //console.log("foto de usuario actualizada", res.data.user);
    });
};

export const NewRecipe = (form, history, id) => {
  let formData = new FormData();

  if (form.images) {
    for (let file of form.images) {
      formData.append("images", file);
    }
    delete form.images;
  }
  for (let k in form) {
    formData.append(k, form[k]);
  }
  axios
    .post(`${base_url}/recipe/new/${id}`, formData, form, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(res => {
      UIkit.notification({
        message: res.data.msg,
        status: "success",
        pos: "top-right",
        timeout: 2500
      });
      history.push("/profile");
      //window.location.reload();
    })
    .catch(err => {
      console.log("Error new  recipe =====> ", err.response.data);
      let errMsg = err.response.data.msg;
      document.getElementById("errMsg").innerHTML = errMsg;
    });
};

export const EditRecipe = (form, history, id) => {
  let formData = new FormData();

  if (form.images) {
    for (let file of form.images) {
      formData.append("images", file);
    }
    delete form.images;
  }
  for (let k in form) {
    formData.append(k, form[k]);
  }
  axios
    .post(`${base_url}/recipe/editRecipe/${id}`, formData, form, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(res => {
      //console.log("edit recipe respuesta ==>", res);
      UIkit.notification({
        message: res.data.msg,
        status: "success",
        pos: "top-right",
        timeout: 5000
      });
      history.push("/profile");
    })
    .catch(err => {
      console.log("Error actualizar =====> ", err);
      UIkit.notification({
        message: err.response.data.msg,
        status: "warning",
        pos: "top-right",
        timeout: 5000
      });
    });
};

export const DeleteRecipe = id => {
  axios
    .post(`${base_url}/recipe/delete/${id}`)
    .then(res => {
        UIkit.notification({
        message: res.data.msg,
        status: "success",
        pos: "top-right",
        timeout: 2500
      })
      window.location.reload();
    })
    .catch(err => {
      UIkit.notification({
        message: err.response.data.msg,
        status: "warning",
        pos: "top-right",
        timeout: 5000
      });
    });
};

export const Deletefavorites = id => {
  axios
    .post(`${base_url}/favorite/delete/${id}`)
    .then(res => {
        UIkit.notification({
        message: res.data.msg,
        status: "success",
        pos: "top-right",
        timeout: 2500
      })
      window.location.reload();
    })
    .catch(err => {
      UIkit.notification({
        message: err.response.data.msg,
        status: "warning",
        pos: "top-right",
        timeout: 2000
      });
    });
};

export const Logout = history => {
  localStorage.clear();
  UIkit.notification({
    message: "Nos vemos luego",
    status: "primary",
    pos: "top-right",
    timeout: 2000
  });
  history.push("/login");
};
