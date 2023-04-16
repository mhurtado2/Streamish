import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useParams } from "react-router-dom";
import Video from "./Video";
import { getUserWithVideos, getVideo } from "../modules/videoManager";

const UserVideos = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getUserWithVideos(id).then(videos => setUser(videos));
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
            {user?.videos?.map((video) => (
              // <Video video={video} key={video.id} />    
              <iframe className="video"
              src={video.url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen />    
            ))}
     
        </div>
      </div>
    </div>
  );
};

export default UserVideos;