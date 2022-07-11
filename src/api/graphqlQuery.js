import { gql } from "graphql-request";

export const GET_RANDOM_PHOTO_WITH_BOOKMARKS = gql`
  query Photo($photoId: ID, $userId: ID) {
    randomPhoto(id: $photoId) {
      _id
      imageUrl
      soundUrl
      creator
      country
      city
    }
    user(id: $userId) {
      bookmarks {
        _id
      }
    }
  }
`;

export const GET_PHOTO_WITH_BOOKMARKS = gql`
  query Photo($photoId: ID, $userId: ID) {
    photo(id: $photoId) {
      _id
      imageUrl
      soundUrl
      creator
      country
      city
    }
    user(id: $userId) {
      bookmarks {
        _id
      }
    }
  }
`;

export const GET_PHOTOS_CONTAINING_TAG = gql`
  query Photos($tag: String!) {
    photos(tag: $tag) {
      _id
      imageUrl
      tags
      country
      city
    }
  }
`;

export const GET_USER_BOOKMARKS = gql`
  query User($userId: ID) {
    user(id: $userId) {
      bookmarks {
        _id
        imageUrl
        tags
        country
        city
      }
    }
  }
`;

export const GET_MY_PHOTOS = gql`
  query User($userId: ID) {
    user(id: $userId) {
      myPhotos {
        _id
        imageUrl
        tags
        country
        city
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($name: String!, $email: String!) {
    login(name: $name, email: $email) {
      _id
      email
      name
      accessToken
    }
  }
`;

export const INSERT_BOOKMARK_FOR_USER = gql`
  mutation Mutation($input: InsertBookmarkForUserInput!) {
    insertBookmarkForUser(input: $input) {
      bookmarks
    }
  }
`;

export const FILE_UPLOAD = gql`
  mutation UploadPhoto($file: Upload!, $input: PhotoInput) {
    uploadPhoto(file: $file, input: $input) {
      _id
      imageUrl
      soundUrl
      creator
      country
      city
    }
  }
`;

export const GET_MARKERS = gql`
  query Markers {
    markers {
      _id
      country
      coordinates
      recentlyPhotoUrl
      photosNum
    }
  }
`;

export const GET_MARKER = gql`
  query Marker($markerId: ID!) {
    marker(id: $markerId) {
      country
      photos {
        _id
        imageUrl
        creator
        tags
        country
        city
      }
    }
  }
`;
