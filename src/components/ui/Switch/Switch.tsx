import styles from "./Switch.module.scss";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
  const handleChange = () => {
    onChange(!checked);
  };

  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <span className={styles.slider}></span>
    </label>
  );
};
