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

//old one
/*
export const getAllVideosWithComments = () => {
    return fetch(`${baseUrl}/getwithcomments`)
      .then((res) => res.json())
  };
 */

  export const getAllVideosWithComments = () => {
    return getToken().then((token) => {
    return fetch (`${baseUrl}/getwithcomments`, {
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

//old one
/*
export const searchAllVideos = (queryString, sortDescBool) => {
  return fetch(`${baseUrl}/search?q=${queryString}&sortDesc=${sortDescBool}`)
    .then((res) => res.json())
};
 */

export const searchAllVideos = (queryString, sortDescBool) => {
  return getToken().then((token) => {
  return fetch (`${baseUrl}/search?q=${queryString}&sortDesc=${sortDescBool}`, {
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



//old one 
/* 
export const getVideo = (id) => {
  return fetch(`${baseUrl}/getvideobyidwithcomments/${id}`).then((res) => res.json());
};
*/

export const getVideo = (id) => {
  return getToken().then((token) => {
  return fetch (`${baseUrl}/getvideobyidwithcomments/${id}`, {
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


//old one
/*
export const getUserById  = (id) => {
  return fetch(`${userBaseUrl}/${id}`).then((res) => res.json());
};
*/

export const getUserById = (id) => {
  return getToken().then((token) => {
  return fetch (`${userBaseUrl}/${id}`, {
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




//old one
/* 
// export const getUserWithVideos  = (id) => {
//   return fetch(`${userBaseUrl}/getuserbyidwithvideos/${id}`).then((res) => res.json());
// };
*/

export const getUserWithVideos = (id) => {
  return getToken().then((token) => {
  return fetch (`${userBaseUrl}/getuserbyidwithvideos/${id}`, {
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