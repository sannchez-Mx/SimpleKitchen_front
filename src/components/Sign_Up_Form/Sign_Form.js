import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faUser, faEnvelope, faUnlockAlt);

const SignUp = ({ handleChange, placeholder, type, name, icon }) => (
  <div>
    <div className="uk-margin">
      <div className="uk-inline">
        <span className="uk-form-icon"><FontAwesomeIcon icon={icon}/></span>
        <input className="uk-input" name={name} type={type} onChange={handleChange} placeholder={placeholder} />
      </div>
    </div>
  </div>
);

export default SignUp;