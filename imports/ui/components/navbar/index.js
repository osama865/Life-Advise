import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav>
      <Link to="/saved"> saved </Link>
      <Link to="/random"> random advises </Link>
      <Link to="/all"> all </Link>
    </nav>
  );
}
