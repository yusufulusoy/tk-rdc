import {
  IconMan,
  IconMinus,
  IconPlus,
  TablerIconsProps,
} from "@tabler/icons-react";
import styles from "./CabinAndPassengerSelect.module.scss";
import { useOnClickOutside } from "@/hooks";
import { useCallback, useRef, useState } from "react";
import { CABIN_CLASS } from "@/constants";

interface CabinAndPassengerSelectProps {
  value: CabinAndPassengerValueProps;
  onChange: (value: CabinAndPassengerValueProps) => void;
}

type DropdownProps = CabinAndPassengerSelectProps;

const CabinAndPassengerSelect: React.FC<CabinAndPassengerSelectProps> = ({
  value,
  onChange,
}) => {
  const [opened, setOpened] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(
    ref,
    useCallback(() => setOpened(false), [])
  );

  const Dropdown: React.FC<DropdownProps> = ({ value, onChange }) => {
    return (
      <div className={styles.dropdown} ref={ref}>
        <div className={styles.title}>Kabin ve yolcu seçimi</div>
        <div className={styles.cabin}>
          <div>
            <input
              type="radio"
              id="economy"
              name="cabin"
              value={CABIN_CLASS.ECONOMY}
              checked={value.cabin === CABIN_CLASS.ECONOMY}
              onChange={() =>
                onChange({ ...value, cabin: CABIN_CLASS.ECONOMY })
              }
            />
            <label htmlFor="economy">Economy Class</label>
          </div>

          <div>
            <input
              type="radio"
              id="business"
              name="cabin"
              value={CABIN_CLASS.BUSINESS}
              checked={value.cabin === CABIN_CLASS.BUSINESS}
              onChange={() =>
                onChange({ ...value, cabin: CABIN_CLASS.BUSINESS })
              }
            />
            <label htmlFor="business">Business Class</label>
          </div>
        </div>
        <div className={styles.passenger}>
          <div className={styles.label}>Yolcu</div>
          <div className={styles.buttons}>
            <button
              onClick={handleDecreasePassengers}
              disabled={value.passengers < 2}
            >
              <IconMinus size={16} stroke={4} color="#232b38" />
            </button>
            <div className={styles.count}>{value.passengers}</div>
            <button
              onClick={handleIncreasePassengers}
              disabled={value.passengers > 8}
            >
              <IconPlus size={16} stroke={4} color="#232b38" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const Icon: React.FC<
    TablerIconsProps & { value: CabinAndPassengerValueProps }
  > = ({ value }) => {
    return (
      <div className={styles.icon}>
        {Array.from({ length: Math.min(value.passengers, 3) }).map((_, i) => (
          <IconMan
            key={i}
            size={24}
            stroke={2}
            color={`rgba(152,161,174, ${1 - i * 0.25})`}
          />
        ))}
        {value.passengers > 3 && (
          <IconPlus size={16} stroke={3} color="rgba(152,161,174,.5)" />
        )}
      </div>
    );
  };

  const handleDecreasePassengers = useCallback(() => {
    onChange({
      ...value,
      passengers: Math.max(value.passengers - 1, 1),
    });
  }, [onChange, value]);

  const handleIncreasePassengers = useCallback(() => {
    onChange({
      ...value,
      passengers: Math.min(value.passengers + 1, 9),
    });
  }, [onChange, value]);

  const defaultValue = { cabin: CABIN_CLASS.ECONOMY, passengers: 1 };
  value = { ...defaultValue, ...value };

  return (
    <div className={styles.root}>
      <button
        className={styles.button}
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          setOpened((prev) => !prev);
        }}
      >
        <div className={styles.count}>{value.passengers}</div>
        <Icon value={value} />
      </button>
      {opened && <Dropdown value={value} onChange={onChange} />}
    </div>
  );
};

export default CabinAndPassengerSelect;
