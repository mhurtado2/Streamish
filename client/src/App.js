import React from "react";
import "./App.css";
import SearchVideos from "./components/SearchVideos";
// import VideoForm from "./components/VideoForm";
import VideoList from "./components/VideoList";


function App() {
  return (
    <div className="App">
      
      <SearchVideos />
      {/* <VideoForm /> */}
      <VideoList />  
    </div>
  );
}

export default App;