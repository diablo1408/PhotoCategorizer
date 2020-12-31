import { GET_IMAGES_SUCCESS, GET_IMAGES_ERROR,
  UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_ERROR,
  GET_GENRES_SUCCESS, GET_GENRES_ERROR ,
  DOWNLOAD_GENRES_SUCCESS,DOWNLOAD_GENRES_ERROR
} from "../actions/actionTypes";

const initialState = {
  genres: [],
  images : [],
  error : null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_IMAGES_SUCCESS:
      return {
        ...state,
        images: action.payload,
      };

    case GET_IMAGES_ERROR:
      return {
        ...state,
        error: action.error,
      };
    
    case UPLOAD_IMAGES_SUCCESS:
      return {
        ...state,
        images: action.payload,
      };
      
    case UPLOAD_IMAGES_ERROR:
      return {
      ...state,
      error: action.error,
    };  

    case GET_GENRES_SUCCESS:
      return {
        ...state,
        genres: action.payload,
      };

    case GET_GENRES_ERROR:
      return {
        ...state,
        error: action.error,
      };

      case DOWNLOAD_GENRES_SUCCESS:
      return {
        ...state,
      };

    case DOWNLOAD_GENRES_ERROR:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
}
