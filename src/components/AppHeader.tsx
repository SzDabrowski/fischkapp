import React, {useState} from 'react';
import styles from "./AppHeader.module.css";
import logotype from "../assets/header_logo.svg";
import button from "../assets/header_button.svg";

export interface Header {
  CurrentCardsNumber: number;
  changeMode: (event: React.MouseEvent<HTMLButtonElement>) => void;
}



export function AppHeader(props: Header){

  return (<header className={styles.header}>
    <div>
        <img src={logotype} alt={"logo"} />
        <h1 className="header">Cards:</h1>
        <span className="cardsNumber">{props.CurrentCardsNumber}</span>
    </div >
     <button className="addButton" onClick={props.changeMode}>
      <img src={button} alt={"add card button"} />
      </button>

  </header>)
};
