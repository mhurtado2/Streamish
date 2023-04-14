import React, { useEffect, useState } from "react";
import Video from './Video';
import { getAllVideos, getAllVideosWithComments } from "../modules/videoManager";
// import { VideoForm } from "./VideoForm";



const VideoList = () => {
  const [videos, setVideos] = useState([]);
//   const [searchedVideos, setSearchedVideos] = useState([]);


    const getVideos = () => {
    getAllVideosWithComments().then(videos => setVideos(videos));
  };

//   const getVideos = () => {
//     getAllVideos().then(videos => setVideos(videos));
//   };

  
//   const getVideosWithComments = () => {
//     getAllVideosWithComments().then(videos => setVideos(videos));
//   };


  useEffect(() => {
    getVideos();
  }, []);  //only runs on the intial rendering of the page if dependency array is empty 

  /*if the dependency array had something it in the use effects would run every time the variable inside the array changed
  useEffect(() => {
    VideoSearch();
  }, [videos]);
  */


  return (
    <div className="container">
     {/* <div className="row justify-content-center">
        <VideoForm  getVideos={getVideos}/>
     </div> */}
      <div className="row justify-content-center">
        {videos.map((video) => (
          <Video video={video} key={video.id} />
        ))}
      </div>
      
    </div>
  );
};

export default VideoList;