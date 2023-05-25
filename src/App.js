import React from 'react';
import {Router, Route, browserHistory} from 'react-router';

import './App.css';

import Main from "./components/Main";
import RegisterInvestor from "./components/RegisterInvestor";
import Login from "./components/Login";
import Projects from "./components/Projects";
import AllProjects from "./components/AllProjects";
import RegisterCompany from "./components/RegisterCompany";
import AddProject from "./components/AddProject";
import AddProjectLogo from "./components/AddProjectLogo";
import Project from "./components/Project";
import Interests from "./components/Interests";
import Chat from "./components/Chat";
import Investor from "./components/Investor";
import AddInvestorPhoto from "./components/AddInvestorPhoto";

function App() {
  return (
      <div className="App global-page">
        <Router history={browserHistory}>
          <Route path="/" component={Main}/>
          <Route path="/investor/register" component={RegisterInvestor}/>
          <Route path="/company/register" component={RegisterCompany}/>
          <Route path="/login" component={Login}/>
          <Route path="/projects" component={Projects}/>
          <Route path="/interests" component={Interests}/>
          <Route path="/chats/:id" component={Chat}/>
          <Route path="/all-projects" component={AllProjects}/>
          <Route path="/project" component={AddProject}/>
          <Route path="/projects/:id/logo" component={AddProjectLogo}/>
          <Route path="/investors/:id/photo" component={AddInvestorPhoto}/>
          <Route path="/projects/:id" component={Project}/>
          <Route path="/investors/:id" component={Investor}/>
        </Router>
      </div>
  );
}

export default App;
