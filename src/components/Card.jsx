import React from 'react'
import { Link } from 'react-router-dom'
import './Card.css' // Optional: create a CSS file for specific card styles

const Card = (props) =>  {
  return (
      <div className="Card">
          <Link to={'/edit/'+ props.id}>
            <img className="moreButton" alt="edit button" src="https://img.icons8.com/material-outlined/24/edit--v1.png" />
          </Link>
          
          <h2 className="title">{props.title}</h2>
          <h3 className="author">{"Posted " + new Date(props.created_at).toLocaleDateString()}</h3>
          <p className="upvotes">👍 {props.upvotes} Upvotes</p>
          
          <Link to={'/post/'+ props.id}>
            <button className="headerBtn">See More</button>
          </Link>
      </div>
  );
};

export default Card;