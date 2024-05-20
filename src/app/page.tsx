import styles from "./page.module.css";
import dynamic from "next/dynamic";

const Formula = dynamic(
    () => import('@/components/Formula/views/Formula'),
    { ssr: false }
)

export default function Home() {

    return (
    <main className={styles.main}>
        <Formula />
    </main>
  );
}