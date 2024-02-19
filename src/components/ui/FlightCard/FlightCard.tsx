import styles from "./FlightCard.module.scss";

interface FlightCardProps {
  flight: Flight;
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  return (
    <div className={styles.info}>
      <div className={styles.airline}>
        <div className={styles.arrival}>
          <span className={styles.time}>{flight.arrivalDateTimeDisplay}</span>
          <span className={styles.airportCode}>
            {flight.originAirport.code}
          </span>
          <span className={styles.city}>{flight.originAirport.city.name}</span>
        </div>
        <div className={styles.departure}>
          <span className={styles.time}>{flight.departureDateTimeDisplay}</span>
          <span className={styles.airportCode}>
            {flight.destinationAirport.code}
          </span>
          <span className={styles.city}>
            {flight.destinationAirport.city.name}
          </span>
        </div>
      </div>
      <div className={styles.duration}>
        <span>Uçuş Süresi</span>
        <span>{flight.flightDuration}</span>
      </div>
    </div>
  );
};
