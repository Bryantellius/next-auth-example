import Link from "next/link";
import styles from "./footer.module.css";
import packageJSON from "../package.json";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <hr />
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          <a href="https://github.com/Bryantellius">Github</a>
        </li>
        <li className={styles.navItem}>
          <Link href="/policy">
            <a>Policy</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <em>Powered by socket.io and nextauth.js</em>
        </li>
        <li className={styles.navItem}>
          @beta
        </li>
      </ul>
    </footer>
  );
}
