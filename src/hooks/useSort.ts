import { CABIN_CLASS } from "@/constants";

export const useSort = (flights: Flight[], sortBy: "price" | "departure") => {
  return flights.sort((a, b) => {
    if (sortBy === "price") {
      return (
        a.fareCategories[CABIN_CLASS.ECONOMY].subcategories[0].price.amount -
        b.fareCategories[CABIN_CLASS.ECONOMY].subcategories[0].price.amount
      );
    }
    return (
      parseInt(a.departureDateTimeDisplay) -
      parseInt(b.departureDateTimeDisplay)
    );
  });
};
