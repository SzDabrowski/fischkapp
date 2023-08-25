import React, { useState, useEffect } from "react";
import styles from "./Card.module.css";
import editIcon from "../../assets/editIcon.svg";

interface CardI {
    editMode: boolean;
    value: string;
    changePageClick: () => void;
    editPageClick: () => void;
    sideName: string;
    nextPage: boolean;
}

export const CardSide = (props: CardI) => {
    const [height, setHeight] = useState<number>(60);
    const [animationState, setAnimationState] = useState<Boolean>(false);

    useEffect(() => {
      if(!animationState){
      setAnimationState(true);
      setTimeout(() => {
        setAnimationState(false);
      }, 500);
    }
    }, [props.nextPage]);


  return (
           <div className={`${styles.container} ${animationState ? styles.flipped : ''}`}>
           <div className={styles.corner_wrapper}>
             <button className={styles.corner_button} onClick={props.editPageClick}>
               <img src={editIcon} alt="edit" />
             </button>
           </div>
       
           <div className={styles.text_wrapper} onClick={props.changePageClick}> 
                <textarea
                  readOnly
                  className={styles.output}
                  value={props.value}
                  style={{ height: height + "px" }}
                />
              </div>
            </div> 
    )};