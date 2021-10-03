import './App.css';
import React from "react"
import { Route } from "react-router-dom"
import landingpage from './modules/ladingpag/landingpag';
import Paginaprincipal from './modules/paginaprincipal/paginaprincipal';
//import navbar from './modules/navbar/navbar';


function App() {
  return (
    <div className="App">
      <Route exact path="/" component={landingpage}/>
      <Route  path="/paginaprincipal" component={Paginaprincipal}/>
      {/* <Route exact path="/home" component={navbar}/> */}
    </div>
  );
}

export default App;


