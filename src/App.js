import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect, Link, Switch} from 'react-router-dom';

const Fruit = (props) => {
  return (
    <div className="w3-modal" style={{display: 'block'}}>
      <div className="w3-modal-content">
        <div className="w3-container" style={{padding: 30}}>
          <p>Details for fruit: {props.name}</p>
          <p>Some text. Some text. Some text.</p>
          <button onClick={props.onClose}>Close</button>
        </div>
      </div>

    </div>
  );
};

const Fruits = ({basePath}) => {
  return (
    <>
    <h3>Fruits</h3>
    <ul>
      <li><Link to={`${basePath}/(fruit/apple)`}>Open apple details</Link></li>
      <li><Link to={`${basePath}/(fruit/orange)`}>Open orange details</Link></li>
      <li><Link to={`${basePath}/(fruit/banana)`}>Open banana details</Link></li>
    </ul>
    </>
  );
};

const withModal = (Component, ModalComponent) => {
  return (props) => {
    const handleClose = () => {
      props.history.push(basePath);
    };

    const basePath = props.match.path;
    return (
      <>
      <Route path={`${basePath}/\\(fruit/:name\\)`}
             render={props => <ModalComponent name={props.match.params.name}
                                              onClose={handleClose} {...props}/>}/>
      <Component {...props} basePath={basePath}/>
      </>
    );
  };
};

const FruitsWithModal = withModal(Fruits, Fruit);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div style={{padding: 10}}>
          <Switch>
            <Route path="/fruits"
                   render={props => <FruitsWithModal {...props}/>}></Route>
            <Redirect exact path="/" to="/fruits"/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
