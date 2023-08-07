import styles from "./AppHeader.module.css";
import logotype from "../assets/header_logo.svg";
import button from "../assets/header_button.svg";

export function AppHeader({}){

 const cardsNumber = 0;
    

  return (<header className={styles.header}>
    <div>
        <img src={logotype} alt={"logo"} />
        <h1 className="header">Cards:</h1>
        <span className="cardsNumber">{cardsNumber}</span>
    </div >
      <button>
      <img src={button} alt={"add card button"} />
      </button>

  </header>)
};
