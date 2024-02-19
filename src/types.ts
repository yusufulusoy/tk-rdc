type CabinType = "ECONOMY" | "BUSINESS";

interface CabinAndPassengerValueProps {
  cabin: CabinType | string;
  passengers: number;
}

interface Destination {
  name: string;
  code: string;
  city: {
    name: string;
    code: string;
  };
  country: {
    name: string;
    code: string;
  };
}

interface Price {
  amount: number;
  currency: string;
}

interface Subcategory {
  brandCode: string;
  price: Price;
  order: number;
  status: string;
  rights: string[];
}

type FareCategoryType = "ECONOMY" | "BUSINESS" | "FIRST";

interface FareCategory {
  [key: string]: {
    subcategories: Subcategory[];
  };
}

interface Flight {
  originAirport: Destination;
  destinationAirport: Destination;
  arrivalDateTimeDisplay: string;
  departureDateTimeDisplay: string;
  flightDuration: string;
  fareCategories: FareCategory;
}
