import React, { useEffect, useRef, useState } from "react";
import styles from "./NewCard.module.css";
import deleteImage from "../assets/deleteIcon.svg";
import { TextareaInput } from "../TextareaInput";

interface FishkappCard {
  question: string;
  answer: string;
}

interface CardI {
    editMode: boolean;
    setEditMode: (value: boolean) => void;
}

export const FrontCardEdit = (props: CardI) => {
    const [nextPage, setNextPage] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [fishkappObject, setfishkappObject] = useState<FishkappCard>({
        question: "",
        answer: "",
      });

      const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        nextPage
          ? setfishkappObject({ ...fishkappObject, answer: value })
          : setfishkappObject({ ...fishkappObject, question: value });
        event.target.style.height = "0px";
        event.target.style.height = event.target.scrollHeight + "px";
      };

      const backPageClick = () => {
        setNextPage(false);
        textareaRef.current?.focus();
      };

    
      const savePageClick = () => {
        props.setEditMode(false);
      }

    return (
        <div className={styles.container}>
            <div className={styles.corner_wrapper}>
                <button className={styles.corner_button}>
                     <img src={deleteImage} alt="delete" />
                </button>
            </div>

            <div className={styles.text_wrapper}>
            
                <p className={styles.question_text}>{fishkappObject.question}</p>

                    <TextareaInput
                    fishkappObject={fishkappObject}
                    nextPage={nextPage}
                    handleInputChange={handleInputChange}
                    ref={textareaRef}
                    />
            </div>

            <div className={styles.action_wrapper}>

                <button onClick={backPageClick} className={styles.left_button}>
                    Cancel
                </button>
                
                <button className={styles.right_button} onClick={savePageClick}>Save</button>
            
            </div>
        </div>
        );
};
