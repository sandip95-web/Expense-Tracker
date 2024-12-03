import { useMutation } from "@apollo/client";
import { CREATE_TRANSACTION } from "../../graphql/mutations/transactionMutation";
import toast from "react-hot-toast";

const TransactionForm = () => {
  const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION,{
    refetchQueries:['GetAllTransaction',"GetTransactionStatistics"]
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const transactionData = {
        description: formData.get("description"),
        paymentType: formData.get("paymentType"),
        category: formData.get("category"),
        amount: parseFloat(formData.get("amount") as string),
        location: formData.get("location"),
        date: formData.get("date"),
      };
      const result = await createTransaction({
        variables: {
          input: transactionData,
        },
      });
      if (result.data.createTransaction !== null) {
        form.reset();
        toast.success("Transaction created!");
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error((error as Error).message);
    }
  };
  return (
    <form
      className="w-full max-w-lg p-6 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 rounded-lg shadow-lg flex flex-col gap-6"
      onSubmit={handleSubmit}
    >
      {/* Transaction Description */}
      <div className="flex flex-col">
        <label
          className="text-white text-sm font-semibold mb-2"
          htmlFor="description"
        >
          Transaction Description
        </label>
        <input
          className="px-4 py-3 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md transition-all ease-in-out duration-300"
          id="description"
          name="description"
          type="text"
          required
          placeholder="Rent, Groceries, Salary, etc."
        />
      </div>

      {/* Payment Type */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <label
            className="text-white text-sm font-semibold mb-2"
            htmlFor="paymentType"
          >
            Payment Type
          </label>
          &nbsp;&nbsp;
          <select
            className="px-4 py-3 bg-white text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md transition-all ease-in-out duration-300"
            id="paymentType"
            name="paymentType"
          >
            <option value="card">Card</option>
            <option value="cash">Cash</option>
          </select>
        </div>

        {/* Category */}
        <div className="w-full md:w-1/2">
          <label
            className="text-white text-sm font-semibold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          &nbsp;&nbsp;
          <select
            className="px-4 py-3 bg-white text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md transition-all ease-in-out duration-300"
            id="category"
            name="category"
          >
            <option value="saving">Saving</option>
            <option value="expense">Expense</option>
            <option value="investment">Investment</option>
          </select>
        </div>
      </div>

      {/* Amount */}
      <div className="flex flex-col">
        <label
          className="text-white text-sm font-semibold mb-2"
          htmlFor="amount"
        >
          Amount ($)
        </label>
        <input
          className="px-4 py-3 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md transition-all ease-in-out duration-300"
          id="amount"
          name="amount"
          type="number"
          placeholder="150"
        />
      </div>

      {/* Location */}
      <div className="flex flex-col">
        <label
          className="text-white text-sm font-semibold mb-2"
          htmlFor="location"
        >
          Location
        </label>
        <input
          className="px-4 py-3 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md transition-all ease-in-out duration-300"
          id="location"
          name="location"
          type="text"
          placeholder="New York"
        />
      </div>

      {/* Date */}
      <div className="flex flex-col">
        <label className="text-white text-sm font-semibold mb-2" htmlFor="date">
          Date
        </label>
        <input
          type="date"
          name="date"
          id="date"
          className="px-4 py-3 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md transition-all ease-in-out duration-300"
        />
      </div>

      {/* Submit Button */}
      <button
        className="bg-gradient-to-r from-pink-600 to-indigo-500 hover:from-pink-700 hover:to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-xl transition-all ease-in-out duration-300 transform hover:scale-105"
        type="submit"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;
