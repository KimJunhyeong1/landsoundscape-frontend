import { GraphQLClient } from "graphql-request";
import { GET_PHOTO } from "./graphqlQuery";

const endpoint = process.env.REACT_APP_API_SERVER_URL;
const API = new GraphQLClient(endpoint);

export const getRandomPhoto = async exceptionId => {
  const { photo: data } = await API.request(GET_PHOTO, {
    photoId: exceptionId,
  });

  return data;
};

export const getPhoto = async Id => {};
