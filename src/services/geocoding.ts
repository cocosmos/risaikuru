import axios from "axios";

const geocodingClient = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    access_token:
      "pk.eyJ1Ijoib2xpdmllcmNoZXZhbGxpZXIiLCJhIjoiY2p5eTdmYmduMHhweTNubWVmY3dtNmxjeSJ9.5c6fG8q3ZkNmavCGLs8krw",
  },
});

export default geocodingClient;
