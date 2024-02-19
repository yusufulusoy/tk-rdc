import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useSelectedFlight = () => {
  const [searchHistory] = useLocalStorage("previusSearches", "[]");
  const selectedFlight = useMemo(() => {
    return searchHistory ? JSON.parse(searchHistory).pop() : null;
  }, [searchHistory]);
  return selectedFlight;
};
