import { Layout } from "@/components/layouts";
import { useFlightListQuery, useSort } from "@/hooks";
import styles from "./Flights.module.scss";
import { AvailableFlights, Switch } from "@/components/ui";
import { useEffect, useState } from "react";

export default function FlightsPage() {
  const [hasPromotionCode, setHasPromotionCode] = useState<boolean>(false);
  const [availableFlights, selectedFlight] = useFlightListQuery();
  const [sortBy, setSortBy] = useState<"price" | "departure">("price");
  const sortedFlights = useSort(availableFlights, sortBy);

  if (availableFlights.length === 0) {
    return (
      <Layout>
        <div className={styles.container}>
          Seçilen kriterlere uygun uçuş bulunamadı.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <span className={styles.badge}>Uçuş</span>
        <div className={styles.info}>
          {selectedFlight.origin?.city.name} -{" "}
          {selectedFlight.destination?.city.name},{" "}
          {selectedFlight.options.passengers} Yolcu
        </div>
        <div className={styles.promotionContainer}>
          <div className={styles.selector}>
            Promosyon Kodu
            <Switch
              checked={hasPromotionCode}
              onChange={() => setHasPromotionCode(!hasPromotionCode)}
            />
          </div>
          {hasPromotionCode && (
            <div className={styles.info}>
              <p>
                Promosyon Kodu seçeneği ile tüm Economy kabini Eco Fly
                paketlerini %50 indirimle satın alabilirsiniz!
              </p>
              <p>
                Promosyon Kodu seçeneği aktifken Eco Fly paketi haricinde seçim
                yapılamamaktadır.
              </p>
            </div>
          )}
        </div>

        <div className={styles.flightList}>
          <div className={styles.flightList_Header}>
            Sıralama Kriteri
            <div className={styles.flightList_Sort}>
              <button
                className={styles.flightList_SortButton}
                onClick={() => {
                  setSortBy("price");
                }}
              >
                Ekonomi Ücreti
              </button>
              <button
                className={styles.flightList_SortButton}
                onClick={() => {
                  setSortBy("departure");
                }}
              >
                Kalkış Saati
              </button>
            </div>
          </div>
          <div className={styles.flightList_Body}>
            <AvailableFlights
              flights={sortedFlights}
              hasPromotionCode={hasPromotionCode}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
