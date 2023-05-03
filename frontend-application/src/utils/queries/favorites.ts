import { gql } from "@apollo/client";

export const CREATE_FAVORITE = gql`
  mutation CreateFavorite($userId: String!, $itemId: String!) {
    createFavorite(userId: $userId, itemId: $itemId) {
      _id
      itemId
      userId
    }
  }
`;

export const REMOVE_FAVORITE = gql`
  mutation RemoveFavorite($userId: String!, $itemId: String!) {
    removeFavorite(userId: $userId, itemId: $itemId)
  }
`;

export const GET_FAVORITES = gql`
  query GetFavorites($userId: String!) {
    getFavorites(userId: $userId) {
      _id
      userId
      itemId
    }
  }
`;
