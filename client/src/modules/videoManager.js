import { getToken } from "./authManager";

const baseUrl = '/api/video';
const userBaseUrl ='/api/UserProfile';


//old getAllVideos incase you need it 
/*
export const getAllVideos = () => {
  return fetch(baseUrl)
    .then((res) => res.json())
};
*/


//getAllVideos with authorization
export const getAllVideos = () => {
  return getToken().then((token) => {
  return fetch (baseUrl, {
    method:"GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }). then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error(
        "An unknown error occurred while trying to get quotes.",
      );
    }
  });
  });
};

export const getAllVideosWithComments = () => {
    return fetch(`${baseUrl}/getwithcomments`)
      .then((res) => res.json())
  };


  export const searchAllVideos = (queryString, sortDescBool) => {
    return fetch(`${baseUrl}/search?q=${queryString}&sortDesc=${sortDescBool}`)
      .then((res) => res.json())
  };


export const getVideo = (id) => {
  return fetch(`${baseUrl}/getvideobyidwithcomments/${id}`).then((res) => res.json());
};

export const getUserById  = (id) => {
  return fetch(`${userBaseUrl}/${id}`).then((res) => res.json());
};



//new one
export const getUserWithVideos  = (id) => {
  return fetch(`${userBaseUrl}/getuserbyidwithvideos/${id}`).then((res) => res.json());
};


//old add video if you need it 
/*
export const addVideo = (video) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(video),
  });
};
*/

//new addVideo with Authorization
export const addVideo = (video) => {
  return getToken().then((token) => {
    return fetch(baseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(video),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error(
          "An unknown error occurred while trying to save a new quote.",
        );
      }
    });
  })
};