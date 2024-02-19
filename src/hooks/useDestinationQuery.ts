import data from "@/assets/data/flights.json";

const airports = () => {
  const uniqueAirports: Set<string> = new Set();
  const list: Destination[] = [];

  for (const flight of data.flights) {
    const { originAirport, destinationAirport } = flight;

    if (!uniqueAirports.has(originAirport.code)) {
      list.push(originAirport);
      uniqueAirports.add(originAirport.code);
    }

    if (!uniqueAirports.has(destinationAirport.code)) {
      list.push(destinationAirport);
      uniqueAirports.add(destinationAirport.code);
    }
  }

  return list;
};

export const useDestinationQuery = () => {
  async function search(query: string): Promise<Destination[]> {
    if (query.length < 1) return [];

    const destinations = airports();

    return new Promise((resolve) => {
      setTimeout(() => {
        const result = destinations.filter(
          (destination) =>
            destination.name.toLowerCase().includes(query.toLowerCase()) ||
            destination.code.toLowerCase().includes(query.toLowerCase()) ||
            destination.city.name.toLowerCase().includes(query.toLowerCase()) ||
            destination.country.name.toLowerCase().includes(query.toLowerCase())
        );

        resolve(result);
      }, 300);
    });
  }

  return search;
};
