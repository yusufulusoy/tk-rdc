import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const HomePage = React.lazy(() => import("./pages/Home/Home"));
const FlightsPage = React.lazy(() => import("./pages/Flights/Flights"));
const ResultPage = React.lazy(() => import("./pages/Result/Result"));

const router = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: "/flights",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <FlightsPage />
      </Suspense>
    ),
  },
  {
    path: "/cabin-selection",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
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
