import axios from "axios";

export const getData = () => {
  axios.get("http://localhost:7000/getData");
};
