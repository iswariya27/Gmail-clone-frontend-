import axios from "axios";
const API_URL = `https://gmail-clone-backend-2ovm.onrender.com`;
// const API_URL = `http://localhost:8005`;

const API_GMAIL = async (urlObject, payload, token, params) => {

  return axios({

    method: urlObject.method,
    url: `${API_URL}/${urlObject.endpoint}`,
    data: payload, // initially it was {} payload
    params: {
      token: params,
      msgId: params
    },
    headers: {
      "x-auth-token": token
    }
  }); 
};
export default API_GMAIL;
