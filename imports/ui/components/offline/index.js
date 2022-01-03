import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function Offline() {
  return (
    <div id="no-internet" className="overlay" style={{zIndex:400}}>
      <div className="popup">
        <h2>Someting wrong!</h2>
        <a className="close" href="#">
          &times;
        </a>
        <div className="content">there is no internet connection :(</div>
        <a className="goto-saved" href="/saved#">You can go to checkout your saved Advices!</a>
      </div>
    </div>
  );
}
