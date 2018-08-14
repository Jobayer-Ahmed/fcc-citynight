import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from './Homepage/Homepage';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <Route path="/" exact render={() => <Homepage/>} />
                        <Route path="/login" exact render={() => <Login />} />
                        <Route path="/signup" exact render={() => <Signup />} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;

// <Route path="/login" exact rander={() => <Login/>} />
//                         <Route path="/register" exact rander={() => <Register/>} />