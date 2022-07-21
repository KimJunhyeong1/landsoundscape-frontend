import { GraphQLClient } from "graphql-request";
import {
  DELETE_BOOKMARK,
  FILE_UPLOAD,
  GET_MARKER,
  GET_MARKERS,
  GET_MY_PHOTOS,
  GET_PHOTOS_CONTAINING_TAG,
  GET_PHOTO_WITH_BOOKMARKS,
  GET_RANDOM_PHOTO_WITH_BOOKMARKS,
  GET_USER_BOOKMARKS,
  INSERT_BOOKMARK_FOR_USER,
  LOGIN,
} from "./graphqlQuery";

const endpoint = process.env.REACT_APP_API_SERVER_URL;
const API = new GraphQLClient(endpoint);

export const getRandomPhotoAndBookmarks = async (exceptionId, userId) => {
  const { randomPhoto: photo, user } = await API.request(
    GET_RANDOM_PHOTO_WITH_BOOKMARKS,
    {
      photoId: exceptionId,
      userId,
    },
  );

  return { photo, user };
};

export const getPhotoAndBookmarks = async (photoId, userId) => {
  const { photo, user } = await API.request(GET_PHOTO_WITH_BOOKMARKS, {
    photoId,
    userId,
  });

  return { photo, user };
};

export const getPhotos = async tag => {
  const { photos } = await API.request(GET_PHOTOS_CONTAINING_TAG, {
    tag,
  });

  return photos;
};

export const getMyPhotos = async userId => {
  const { user } = await API.request(
    GET_MY_PHOTOS,
    {
      userId,
    },
    {
      authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loginData")).accessToken
      }`,
    },
  );

  return user;
};

export const getUserBookmarks = async userId => {
  const { user } = await API.request(
    GET_USER_BOOKMARKS,
    {
      userId,
    },
    {
      authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loginData")).accessToken
      }`,
    },
  );

  return user;
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

export const deleteBookmark = async input => {
  const { deleteBookmark: data } = await API.request(
    DELETE_BOOKMARK,
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

export const getMarkers = async () => {
  const { markers } = await API.request(GET_MARKERS);

  return markers;
};

export const getMarker = async markerId => {
  const { marker } = await API.request(GET_MARKER, { markerId });

  return marker;
};
