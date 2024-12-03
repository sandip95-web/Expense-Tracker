import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { MdLogout } from "react-icons/md";
import { useQuery, useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { GET_TRANSACTION_STATISTICS } from "../../graphql/queries/transactionQuery";
import { LOGOUT_USER } from "../../graphql/mutations/userMutation";
import { GET_AUTHENTICATED_USER } from "../../graphql/queries/userQuery";
import { useEffect, useState } from "react";
import { ChartData } from "../../types/types";
import TransactionForm from "./TransactionForm";
import Cards from "../Cards";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage: React.FC = () => {
  const { data} = useQuery(GET_TRANSACTION_STATISTICS);
  const [logout, { loading: logoutLoading, client }] = useMutation(
    LOGOUT_USER,
    {
      refetchQueries: ["GetAuthenticatedUser"],
    }
  );
  const { data: authUserData } = useQuery(GET_AUTHENTICATED_USER);

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "$",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        borderRadius: 30,
        spacing: 10,
        cutout: 130,
      },
    ],
  });

  // Function to map categories to chart colors
  const getCategoryColors = (category: string) => {
    switch (category.toLowerCase()) {
      case "saving":
        return {
          background: "rgba(75, 192, 192)",
          border: "rgba(75, 192, 192)",
        };
      case "expense":
        return {
          background: "rgba(255, 99, 132)",
          border: "rgba(255, 99, 132)",
        };
      case "investment":
        return {
          background: "rgba(54, 162, 235)",
          border: "rgba(54, 162, 235)",
        };
      default:
        return {
          background: "rgba(201, 203, 207)",
          border: "rgba(201, 203, 207)",
        };
    }
  };

  // Handle the chart data update based on the fetched data
  useEffect(() => {
    if (data?.categoryStatistics) {
      const categories = data.categoryStatistics.map(
        (stat: { category: string }) => stat.category
      );
      const totalAmounts = data.categoryStatistics.map(
        (stat: { totalAmount: number }) => stat.totalAmount
      );

      // Prepare colors for each category
      const backgroundColors = categories.map(
        (category: string) => getCategoryColors(category).background
      );
      const borderColors = categories.map(
        (category: string) => getCategoryColors(category).border
      );

      // Update chart data
      setChartData({
        labels: categories,
        datasets: [
          {
            label: "$",
            data: totalAmounts,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
            borderRadius: 30,
            spacing: 10,
            cutout: 130,
          },
        ],
      });
    }
  }, [data]); // Trigger this effect only when `data` changes

  // Handle user logout
  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.data) {
        toast.success(result.data.logout);
      }
      client.resetStore();
    } catch (error) {
      console.error("Error during logout: ", error);
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
      <div className="flex items-center">
        <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
          Spend wisely, track wisely
        </p>
        <img
          src={authUserData?.authUser.profilePicture}
          className="w-11 h-11 rounded-full border cursor-pointer"
          alt="Avatar"
        />
        {!logoutLoading && (
          <MdLogout
            className="mx-2 w-5 h-5 cursor-pointer"
            onClick={handleLogout}
          />
        )}
        {logoutLoading && (
          <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin"></div>
        )}
      </div>

      <div className="flex flex-wrap w-full justify-center items-center gap-6">
      

        <div className="flex flex-wrap w-full justify-center items-center gap-6">
          {data?.categoryStatistics.length > 0 && (
            <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px]  ">
              <Doughnut data={chartData} />
            </div>
          )}

          <TransactionForm />
        </div>
      </div>

      <Cards />
    </div>
  );
};

export default HomePage;
