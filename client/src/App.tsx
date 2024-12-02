import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import HomePage from "./components/pages/HomePage";
import SignUpPage from "./components/pages/SignUpPage";
import TransactionPage from "./components/pages/TransactionPage";
import NotFound from "./components/pages/NotFound";
import Header from "./components/pages/Header";
import { useQuery } from "@apollo/client";
import { AuthUserResponse } from "./graphql/types/userType";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/userQuery";

const App = () => {
  const { loading, data, error } = useQuery<AuthUserResponse>(
    GET_AUTHENTICATED_USER
  );
	console.log("loading: ",loading)
  console.log("Auth User: ", data);
	console.log("Error: ",error)
  const authUser = false;
  return (
    <>
      {authUser && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/transaction/:id" element={<TransactionPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default App;
