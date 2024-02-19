import { CABIN_CLASS } from "@/constants";
import styles from "./FareCard.module.scss";
import { useCallback } from "react";
import { IconChevronDown } from "@tabler/icons-react";

interface FareCardProps {
  flight: Flight;
  onFareSelect: (subcategory: any) => void;
  hasPromotionCode: boolean;
}

export const FareCard: React.FC<FareCardProps> = ({
  flight,
  onFareSelect,
  hasPromotionCode,
}) => {
  const card = useCallback(
    (label: string) => {
      const amount =
        hasPromotionCode && label === CABIN_CLASS.ECONOMY
          ? flight.fareCategories[label].subcategories[0].price.amount / 2
          : flight.fareCategories[label].subcategories[0].price.amount;
      const currency =
        flight.fareCategories[label].subcategories[0].price.currency;

      return (
        <label key={label} className={styles.fare}>
          <div className={styles.radio}>
            <input
              type="radio"
              name={`fare`}
              value={label}
              onChange={() => {
                onFareSelect(flight.fareCategories[label].subcategories);
              }}
            />
            {label}
          </div>
          <div className={styles.amount}>
            <span className={styles.amountText}>Yolcu Başına</span>
            <span className={styles.price}>
              {currency} {amount}
            </span>
          </div>
          <IconChevronDown size={16} />
        </label>
      );
    },
    [flight.fareCategories, hasPromotionCode, onFareSelect]
  );

  return (
    <>
      {flight.fareCategories && (
        <div className={styles.fares}>
          {Object.keys(CABIN_CLASS).map((key) =>
            card(key as keyof typeof CABIN_CLASS)
          )}
        </div>
      )}
    </>
  );
};
