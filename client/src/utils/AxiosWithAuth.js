import axios from "axios";

const AxiosWithAuth = () => {
  return axios.create({
    baseURL: "http://localhost:1337",
  });
};

export default AxiosWithAuth;
