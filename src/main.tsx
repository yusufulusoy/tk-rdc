import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Loading from "./components/ui/Loading/Loading";

const HomePage = React.lazy(() => import("./pages/Home/Home"));
const FlightsPage = React.lazy(() => import("./pages/Flights/Flights"));
const ResultPage = React.lazy(() => import("./pages/Result/Result"));

const router = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: "/flights",
    element: (
      <Suspense fallback={<Loading />}>
        <FlightsPage />
      </Suspense>
    ),
  },
  {
    path: "/cabin-selection",
    element: (
      <Suspense fallback={<Loading />}>
        <ResultPage />
      </Suspense>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
