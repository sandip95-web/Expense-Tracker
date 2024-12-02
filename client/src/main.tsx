import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import GridBackground from "./components/ui/GridBackground.tsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:5173/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <GridBackground>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </GridBackground>
  </BrowserRouter>
);
