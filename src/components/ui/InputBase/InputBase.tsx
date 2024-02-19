import styles from "./InputBase.module.scss";

const InputBase: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return <input type="text" {...props} className={styles.root} />;
};

export default InputBase;
