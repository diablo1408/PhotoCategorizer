import Axios from "axios";
import { GET_IMAGES_SUCCESS, GET_IMAGES_ERROR,
  GET_GENRES_SUCCESS, GET_GENRES_ERROR, 
  GET_ALL_GENRES_SUCCESS, GET_ALL_GENRES_ERROR, 
  DOWNLOAD_GENRES_SUCCESS,DOWNLOAD_GENRES_ERROR
} from "./actionTypes";

export const getImages = (genre) => {
  return async (dispatch) => {
    try {
      // console.log("genre",genre);
      if(genre === undefined){genre = "All";}
      // console.log("genre",genre);
      const result =  await Axios.get("/api/images/getimages/"+localStorage.getItem('name')+"/"+genre);
      // console.log("multiple");
      // console.log(result); 
      dispatch({ type: GET_IMAGES_SUCCESS, payload: result.data.image});
    } catch (error) {
      dispatch({ type: GET_IMAGES_ERROR, error });
    }
  };
};

export const addImage = (img) => {
  const contentType = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };



  console.log("imageList",img);

  let formData = new FormData();
  // formData.append("path",Date.now() + "-" + img.name);
  // formData.append("image", img);



  img.forEach((oneImg)=>{
    formData.append("image[]",oneImg);  
  })
  formData.append("user_id", localStorage.getItem('name'));


  return async (dispatch) => {
    try {
      const promise1 = await Axios.put("/api/images/addimage",formData,contentType);
      const promise2 = await Axios.get("/api/images/getgenres/"+localStorage.getItem('name'));
      
      console.log("addimage");
      Promise.all([promise1, promise2])
      .then(function(result) {
        // console.log(result[0]);
        // console.log(result[1]);
        dispatch({ type: GET_IMAGES_SUCCESS, payload: result[0].data});
        dispatch({ type: GET_GENRES_SUCCESS, payload: result[1].data });
      });

    } catch (error) {
      dispatch({ type: GET_IMAGES_ERROR, error });
    }
  };
};

export const getGenres = () => {
  return async (dispatch) => {
    try {
      const result = await Axios.get("/api/images/getgenres/"+localStorage.getItem('name'));
      // console.log("multiplegenres");
      // console.log(result); 
      dispatch({ type: GET_GENRES_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({ type: GET_GENRES_ERROR, error });
    }
  };
};


export const getAllGenres = () => {
  return async (dispatch) => {
    try {
      const result = await Axios.get("/api/images/getallgenres/"+localStorage.getItem('name'));
      // console.log("multiplegenres");
      // console.log(result); 
      dispatch({ type: GET_ALL_GENRES_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({ type: GET_ALL_GENRES_ERROR, error });
    }
  };
};

export const downloadGenres = (genreList) => {
  return async (dispatch) => {
    try {
      console.log("genreList",genreList);
      const result = await Axios.get("/api/downloadgenres/"+localStorage.getItem('name')+"/"+genreList);
      // console.log("multiplegenres");
      // console.log(result); 
      // dispatch({ type: DOWNLOAD_GENRES_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({ type: DOWNLOAD_GENRES_ERROR, error });
    }
  };
};
