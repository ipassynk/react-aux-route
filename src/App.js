import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect, Link, Switch} from 'react-router-dom';

const Application = (props) => {
  const handleClose = () => {
    props.history.push(props.basePath);
  };

  return (
    <div className="w3-modal" style={{display: 'block'}}>
      <div className="w3-modal-content">
        <div className="w3-container" style={{padding: 30}}>
          <p>Details for app: {props.id}</p>
          <p>Some text. Some text. Some text.</p>
          <button onClick={handleClose}>Close</button>
        </div>
      </div>

    </div>
  );
}

const Applications = (props) => {
  const basePath = props.match.path;
  return (
    <>
    <Route path={`${basePath}/\\(application/:id\\)`}
           render={props => <Application id={props.match.params.id} basePath={basePath} {...props}/>}/>

    <h2>Applications</h2>
    <ul>
      <li><Link to={`${basePath}/(application/app1)`}>Open app1 details</Link></li>
      <li><Link to={`${basePath}/(application/app2)`}>Open app2 details</Link></li>
      <li><Link to={`${basePath}/(application/app3)`}>Open app3 details</Link></li>
    </ul>
    </>
  );
};

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div style={{
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
        }}>
          <Switch>
            <Route path="/apps" render={props => <Applications {...props}/>}></Route>
            <Redirect exact path="/" to="/apps"/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
