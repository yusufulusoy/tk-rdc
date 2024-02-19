import clsx from "clsx";
import styles from "./Header.module.scss";

export interface HeaderProps {
  colorScheme?: "light" | "dark";
}

export default function Header({ colorScheme = "light" }: HeaderProps) {
  return (
    <header className={clsx(styles.root, styles[colorScheme])}>
      <h1 className={styles.brand}>turkishairlines.com</h1>
      <div className={styles.title}>
        <span>search</span>
        Flight Challenge
      </div>
    </header>
  );
}
