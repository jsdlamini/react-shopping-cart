import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-shoping-app-c16cd.cloudfunctions.net/api",
  //API URL(Cloud function) goes here
});

export default instance;

//"http://localhost:5001/shoping-app-c16cd/us-central1/api",
