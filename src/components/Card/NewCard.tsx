import React, { useEffect, useRef, useState } from "react";
import styles from "./NewCard.module.css";
import deleteImage from "../../assets/deleteIcon.svg";
import { TextareaInput } from "../TextareaInput";

interface FishkappCard {
  question: string;
  answer: string;
}
interface CardI {
  saveNewCard:(card: FishkappCard) => void;
  deleteNewCard: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const NewCard = (props: CardI) => {
  const [nextPage, setNextPage] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [errorText,setErrorText] = useState(String);

  const [fishkappObject, setfishkappObject] = useState<FishkappCard>({
    question: "",
    answer: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    nextPage
      ? setfishkappObject({ ...fishkappObject, answer: value })
      : setfishkappObject({ ...fishkappObject, question: value });
  };

  const nextPageClick = () => {
    if (fishkappObject.question === "") {
      setErrorText("Front text is required");
    } else {
      setErrorText("");
      setNextPage(true);
      
    }
    textareaRef.current?.focus();
  };

  const backPageClick = () => {
    setNextPage(false);
    textareaRef.current?.focus();
  };
  
  const saveNewCard = () => {
    if (fishkappObject.answer === "") {
      setErrorText("Back text is required");
    } else {
      setErrorText("");
      props.saveNewCard(fishkappObject);
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.corner_wrapper}>
        {nextPage ? (
          <button className={styles.corner_button} onClick={props.deleteNewCard}>
            <img src={deleteImage} alt="delete" />
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.text_wrapper}>
        <div>
          {nextPage && (
            <p className={styles.question_text}>{fishkappObject.question}</p>
          )}

          <TextareaInput
            fishkappObject={fishkappObject}
            nextPage={nextPage}
            handleInputChange={handleInputChange}
            ref={textareaRef}
          />
          <p className={`${styles.errorText} ${errorText ? styles.displayError : ''}`}>{errorText}</p>

        </div>


         
      </div>
      <div className={styles.action_wrapper}>
        {nextPage ? (
          <button onClick={backPageClick} className={styles.left_button}>
            Back
          </button>
        ) : (
          <button onClick={props.deleteNewCard} className={styles.left_button}>
            Cancel
          </button>
        )}
        {nextPage ? (
          <button className={styles.right_button} onClick={saveNewCard}>
            Save
          </button>
        ) : (
          <button onClick={nextPageClick} className={styles.right_button}>
            Next
          </button>
        )}

      </div>
      
    </div>
  );
};