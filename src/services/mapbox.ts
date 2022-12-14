import axios from "axios";
import { isDarkMode } from "@/services/interface";

export const ACCESS_TOKEN =
  "pk.eyJ1Ijoib2xpdmllcmNoZXZhbGxpZXIiLCJhIjoiY2p5eTdmYmduMHhweTNubWVmY3dtNmxjeSJ9.5c6fG8q3ZkNmavCGLs8krw";

export const theme = () => {
  return isDarkMode()
    ? "mapbox://styles/mapbox/dark-v10"
    : "mapbox://styles/mapbox/streets-v11";
};

export const geocodingClient = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    access_token: ACCESS_TOKEN,
  },
});
