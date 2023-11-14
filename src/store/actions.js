import axios from "axios";

export const POST_PDF_FILE = "POST_PDF_FILE";
export const POST_PDF_FILE_SUCCESS = "POST_PDF_FILE_SUCCESS";
export const POST_PDF_FILE_FAILURE = "POST_PDF_FILE_FAILURE";

export const GET_CHAT_RESPONSE = "GET_CHAT_RESPONSE";
export const GET_CHAT_RESPONSE_SUCCESS = "GET_CHAT_RESPONSE_SUCCESS";
export const GET_CHAT_RESPONSE_FAILURE = "GET_CHAT_RESPONSE_FAILURE";

export const getChatResponse = () => ({
  type: GET_CHAT_RESPONSE,
});

export const getChatResponseSuccess = (response) => ({
  type: GET_CHAT_RESPONSE_SUCCESS,
  payload: response,
});

export const getChatResponseFailure = (error) => ({
  type: GET_CHAT_RESPONSE_FAILURE,
  payload: error,
});

export const postPDFFile = (formdata) => ({
  type: POST_PDF_FILE,
  payload: formdata,
});

export const postPDFFileSuccess = (response) => ({
  type: GET_CHAT_RESPONSE_SUCCESS,
  payload: response,
});

export const postPDFFileFailure = (error) => ({
  type: GET_CHAT_RESPONSE_FAILURE,
  payload: error,
});

export const getChatResponseRequest = (payload, addAnswer, chat) => {
  return (dispatch) => {
    dispatch(getChatResponse());
    axios
      .get("http://localhost:2000/chat", {params: payload})
      .then((res) => {
        const response = res.data;
        dispatch(getChatResponseSuccess(response));
        addAnswer("This is an example answer.", chat);
      })
      .catch((error) => {
        addAnswer("Failed to get response from the server.", chat)
        dispatch(getChatResponseFailure(error.message));
      });
  };
};

export const postPDFFileRequest = (formData) => {
  return (dispatch) => {
    dispatch(postPDFFile());
    axios
      .post("http://localhost:2000/doc2vec", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const post = response.data;
        dispatch(postPDFFileSuccess(post));
      })
      .catch((error) => {
        dispatch(postPDFFileFailure(error.message));
      });
  };
};
