import React from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comment = ({ comentario, user, index }) => (
  <article className="uk-comment uk-comment-primary" style={{borderBottom: "1px solid gray"}}>
    <header className="uk-comment-header uk-grid-medium uk-flex-middle" uk-grid="true">
      <div className="uk-width-auto">
        <img
          className="uk-comment-avatar"
          src={user.profilePicture}
          width="50"
          height="50"
          alt=""
        />
      </div>
      <div className="uk-width-expand">
        <h4 className="uk-comment-title uk-margin-remove">
          <span className="uk-link-reset">
            {user.name}
          </span>
        </h4>
        <ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
          <li>
            <span>{comentario.date}</span>
          </li>
          <li>
            <em style={{color: "red", fontSize: "medium"}}>{comentario.rating}</em> <FontAwesomeIcon icon={faStar} style={{color: "yellow"}}/> 
          </li>
        </ul>
      </div>
    </header>
    <div className="uk-comment-body">
      <p>
        {comentario.comment}
      </p>
    </div>
  </article>
);

export default Comment;
