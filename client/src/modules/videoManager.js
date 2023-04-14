const baseUrl = '/api/video';

export const getAllVideos = () => {
  return fetch(baseUrl)
    .then((res) => res.json())
};


export const getAllVideosWithComments = () => {
    return fetch(`${baseUrl}/getwithcomments`)
      .then((res) => res.json())
  };


  export const searchAllVideos = (queryString, sortDescBool) => {
    return fetch(`${baseUrl}/search?q=${queryString}&sortDesc=${sortDescBool}`)
      .then((res) => res.json())
  };

  
// export const getVideoByIdWithComments = () => {
//   return fetch(`${baseUrl}/Video/GetVideoByIdWithComments/{id}`)
//     .then((res) => res.json())
// };

export const getVideo = (id) => {
  return fetch(`${baseUrl}/getvideobyidwithcomments/${id}`).then((res) => res.json());
};

export const addVideo = (video) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(video),
  });
};

