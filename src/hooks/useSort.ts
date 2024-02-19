import { CABIN_CLASS } from "@/constants";

export const useSort = (flights: Flight[], sortBy: string) => {
  if (sortBy === "price") {
    return flights.sort(
      (a, b) =>
        a.fareCategories[CABIN_CLASS.ECONOMY].subcategories[0].price.amount -
        b.fareCategories[CABIN_CLASS.ECONOMY].subcategories[0].price.amount
    );
  }
  if (sortBy === "departure") {
    return flights.sort((a, b) => {
      const dateA = new Date(a.departureDateTimeDisplay);
      const dateB = new Date(b.departureDateTimeDisplay);
      return dateA.getTime() - dateB.getTime();
    });
  }
  return flights;
};
