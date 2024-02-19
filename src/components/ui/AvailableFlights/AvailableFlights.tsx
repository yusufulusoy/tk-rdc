import { useState } from "react";
import { FlightRow } from "../FlightRow/FlightRow";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks";

interface AvailableFlightsProps {
  flights: Flight[];
  hasPromotionCode: boolean;
}

export const AvailableFlights: React.FC<AvailableFlightsProps> = ({
  flights,
  hasPromotionCode,
}) => {
  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  const [result, setResult] = useLocalStorage("selectedCategory", "[]");
  const navigate = useNavigate();

  const handleSelect = (subcategory: Subcategory) => {
    setResult(JSON.stringify(subcategory));

    navigate("/cabin-selection");
  };

  return (
    <div>
      {flights.map((flight, index) => (
        <FlightRow
          key={index}
          flight={flight}
          hasPromotionCode={hasPromotionCode}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
          handleSelect={handleSelect}
        />
      ))}
    </div>
  );
};
