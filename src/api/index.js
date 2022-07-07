import { GraphQLClient } from "graphql-request";
import {
  FILE_UPLOAD,
  GET_PHOTO_WITH_BOOKMARKS,
  INSERT_BOOKMARK_FOR_USER,
  LOGIN,
} from "./graphqlQuery";

const endpoint = process.env.REACT_APP_API_SERVER_URL;
const API = new GraphQLClient(endpoint);

export const getRandomPhotoAndBookmarks = async (exceptionId, userId) => {
  const { photo, user } = await API.request(GET_PHOTO_WITH_BOOKMARKS, {
    photoId: exceptionId,
    userId,
  });

  return { photo, user };
};

export const login = async ({ name, email }) => {
  const { login: data } = await API.request(LOGIN, {
    name,
    email,
  });

  return data;
};

export const insertBookmark = async input => {
  const { insertBookmarkForUser: data } = await API.request(
    INSERT_BOOKMARK_FOR_USER,
    {
      input,
    },
    {
      authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loginData")).accessToken
      }`,
    },
  );

  return data;
};

export const fileUpload = async ({ file, input }) => {
  const { uploadPhoto: data } = await API.request(
    FILE_UPLOAD,
    {
      file,
      input,
    },
    {
      authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loginData")).accessToken
      }`,
    },
  );

  return data;
};
