import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Spinner } from "reactstrap";
import "./App.css";
import ApplicationViews from "./components/ApplicationViews";
import Header from "./components/Header";
import { LoginForm } from "./components/Login";
import { me, onLoginStatusChange } from "./modules/authManager";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      me().then(setUserProfile);
    } else {
      setUserProfile(null);
    }
  }, [isLoggedIn]);

  // The "isLoggedIn" state variable will be null until //  the app's connection to firebase has been established.
  //  Then it will be set to true or false by the "onLoginStatusChange" function
  if (isLoggedIn === null) {
    // Until we know whether or not the user is logged in or not, just show a spinner
    return <Spinner className="app-spinner dark" />;
  }

//<Router> where routes is 
  return (
    <div className="App">
      <Router>
      {/* <Routes>
      <Route path ="/login" element ={<LoginForm />} />
      <Route path ="/register" element ={<Register />}></Route> */}

        <Header isLoggedIn={isLoggedIn} userProfile={userProfile} />
        <ApplicationViews />
      
      </Router>
    </div>
  );
}

export default App;