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
