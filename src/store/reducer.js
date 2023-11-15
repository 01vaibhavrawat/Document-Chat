import {
  POST_PDF_FILE,
  POST_PDF_FILE_SUCCESS,
  POST_PDF_FILE_FAILURE,
  GET_CHAT_RESPONSE,
  GET_CHAT_RESPONSE_SUCCESS,
  GET_CHAT_RESPONSE_FAILURE,
} from "./actions";

const initialState = {
  posts: [],
  loading: false,
  error: null,
  fileUploadStatus: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_PDF_FILE:
      return {
        ...state,
        loading: true,
      };
    case POST_PDF_FILE_SUCCESS:
      return {
        ...state,
        loading: false,
        fileUploadStatus: true,
      };
    case POST_PDF_FILE_FAILURE:
      return {
        ...state,
        loading: false,
        fileUploadStatus: false,
      };
    case GET_CHAT_RESPONSE:
      return {
        ...state,
        loading: true,
      };
    case GET_CHAT_RESPONSE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case GET_CHAT_RESPONSE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
