import { gql } from "@apollo/client";

export const GET_ALL_TRANSACTION = gql`
  query GetAllTransaction {
    transactions {
      _id
      amount
      category
      date
      description
      location
      paymentType
      userId
    }
  }
`;

export const GET_TRANSACTION = gql`
  query GetTransaction($transactionId: ID!) {
    transaction(transactionId: $transactionId) {
      _id
      amount
      category
      date
      description
      location
      paymentType
      userId
    }
  }
`;
