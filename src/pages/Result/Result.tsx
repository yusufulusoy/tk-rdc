import { IconCheck, IconX } from "@tabler/icons-react";
import { Layout } from "@/components/layouts";
import { useLocalStorage } from "@/hooks";
import styles from "./Result.module.scss";
import { STATUS } from "@/constants";

export default function ResultPage() {
  const [result, setResult] = useLocalStorage<string>("selectedCategory", "{}");
  const selectedResult = JSON.parse(result);
  const hasFailed = selectedResult.status === STATUS.ERROR;

  return (
    <Layout>
      <div className={styles.container}>
        {hasFailed ? (
          <div className={styles.status}>
            <div className={styles.errorIcon}>
              <IconX />
            </div>
            Kabin seçiminiz tamamlanamadı.
          </div>
        ) : (
          <>
            <div className={styles.status}>
              <div className={styles.successIcon}>
                <IconCheck />
              </div>
              Kabin seçiminiz başarıyla tamamlandı.
            </div>
            <div className={styles.summary}>
              <span className={styles.text}>Toplam Tutar</span>
              <span className={styles.amount}>
                {selectedResult.price.amount} {selectedResult.price.currency}
              </span>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
