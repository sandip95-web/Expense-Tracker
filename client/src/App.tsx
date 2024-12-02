import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import HomePage from "./components/pages/HomePage";
import SignUpPage from "./components/pages/SignUpPage";
import TransactionPage from "./components/pages/TransactionPage";
import NotFound from "./components/pages/NotFound";
import Header from "./components/pages/Header";
import { useQuery } from "@apollo/client";
import { AuthUserResponse } from "./graphql/types/userType";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/userQuery";
import { Toaster } from "react-hot-toast";

const App = () => {
  const {data,loading } = useQuery<AuthUserResponse>(
    GET_AUTHENTICATED_USER
  );
  if(loading)
  {
    return <div>Loading....</div>
  }

  return (
    <>
      {data?.authUser && <Header />}
      <Routes>
        <Route
          path="/"
          element={data?.authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!data?.authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!data?.authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/transaction/:id"
          element={
            data?.authUser ? <TransactionPage /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
};
export default App;
