import axios from "axios";

// https://test-cors-server.glitch.me

export const getData = () => {
  axios.get("http://localhost:7000");
};
