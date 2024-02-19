import { IconCalendar } from "@tabler/icons-react";
import styles from "./Datepicker.module.scss";

interface DatepickerProps {
  placeholder?: string;
}

const Datepicker: React.FC<DatepickerProps> = ({ placeholder }) => {
  return (
    <div className={styles.root}>
      {placeholder && <div className={styles.placeholder}>{placeholder}</div>}
      <IconCalendar size={24} stroke={2} color="#98a1ae" />
    </div>
  );
};

export default Datepicker;
