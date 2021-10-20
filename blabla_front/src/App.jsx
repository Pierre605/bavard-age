import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home.jsx';
import UserConnectedHome from './UserConnectedHome.jsx'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Logout from './Logout';


class App extends React.Component {

    render() {

        return (

         <Router>
        <Route path="/" exact>
            <Home/>
        </Route>
        <Route path="/conversations" exact>
            <UserConnectedHome/>
            <Logout />
        </Route>
        {/* <Route path="/Model3" >
            <Model_3/>
        </Route>
        <Route path="/pictures/:id" exact component={Picture}/> */}
        </Router>
        )}}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default App