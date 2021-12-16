import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="nav-bar">
      <Link to="/saved">
        <button className="nav favorite">
          <i className="fas fa-heart"></i> My Favorites
        </button>
      </Link>
      <Link to="/random">
        <button className="nav favorite">
          <i className="fas fa-comment-alt"></i> Random
        </button>
      </Link>
      <Link to="/all">
        <button className="nav favorite">
          <i className="fas fa-list"></i> All
        </button>
      </Link>
      <a target="_blank" href="https://o-portfolio.netlify.com">
        <button className="nav favorite">
          <i className="fa fa-reply"></i> Contact Me
        </button>
      </a>
    </div>
  );
}
