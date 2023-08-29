import React, { useEffect, useRef, useState } from "react";
import styles from "./NewCard.module.css";
import deleteImage from "../../assets/deleteIcon.svg";
import { TextareaInput } from "../TextareaInput";

interface FishkappCard {
  question: string;
  answer: string;
}

interface CardI {
    id: string;
    editMode: boolean;
    updateCard: (id: string, cardSide: string, input: string) => void;
    setEditMode: (value: boolean) => void;
}

export const FrontCardEdit = (props: CardI) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [fishkappObject, setfishkappObject] = useState<FishkappCard>({
        question: "",
        answer: "",
      });

      const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setfishkappObject({ ...fishkappObject, question: value });
        event.target.style.height = "0px";
        event.target.style.height = event.target.scrollHeight + "px";
      };


    
      const cancelPageClick = () => {
        props.setEditMode(false);
      }

      const updateCard = () => {
        props.updateCard(props.id, "front", fishkappObject.question);
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

                    <TextareaInput
                    fishkappObject={fishkappObject}
                    nextPage={false}
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
