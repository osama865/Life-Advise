import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { App } from "/imports/ui/App";
import { BrowserRouter as Router } from "react-router-dom";
Meteor.startup(() => {
  render(
    <Router>
      <App />
    </Router>,

    document.getElementById("react-target")
  );
});
