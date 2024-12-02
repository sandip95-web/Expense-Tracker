import { useQuery } from "@apollo/client";
import Card from "./common/Card";
import { GetAllTransactionResponse } from "../graphql/types/transactionTypes";
import { GET_ALL_TRANSACTION } from "../graphql/queries/transactionQuery";
import toast from "react-hot-toast";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/userQuery";
import { AuthUser, AuthUserResponse } from "../graphql/types/userType";

const Cards = () => {
  const { data, loading, error } =
    useQuery<GetAllTransactionResponse>(GET_ALL_TRANSACTION);
  const { data: auth } = useQuery<AuthUserResponse>(GET_AUTHENTICATED_USER);
  if (error) return toast.error((error as Error).message);
  if (loading) return <div>Loading....</div>;

  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">History</p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 justify-start mb-20">
        {!loading &&
          data?.transactions.map((transaction) => (
            <Card
              key={transaction._id}
              transaction={transaction}
              auth={auth?.authUser as AuthUser}
            />
          ))}
      </div>
    </div>
  );
};

export default Cards;
