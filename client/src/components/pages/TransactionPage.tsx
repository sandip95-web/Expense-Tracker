import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_TRANSACTION } from "../../graphql/queries/transactionQuery";
import { UPDATE_TRANSACTION } from "../../graphql/mutations/transactionMutation";
import toast from "react-hot-toast";
import TransactionFormSkeleton from "../../skeletons/TransactionFormSkeleton";

const TransactionPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading: getLoading } = useQuery(GET_TRANSACTION, {
    variables: {
      transactionId: id,
    },
  });

  const [updateTransaction, { loading }] = useMutation(UPDATE_TRANSACTION,{
    refetchQueries:["GetTransactionStatistics"]
  });

  const [formData, setFormData] = useState({
    description: "",
    paymentType: "",
    category: "",
    amount: "",
    location: "",
    date: "",
  });

  useEffect(() => {
    if (data?.transaction) {
      setFormData({
        description: data.transaction.description || "",
        paymentType: data.transaction.paymentType || "",
        category: data.transaction.category || "",
        amount: data.transaction.amount || "",
        location: data.transaction.location || "",
        date: new Date(+data.transaction.date).toISOString().substring(0, 10),
      });
    }
  }, [data]);
  if (getLoading) return <TransactionFormSkeleton />;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount);
    try {
      const result = await updateTransaction({
        variables: {
          input: {
            ...formData,
            amount,
            transactionId: id,
          },
        },
      });

      if (result.data.updateTransaction) {
        toast.success("Transaction Updated.");
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error((error as Error).message);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-3xl max-w-4xl w-full p-8 sm:p-12">
        <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-indigo-500 text-center mb-8">
          Update Transaction
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* DESCRIPTION */}
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-2"
              htmlFor="description"
            >
              Transaction
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none text-black"
              id="description"
              name="description"
              type="text"
              placeholder="Rent, Groceries, Salary, etc."
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          {/* PAYMENT TYPE & CATEGORY */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <label
                className="block text-sm font-semibold text-gray-700 mb-2"
                htmlFor="paymentType"
              >
                Payment Type
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-black"
                id="paymentType"
                name="paymentType"
                value={formData.paymentType}
                onChange={handleInputChange}
              >
                <option value="">Select Payment Type</option>
                <option value="card">Card</option>
                <option value="cash">Cash</option>
              </select>
            </div>

            <div className="w-full">
              <label
                className="block text-sm font-semibold text-gray-700 mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <select
                className="text-black w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                <option value="saving">Saving</option>
                <option value="expense">Expense</option>
                <option value="investment">Investment</option>
              </select>
            </div>
          </div>

          {/* AMOUNT */}
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-2"
              htmlFor="amount"
            >
              Amount ($)
            </label>
            <input
              className="text-black w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              id="amount"
              name="amount"
              type="number"
              placeholder="150"
              value={formData.amount}
              onChange={handleInputChange}
            />
          </div>

          {/* LOCATION & DATE */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <label
                className="block text-sm font-semibold text-gray-700 mb-2"
                htmlFor="location"
              >
                Location
              </label>
              <input
                className="text-black w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                id="location"
                name="location"
                type="text"
                placeholder="New York"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>

            <div className="w-full">
              <label
                className="block text-sm font-semibold text-gray-700 mb-2"
                htmlFor="date"
              >
                Date
              </label>
              <input
                className="text-black w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            className="w-full py-3 text-white font-bold rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all focus:outline-none focus:ring-4 focus:ring-pink-400"
            type="submit"
          >
            {loading ? "Updating..." : "Update Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionPage;
