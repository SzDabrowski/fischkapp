import React, { useEffect, useRef, useState } from "react";
import styles from "./NewCard.module.css";
import deleteImage from "../../assets/deleteIcon.svg";
import { TextareaInput } from "../TextareaInput";

interface FishkappCard {
  question: string;
  answer: string;
}

interface CardI {
    oldValue: string;
    id: string;
    editMode: boolean;
    updateCard: (id: string, cardSide: string, input: string) => void;
    setEditMode: (value: boolean) => void;
    deleteCard: (id: string) => void;
    
}

export const FrontCardEdit = (props: CardI) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [errorText,setErrorText] = useState(String);

    const [fishkappObject, setfishkappObject] = useState<FishkappCard>({
        question: props.oldValue,
        answer: "",
      });

      const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setfishkappObject({ ...fishkappObject, question: value });
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
      };


    
      const cancelPageClick = () => {
        props.setEditMode(false);
      }

      const updateCard = () => {
        if(fishkappObject.question === ""){
          setErrorText("New text value is required")
        } else {
          props.updateCard(props.id, "front", fishkappObject.question);
          props.setEditMode(false);
        }
      }

      const deleteCard = () => {
        props.deleteCard(props.id);
      }


    return (
        <div className={styles.container}>
            <div className={styles.corner_wrapper}>
                <button className={styles.corner_button}>
                     <img src={deleteImage} alt="delete" onClick={deleteCard} aria-label="delButton"/>
                </button>
            </div>

            <div className={styles.text_wrapper}>

                    <TextareaInput
                    fishkappObject={fishkappObject}
                    nextPage={false}
                    handleInputChange={handleInputChange}
                    ref={textareaRef}
                    />
                    <p className={`${styles.errorText} ${errorText ? styles.displayError : ''}`}>{errorText}</p>
                    
                    <div className={styles.action_wrapper}>

                    <button onClick={cancelPageClick} className={styles.left_button}>
                        Cancel
                    </button>
                    
                    <button className={styles.right_button} onClick={updateCard}>Save</button>
            
            </div>
            </div>
        </div>
        );
};
