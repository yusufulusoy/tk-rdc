import { Layout } from "@/components/layouts";
import { FlightQueryForm } from "@/components/ui";
import styles from "./Home.module.scss";

export default function HomePage() {
  return (
    <Layout colorScheme="dark">
      <div className={styles.root}>
        <div className={styles.content}>
          <div>Merhaba</div>
          <div>Nereyi keşfetmek istersiniz?</div>
        </div>
        <FlightQueryForm />
      </div>
    </Layout>
  );
}
