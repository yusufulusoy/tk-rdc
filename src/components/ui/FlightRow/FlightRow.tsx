import { useEffect, useRef, useState } from "react";
import styles from "./FlightRow.module.scss";
import { FareCard, FlightCard } from "..";

interface FlightRowProps {
  flight: Flight;
  hasPromotionCode: boolean;
  selectedRow: any;
  setSelectedRow: (row: any) => void;
  handleSelect: (subcategory: Subcategory) => void;
}

export const FlightRow: React.FC<FlightRowProps> = ({
  flight,
  hasPromotionCode,
  selectedRow,
  setSelectedRow,
  handleSelect,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedFare, setSelectedFare] = useState<Subcategory[] | null>(null);

  const CategoryCard = ({ subcategory }: { subcategory: Subcategory }) => {
    const amount =
      hasPromotionCode && subcategory.brandCode == "ecoFly"
        ? subcategory.price.amount / 2
        : subcategory.price.amount;
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.title}>{subcategory.brandCode}</div>
          <div className={styles.price}>
            <sup>{subcategory.price.currency}</sup>
            {amount}
          </div>
        </div>
        <div className={styles.body}>
          {subcategory.rights.map((right, index) => (
            <div className={styles.right} key={index}>
              <div>{right}</div>
            </div>
          ))}
        </div>
        <button
          className={styles.button}
          onClick={() =>
            handleSelect({
              ...subcategory,
              price: { ...subcategory.price, amount },
            })
          }
          disabled={hasPromotionCode && subcategory.brandCode !== "ecoFly"}
        >
          Uçuşu Seç
        </button>
      </div>
    );
  };

  useEffect(() => {
    if (selectedRow === ref) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [selectedRow]);

  return (
    <div ref={ref}>
      <div className={styles.row}>
        <FlightCard flight={flight} />
        <FareCard
          flight={flight}
          onFareSelect={(data) => {
            if (ref) {
              setSelectedFare(data);
              setSelectedRow(ref);
            }
          }}
          hasPromotionCode={hasPromotionCode}
        />
      </div>
      {isOpen && selectedFare && (
        <div className={styles.grid}>
          {selectedFare.map((subcategory, index) => (
            <CategoryCard key={index} subcategory={subcategory} />
          ))}
        </div>
      )}
    </div>
  );
};
