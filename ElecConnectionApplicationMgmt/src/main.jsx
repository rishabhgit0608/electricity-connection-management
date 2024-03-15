import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Components/Dashboard.jsx";
import { Charts } from "./Components/Charts.jsx";

//frontend routing
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "charts",
    element: <Charts />,
  },
]);
//apollo server
const client = new ApolloClient({
  uri: import.meta.env.VITE_URL,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
