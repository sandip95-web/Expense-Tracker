const transactionTypeDef = `#graphql

type Transaction{
  _id: ID!
		userId: String!
		description: String!
		paymentType: String!
		category: String!
		amount: Float!
		location: String!
		date: String!
}
type Query{
  transactions:[Transaction!]
  transaction(transactionId:ID!):Transaction
}

type Mutation{
  createTransaction(input:createTransactionInput!):Transaction!
  updateTransaction(input:updateTransactionInput!):Transaction!
  deleteTransaction(transactionId:ID!):Transaction!
}
input createTransactionInput{
		description: String!
		paymentType: String!
		category: String!
		amount: Float!
		location: String!
		date: String!
}
type updateTransactionInput{
  transactionId: String!
		description: String!
		paymentType: String!
		category: String!
		amount: Float!
		location: String!
		date: String!
}
`;
export default transactionTypeDef;