import React from "react";
import { Card, CardBody } from "reactstrap";

const SearchVideoResults = ({ video }) => {
  return (
    <Card >
      <p className="text-left px-2">Posted by: {video.userProfile.name}</p>
      <CardBody>
        <iframe className="video"
          src={video.url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen />

        <p>
          <strong>{video.title}</strong>
        </p>
        <h5>{video.description}</h5>
      </CardBody>
    </Card>
  );
};

export default SearchVideoResults;