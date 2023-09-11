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
    animationState: boolean;
}

export const CardSide = (props: CardI) => {
    const [height, setHeight] = useState<string>("");

    const inputHeight = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      const scrollHeight = event.target.scrollHeight;
      event.target.style.height = scrollHeight + "px";
      setHeight(event.target.scrollHeight + "px");
    };

    useEffect(() => {
      inputHeight;
    },[]);

    


  return (
           <div className={styles.container}>
             <button className={styles.corner_button} onClick={props.editPageClick} aria-label="editBtn">
               <img src={editIcon} alt="edit" />
             </button>
          
       
           <div className={styles.text_wrapper} onClick={props.changePageClick}> 
                <textarea
                  readOnly
                  className={styles.output}
                  value={props.value}
                  style={{ height: `50px` }}
                />
              </div>
            </div> 
    )};