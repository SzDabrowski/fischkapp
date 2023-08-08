import React, {useState} from 'react';
import styles from "./AppHeader.module.css";
import logotype from "../assets/header_logo.svg";
import button from "../assets/header_button.svg";


export function AppHeader({ cardsNumber }){

  const [currentCardsNumber, setCurrentCardsNumber] = useState(cardsNumber || 0);

  const addNumber = () => {
    setCurrentCardsNumber(currentCardsNumber + 1);
  };
    

  return (<header className={styles.header}>
    <div>
        <img src={logotype} alt={"logo"} />
        <h1 className="header">Cards:</h1>
        <span className="cardsNumber">{currentCardsNumber}</span>
    </div >
     <button className="addButton" onClick={addNumber}>
      <img src={button} alt={"add card button"} />
      </button>

  </header>)
};
