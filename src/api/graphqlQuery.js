import { gql } from "graphql-request";

export const GET_PHOTO = gql`
  query getPhoto($photoId: ID) {
    photo(id: $photoId) {
      _id
      imageUrl
      soundUrl
      country
      city
    }
  }
`;

export const GET_PHOTOS = gql``;
