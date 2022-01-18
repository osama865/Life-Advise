import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>
        NOT FOUND back to
        <span>
          <Link to="/random"> Main page </Link>
        </span>
      </h1>
    </div>
  );
}
