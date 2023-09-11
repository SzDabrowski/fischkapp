import React, { useState, useEffect,useRef } from "react";
import styles from "./Card.module.css";
import editIcon from "../../assets/editIcon.svg";

interface CardI {
    editMode: boolean;
    value: string;
    changePageClick: () => void;
    editPageClick: () => void;
    sideNameStyle: string;
    sideName: string;
    nextPage: boolean;
    animationState: boolean;
}

export const CardSide = (props: CardI) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const setHeight = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "50px";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };
  
    useEffect(() => {
      textareaRef.current?.focus();
      setHeight();
    }, [props.value]);
    


  return (
           <div className={styles.container}>
             <button className={styles.corner_button} onClick={props.editPageClick} aria-label={`${props.sideName}ditBtn`}>
               <img src={editIcon} alt="edit" />
             </button>
          
       
           <div className={styles.text_wrapper} onClick={props.changePageClick}> 
                <textarea
                  ref={textareaRef}
                  readOnly
                  className={styles.output}
                  value={props.value}
                />
              </div>
            </div> 
    )};