import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
import Header from "./components/Header/Header";
import Category from "./components/Category/Category";

// pages
import Home from "./pages/Home/Home";
import Error from "./pages/Error/Error";

import Genres from "./pages/Genres/Genres";
import FullMovie from "./pages/FullMovie/FullMovie";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main">
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/genre/:id">
              <Genres />
            </Route>
            <Route path="/movie/:id">
              <FullMovie />
            </Route>
            <Route path="*">
              <Error />
            </Route>
          </Switch>
          <div className="category__container">
            <Category />
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
