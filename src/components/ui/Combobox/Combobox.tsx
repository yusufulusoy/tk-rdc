import { useMemo, useRef, useState } from "react";
import { InputBase } from "..";
import styles from "./Combobox.module.scss";
import { useDestinationQuery, useOnClickOutside } from "@/hooks";

interface ComboboxProps {
  onChange: (value: Destination | null) => void;
  selected: Destination | null;
  leftSection?: React.ReactNode;
  placeholder: string;
}

const Combobox: React.FC<ComboboxProps> = ({
  selected,
  onChange,
  leftSection,
  placeholder,
}) => {
  const [value, setValue] = useState(selected?.city.name || "");
  const [options, setOptions] = useState<Destination[]>([]);
  const ref = useRef<HTMLUListElement>(null);
  const destinations = useDestinationQuery();

  useOnClickOutside(ref, () => {
    setOptions([]);
    setValue(selected?.city.name || "");
  });

  const fetchDestinations = useMemo(() => {
    return async (query: string) => {
      const result = (await destinations(query)) as Destination[];
      setOptions(result);
    };
  }, [destinations]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    fetchDestinations(e.target.value);

    if (e.target.value === "") {
      setOptions([]);
      onChange(null);
    }
  };

  const comboboxOptions = (
    <ul className={styles.options} ref={ref}>
      {options.map((option) => (
        <li
          key={option.city.code}
          onClick={() => {
            setValue(option.city.name);
            onChange(option);
            setOptions([]);
          }}
          className={styles.option}
        >
          {option.name} ({option.code})
        </li>
      ))}
    </ul>
  );

  return (
    <div className={styles.root}>
      <div className={styles.inputWrapper}>
        {leftSection && <div className={styles.leftSection}>{leftSection}</div>}
        <InputBase
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
      </div>
      {options.length > 0 && comboboxOptions}
    </div>
  );
};

export default Combobox;
