import { useMemo } from "react";
import data from "@/assets/data/flights.json";
import { useSelectedFlight } from "./useSelectedFlight";

export const useFlightListQuery = () => {
  const selectedFlight = useSelectedFlight();
  const { flights } = data;

  const availableFlights: Flight[] = useMemo(() => {
    return flights.filter(
      (flight) =>
        flight.originAirport.code === selectedFlight.origin.code &&
        flight.destinationAirport.code === selectedFlight.destination.code
    );
  }, [flights, selectedFlight]);

  return [availableFlights, selectedFlight];
};
