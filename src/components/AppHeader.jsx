import styles from "./AppHeader.module.css";
import logotype from "../assets/header_logo.svg";
import button from "../assets/header_button.svg";

export const AppHeader = () => (
  <header className={styles.header}>
    <div className="cards-counter">
        <img src={logotype} alt={"logo"} />
        <h1 className="header">Cards:</h1>
        <span className="cardsNumber">0</span>
    </div >
      <button>
      <img src={button} alt={"button"} />
      </button>

  </header>
);
