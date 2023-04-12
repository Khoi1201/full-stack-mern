import axios from "axios";

const setAuthToken = (token) => {
    // check if token is not null or undefined
    // set it to default header of axios
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // if token is null or undefined (not in localstorage)
    // delete all access token in later request
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
