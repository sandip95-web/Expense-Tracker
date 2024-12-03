import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FC } from "react";
import {
  DeleteTransactionResponse,
  Transaction,
} from "../../graphql/types/transactionTypes";
import { AuthUser } from "../../graphql/types/userType";
import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "../../graphql/mutations/transactionMutation";
import toast from "react-hot-toast";

interface CardProp {
  transaction: Transaction;
  auth: AuthUser;
}
type CardType = "saving" | "expense" | "investment";

const categoryColorMap: Record<CardType, string> = {
  saving: "from-green-700 to-green-400",
  expense: "from-pink-800 to-pink-600",
  investment: "from-blue-700 to-blue-400",
};

const Card: FC<CardProp> = ({ transaction, auth }) => {
  const cardClass = categoryColorMap[transaction.category as CardType];
  const [deleteTransaction,{loading}] = useMutation<DeleteTransactionResponse>(
    DELETE_TRANSACTION,
    {
      refetchQueries: ["GetAllTransaction"],
    }
  );
  const handleDelete = async () => {
    try {
      const result = await deleteTransaction({
        variables: {
          transactionId: transaction._id,
        },
      });
      if (result.data?.deleteTransaction) {
        toast.success("Transaction Deleted.");
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error((error as Error).message);
    }
  };
  return (
    <div
      className={`rounded-md p-5 bg-gradient-to-br ${cardClass} shadow-lg hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Transaction Type</h2>
          <div className="flex items-center gap-3">
            {!loading && (
              <FaTrash className={"cursor-pointer"} onClick={handleDelete} />
            )}
            {loading && (
              <div className="w-6 h-6 border-t-2 border-b-2  rounded-full animate-spin"></div>
            )}
            <Link to={`/transaction/${transaction._id}`}>
              <HiPencilAlt
                className="cursor-pointer hover:text-yellow-500 transition-all duration-200"
                size={22}
              />
            </Link>
          </div>
        </div>
        <p className="text-white flex items-center gap-2 text-sm">
          <BsCardText />
          <span>Description: {transaction.description}</span>
        </p>
        <p className="text-white flex items-center gap-2 text-sm">
          <MdOutlinePayments />
          <span>Payment Type:{transaction.paymentType}</span>
        </p>
        <p className="text-white flex items-center gap-2 text-sm">
          <FaSackDollar />
          <span>Amount: ${transaction.amount}</span>
        </p>
        <p className="text-white flex items-center gap-2 text-sm">
          <FaLocationDot />
          <span>Location: {transaction.location}</span>
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-white font-bold">{transaction.date}</p>
          <img
            src={auth.profilePicture}
            className="h-10 w-10 border-2 border-white rounded-full shadow-md"
            alt="Profile"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
