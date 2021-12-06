import React from "react";
import { Link} from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      NOT FOUND back to <Link to="/random"> Main page </Link>
    </div>
  );
}
