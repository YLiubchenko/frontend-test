import styles from "./page.module.css";
import Formula from "@/components/Formula/views/Formula";

export default function Home() {

    return (
    <main className={styles.main}>
        <Formula />
    </main>
  );
}