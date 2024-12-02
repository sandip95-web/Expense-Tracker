import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($input: createTransactionInput!) {
    createTransaction(input: $input) {
      userId
      category
      description
      amount
      location
      date
      paymentType
    }
  }
`;
export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($input: updateTransactionInput!) {
    updateTransaction(input: $input) {
      transactionId
      category
      description
      amount
      location
      date
      paymentType
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($transactionId: ID!) {
    deleteTransaction(transactionId: $transactionId) {
      _id
      category
      description
      amount
      location
      date
      paymentType
    }
  }
`;
