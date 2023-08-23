import React, { useEffect, useRef, useState } from "react";
import styles from "./NewCard.module.css";
import deleteImage from "../../assets/deleteIcon.svg";
import { TextareaInput } from "../TextareaInput";

interface FishkappCard {
  question: string;
  answer: string;
}

interface CardI {
    id: number;
    editMode: boolean;
    setEditMode: (value: boolean) => void;
    updateCard: (id: number, cardSide: string, input: string) => void;
    question: string;
}

export const BackCardEdit = (props: CardI) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [fishkappObject, setfishkappObject] = useState<FishkappCard>({
        question: "",
        answer: "",
      });

      const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setfishkappObject({ ...fishkappObject, answer: value });
        event.target.style.height = "0px";
        event.target.style.height = event.target.scrollHeight + "px";
      };
    
      const updateCard = () => {
        props.updateCard(props.id, 'answer',fishkappObject.answer);
        props.setEditMode(false);
      }

      const cancelPageClick = () => {
        props.setEditMode(!props.editMode);
      };

      

    return (
        <div className={styles.container}>
            <div className={styles.corner_wrapper}>
                <button className={styles.corner_button}>
                     <img src={deleteImage} alt="delete" />
                </button>
            </div>

            <div className={styles.text_wrapper}>

            <p className={styles.question_text}>{props.question}</p>

                    <TextareaInput
                    fishkappObject={fishkappObject}
                    nextPage={true}
                    handleInputChange={handleInputChange}
                    ref={textareaRef}
                    />
            </div>

            <div className={styles.action_wrapper}>

                <button onClick={cancelPageClick} className={styles.left_button}>
                    Cancel
                </button>
                
                <button className={styles.right_button} onClick={updateCard}>Save</button>
            
            </div>
        </div>
        );
};